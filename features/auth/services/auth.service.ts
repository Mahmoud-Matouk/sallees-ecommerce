import { apiClient, authHeaders } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type {
  SignupBody,
  SigninBody,
  AuthResponse,
  ForgotPasswordBody,
  VerifyResetCodeBody,
  ResetPasswordBody,
  ChangePasswordBody,
  UpdateUserBody,
} from '../types/auth.types';

export const authService = {
  async signup(body: SignupBody): Promise<AuthResponse> {
    return apiClient.post(ENDPOINTS.auth.signup, { body });
  },

  async signin(body: SigninBody): Promise<AuthResponse> {
    return apiClient.post(ENDPOINTS.auth.signin, { body });
  },

  async forgotPassword(body: ForgotPasswordBody) {
    return apiClient.post(ENDPOINTS.auth.forgotPassword, { body });
  },

  async verifyResetCode(body: VerifyResetCodeBody) {
    return apiClient.post(ENDPOINTS.auth.verifyResetCode, { body });
  },

  async resetPassword(body: ResetPasswordBody) {
    return apiClient.put(ENDPOINTS.auth.resetPassword, { body });
  },

  async verifyToken(token: string) {
    return apiClient.get(ENDPOINTS.auth.verifyToken, {
      headers: authHeaders(token),
    });
  },

  async changePassword(body: ChangePasswordBody, token: string) {
    return apiClient.put(ENDPOINTS.users.changePassword, {
      body,
      headers: authHeaders(token),
    });
  },

  async updateMe(body: UpdateUserBody, token: string) {
    return apiClient.put(ENDPOINTS.users.updateMe, {
      body,
      headers: authHeaders(token),
    });
  },
};
