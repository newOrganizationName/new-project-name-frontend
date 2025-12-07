import { apiClient } from "@/shared/api";
import type { User } from "../model/auth.types";

interface ApiError extends Error {
  status?: number;
}

export async function meQuery(): Promise<User | null> {
  try {
    return await apiClient.get<User>("/auth/me");
  } catch (error) {
    const apiError = error as ApiError;
    
    if (apiError.status === 401 || apiError.status === 403) {
      return null;
    }
    
    throw error;
  }
}
