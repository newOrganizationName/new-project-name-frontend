import { apiClient } from "@/shared/api";
import type { SignUpRequest, AuthResponse } from "../model/auth.types";

export async function signupAction(
  data: SignUpRequest
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/signup", data);
}
