import { AxiosError } from "axios";

export const ErrorMessage = (error: unknown, fallback = "Something went wrong"): string => {
  if (!error) return fallback;

  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    return axiosError.response?.data?.message || axiosError.response?.data?.error || axiosError.message || fallback;
  }

  // Handle native JS Error
  if (error instanceof Error) {
    return error.message || fallback;
  }

  // Fallback for unknown error types
  return fallback;
};
