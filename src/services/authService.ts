import api from '@/lib/api';
import { User, AuthResponse, VerifyEmailResponse } from '@/types/auth';

export const authService = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
  }): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email, password });
    // Backend sets HTTP-only cookie automatically
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    // Backend clears HTTP-only cookie automatically
  },

  async getCurrentUser(): Promise<{ success: boolean; data: User }> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<{ success: boolean; data: User }> {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};
