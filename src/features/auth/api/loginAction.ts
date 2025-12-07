import { apiClient } from "@/shared/api";
import type { LoginRequest, AuthResponse } from "../model/auth.types";

export async function loginAction(data: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/login", data);
}
