# 🛠️ Setup Guide - Fireworks E-Commerce

Complete setup instructions for the Fireworks Shop platform.

## 📋 Prerequisites

- **Node.js** v18 or higher
- **MongoDB** installed and running
- **npm** or **yarn**
- **Git** (optional)

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
# Install frontend dependencies (from root)
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Configure Backend

```bash
# Navigate to backend
cd backend

# Create .env file from example
copy .env.example .env

# Edit .env file with your settings
```

**Required Environment Variables:**
```env
DATABASE_URL="mongodb://localhost:27017/fireworks-shop"
JWT_SECRET="your-random-secret-key-here"
PORT=5000
FRONTEND_URL="http://localhost:3000"
ADMIN_EMAIL="admin@fireworks.com"
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Setup Database

```bash
# Make sure MongoDB is running
mongod

# From backend directory
cd backend

# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Verify with Prisma Studio (optional)
npx prisma studio
```

### Step 4: Start Development Servers

**Option A: Manual Start (Recommended)**

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev
# Backend runs on http://localhost:5000

# Terminal 2 - Start Frontend
npm run dev
# Frontend runs on http://localhost:3000
```

**Option B: Using Scripts (Windows)**

```bash
# Create start-dev.bat in root:
@echo off
start cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak
start cmd /k "npm run dev"

# Then run:
start-dev.bat
```

### Step 5: Verify Installation

1. **Check Backend Health**
```bash
curl http://localhost:5000/health
# Should return: {"status":"OK","timestamp":"..."}
```

2. **Check Frontend**
Open browser: `http://localhost:3000`

3. **Test Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fireworks.com","password":"Admin@123"}'
```

## 🔐 Default Admin Account

After first backend start, a default admin is created:

```
Email: admin@fireworks.com
Password: Admin@123
```

⚠️ **IMPORTANT**: Change this password immediately after first login!

## 🎨 Frontend Integration

### 1. Install Axios

```bash
npm install axios
```

### 2. Create API Client

Create `src/lib/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create Auth Service

Create `src/services/authService.ts`:

```typescript
import api from '@/lib/api';

export const authService = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
  }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(data: any) {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  async verifyEmail(token: string) {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token: string, password: string) {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};
```

### 4. Update Login Page

Update `src/app/login/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

## 📧 Optional: Email Service Setup

### Using Gmail

1. Enable 2-Factor Authentication
2. Generate App Password
3. Update `backend/.env`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="Fireworks Shop <your-email@gmail.com>"
```

### Using SendGrid

```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
EMAIL_FROM="noreply@fireworks.com"
```

## 🔑 Optional: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Update `backend/.env`:

```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## 🛠️ Development Tools

### Prisma Studio (Database GUI)
```bash
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

### MongoDB Compass
Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)  
Connect to: `mongodb://localhost:27017`

### Postman
Import `backend/Fireworks-Auth-API.postman_collection.json` for API testing

## 🐛 Common Issues

### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB
```bash
mongod
```

### 2. Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change PORT in `backend/.env` or kill the process
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <pid> /F
```

### 3. Prisma Client Not Found
```
Error: Cannot find module '@prisma/client'
```
**Solution**:
```bash
cd backend
npm run prisma:generate
```

### 4. CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Verify FRONTEND_URL in `backend/.env` matches your frontend URL

### 5. JWT Secret Not Set
**Solution**: Add JWT_SECRET to `backend/.env`
```bash
# Generate one:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ✅ Verification Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB installed and running
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] `backend/.env` configured
- [ ] Prisma client generated
- [ ] Database schema pushed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Health check returns OK
- [ ] Can login with default admin
- [ ] Postman collection imported

## 🚀 Next Steps

1. Change default admin password
2. Integrate auth with frontend pages
3. Add protected routes
4. Create user dashboard
5. Build admin panel
6. Add product management

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)

---

**Need help?** Check the troubleshooting section or review the backend README.
