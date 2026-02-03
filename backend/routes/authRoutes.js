const express = require('express');
const passport = require('../config/passport');
const { authenticateToken } = require('../middleware/auth');
const {
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
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Google OAuth routes
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/auth/google/failure' }),
    googleAuthSuccess
  );
  
  router.get('/google/failure', googleAuthFailure);
}

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);
router.post('/logout', authenticateToken, logout);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
