const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { prisma } = require('./database');

// Configure Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const adminEmails = [process.env.ADMIN_EMAIL];
      const isAdmin = adminEmails.includes(email.toLowerCase());

      let user;
      let userType;

      if (isAdmin) {
        user = await prisma.admin.findFirst({
          where: {
            OR: [
              { googleId: profile.id },
              { email: email }
            ]
          }
        });

        if (user) {
          if (user.provider === "local" && !user.isVerified) {
            return done(new Error("Please verify your email first"), null);
          }

          const updateData = {
            googleId: profile.id,
            provider: 'google',
            isVerified: true,
            lastLogin: new Date()
          };
          
          if (user.provider === 'google') {
            updateData.name = profile.displayName;
          }
          
          const isGoogleImage = user.image && user.image.includes('googleusercontent.com');
          if (!user.image || isGoogleImage || user.provider === 'google') {
            updateData.image = profile.photos[0]?.value;
          }
          
          user = await prisma.admin.update({
            where: { id: user.id },
            data: updateData
          });
        } else {
          user = await prisma.admin.create({
            data: {
              email: email,
              googleId: profile.id,
              name: profile.displayName,
              image: profile.photos[0]?.value,
              provider: 'google',
              isVerified: true,
              lastLogin: new Date()
            }
          });
        }
        userType = 'admin';
      } else {
        user = await prisma.user.findFirst({
          where: {
            OR: [
              { googleId: profile.id },
              { email: email }
            ]
          }
        });

        if (user) {
          if (user.provider === "local" && !user.isVerified) {
            return done(new Error("Please verify your email first"), null);
          }

          const updateData = {
            googleId: profile.id,
            provider: 'google',
            isVerified: true,
            lastLogin: new Date()
          };
          
          if (user.provider === 'google') {
            updateData.name = profile.displayName;
          }
          
          const isGoogleImage = user.image && user.image.includes('googleusercontent.com');
          if (!user.image || isGoogleImage || user.provider === 'google') {
            updateData.image = profile.photos[0]?.value;
          }
          
          user = await prisma.user.update({
            where: { id: user.id },
            data: updateData
          });
        } else {
          user = await prisma.user.create({
            data: {
              email: email,
              googleId: profile.id,
              name: profile.displayName,
              image: profile.photos[0]?.value,
              provider: 'google',
              isVerified: true,
              lastLogin: new Date()
            }
          });
        }
        userType = 'user';
      }

      user.role = userType;
      return done(null, user);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          isVerified: true,
          isActive: true
        }
      });
      let userType = 'user';

      if (!user) {
        user = await prisma.admin.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            isVerified: true,
            isActive: true
          }
        });
        userType = 'admin';
      }

      if (user) {
        user.role = userType;
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}

module.exports = passport;
