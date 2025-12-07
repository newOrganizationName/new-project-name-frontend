export interface User {
  id: string;
  email: string;
}

// Note: SignUpRequest and LoginRequest are intentionally separate
// to allow independent evolution (e.g., adding name, phone, etc.)

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface ApiError {
  status: number;
  message: string | string[];
  error?: string;
}
