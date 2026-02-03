export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  image?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthError {
  success: false;
  error: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  alreadyVerified?: boolean;
}
