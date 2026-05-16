export interface SignupBody {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface SigninBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface ForgotPasswordBody {
  email: string;
}

export interface VerifyResetCodeBody {
  resetCode: string;
}

export interface ResetPasswordBody {
  email: string;
  newPassword: string;
}

export interface ChangePasswordBody {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface UpdateUserBody {
  name?: string;
  email?: string;
  phone?: string;
}
