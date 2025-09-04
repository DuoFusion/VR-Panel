import { MessageStatus } from "./Common";

// ************ Login ***********
export interface LoginPayload {
  email: string;
  password: string;
}

export interface User extends LoginPayload{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  type: string;
  link: string;
  role: string;
  confirmPassword?: string;
  otp: number | null;
  otpExpireTime: string | null;
  isEmailVerified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
}

export interface LoginResponse extends MessageStatus{
  data: {
    token: string;
    user: User;
  };
}

// ************ Forget Password ***********

export interface ForgetPasswordPayload {
  email: string;
}

// ************ Otp ***********

export interface OtpPayload {
  otp: string;
  email?: string | null;
}

// ************ Reset Password ***********

export interface ResetPasswordPayload {
  email?: string | null;
  newPassword: string;
}

export interface ResetPasswordFormValues {
  email?: string;
  password: string;
}

// ************ Change Password ***********

export interface ChangePasswordPayload {
  email?: string | null;
  password: string;
  confirmPassword: string;
}
