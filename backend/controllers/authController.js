const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { prisma } = require("../config/database");
const emailService = require("../utils/emailService");
const sessionManager = require("../utils/sessionManager");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const register = async (req, res) => {
  try {
    console.log("📝 Registration request received:", req.body.email);
    const { email, password, name, phoneNumber } = req.body;

    if (!email || !password || !name || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: "Email, password, name, and phone number are required",
      });
    }

    const adminEmails = [process.env.ADMIN_EMAIL];
    const isAdmin = adminEmails.includes(email.toLowerCase());

    const existingUser = isAdmin
      ? await prisma.admin.findUnique({ where: { email } })
      : await prisma.user.findUnique({ where: { email } });

    const existingInOtherCollection = isAdmin
      ? await prisma.user.findUnique({ where: { email } })
      : await prisma.admin.findUnique({ where: { email } });

    if (existingUser || existingInOtherCollection) {
      return res.status(400).json({
        success: false,
        error: "Account already exists. Please sign in.",
      });
    }

    const existingPhone = isAdmin
      ? await prisma.admin.findFirst({ where: { phoneNumber } })
      : await prisma.user.findFirst({ where: { phoneNumber } });

    const existingPhoneInOtherCollection = isAdmin
      ? await prisma.user.findFirst({ where: { phoneNumber } })
      : await prisma.admin.findFirst({ where: { phoneNumber } });

    if (existingPhone || existingPhoneInOtherCollection) {
      return res.status(400).json({
        success: false,
        error: "Phone number already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateRandomToken();

    const user = isAdmin
      ? await prisma.admin.create({
          data: {
            email,
            password: hashedPassword,
            name,
            phoneNumber,
            verificationToken,
          },
        })
      : await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
            phoneNumber,
            verificationToken,
          },
        });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailData = {
      to: email,
      subject: "Verify Your Email - Fireworks Shop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Fireworks Shop!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for registering. Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #6B7280;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email to verify your account.",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: isAdmin ? "admin" : "user",
      },
    });

    setImmediate(async () => {
      try {
        await emailService.sendEmail(emailData);
        console.log(`✅ Verification email sent to: ${email}`);
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email/phone and password are required",
      });
    }

    const isEmail = /\S+@\S+\.\S+/.test(email);
    const searchField = isEmail ? "email" : "phoneNumber";

    let user = isEmail
      ? await prisma.user.findUnique({ where: { email } })
      : await prisma.user.findFirst({ where: { phoneNumber: email } });
    let userType = "user";

    if (!user) {
      user = isEmail
        ? await prisma.admin.findUnique({ where: { email } })
        : await prisma.admin.findFirst({ where: { phoneNumber: email } });
      userType = "admin";
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: "Account is deactivated",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        error: "Please verify your email before signing in",
      });
    }

    if (!user.password && user.provider === "google") {
      return res.status(401).json({
        success: false,
        error: "Please sign in with Google",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    if (userType === "admin") {
      await prisma.admin.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });
    }

    const token = generateToken(user.id);
    await sessionManager.addSession(user.id, token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: userType,
          image: user.image,
          phoneNumber: user.phoneNumber,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Verification token is required",
      });
    }

    let user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });
    let userType = "user";

    if (!user) {
      user = await prisma.admin.findFirst({
        where: { verificationToken: token },
      });
      userType = "admin";
    }

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Email already verified",
        alreadyVerified: true
      });
    }

    if (user.isVerified) {
      return res.json({
        success: true,
        message: "Email already verified",
        alreadyVerified: true
      });
    }

    if (userType === "admin") {
      await prisma.admin.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          verificationToken: null,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          verificationToken: null,
        },
      });
    }

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      error: "Email verification failed",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    let user = await prisma.user.findUnique({ where: { email } });
    let userType = "user";

    if (!user) {
      user = await prisma.admin.findUnique({ where: { email } });
      userType = "admin";
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const resetToken = generateRandomToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    if (userType === "admin") {
      await prisma.admin.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      });
    }

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const emailData = {
      to: email,
      subject: "Reset Your Password - Fireworks Shop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hi ${user.name},</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    };

    emailService.sendEmail(emailData).catch((err) => {
      console.error("Failed to send reset email:", err);
    });

    res.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send reset email",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        error: "Token and password are required",
      });
    }

    let user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });
    let userType = "user";

    if (!user) {
      user = await prisma.admin.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: { gt: new Date() },
        },
      });
      userType = "admin";
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (userType === "admin") {
      await prisma.admin.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
    }

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      error: "Password reset failed",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    let user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        phoneNumber: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
      },
    });
    let userType = "user";

    if (!user) {
      user = await prisma.admin.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          phoneNumber: true,
          currency: true,
          companyName: true,
          gstNumber: true,
        },
      });
      userType = "admin";
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        ...user,
        role: userType,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get user data",
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      await sessionManager.removeSession(req.userId, token);
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      error: "Logout failed",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, image, phoneNumber, address, city, state, zipCode, country } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Name is required",
      });
    }

    const updateData = {
      name,
      ...(image !== undefined && { image }),
      ...(phoneNumber !== undefined && { phoneNumber }),
      ...(address !== undefined && { address }),
      ...(city !== undefined && { city }),
      ...(state !== undefined && { state }),
      ...(zipCode !== undefined && { zipCode }),
      ...(country !== undefined && { country }),
    };

    let updatedUser;
    let userType = "user";

    try {
      updatedUser = await prisma.user.update({
        where: { id: req.userId },
        data: updateData,
      });
    } catch (error) {
      updatedUser = await prisma.admin.update({
        where: { id: req.userId },
        data: updateData,
      });
      userType = "admin";
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        ...updatedUser,
        role: userType,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update profile",
    });
  }
};

const googleAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    const token = generateToken(req.user.id);
    await sessionManager.addSession(req.user.id, token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    const redirectUrl = `${process.env.FRONTEND_URL}/auth/google/success?token=${token}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Google auth success error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

const googleAuthFailure = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_cancelled`);
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  logout,
  updateProfile,
  googleAuthSuccess,
  googleAuthFailure,
};
