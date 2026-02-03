const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const { connectDB, disconnectDB } = require("./config/database");
const apiRoutes = require("./routes");
const sessionManager = require("./utils/sessionManager");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(cookieParser());
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

// Passport middleware
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  app.use(passport.initialize());
  app.use(passport.session());
}

// Request logging
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
    originalSend.call(this, data);
  };
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Fireworks Shop API Server",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString() 
  });
});

app.use("/api", apiRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, async () => {
  await connectDB();
  
  const { initializeAdmin } = require("./utils/initializeAdmin");
  await initializeAdmin();
  
  // Clean expired sessions every hour
  setInterval(() => {
    sessionManager.cleanExpiredSessions();
  }, 60 * 60 * 1000);
  
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? '✅ Set' : '⚠️  Not set'}`);
  console.log(`📧 Email Service: ${process.env.SMTP_HOST ? '✅ Configured' : '⚠️  Not configured'}`);
  console.log(`🔑 Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? '✅ Enabled' : '⚠️  Disabled'}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});
