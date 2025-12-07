import { apiClient } from "@/shared/api";
import type { User } from "../model/auth.types";

export async function meQuery(): Promise<User | null> {
  try {
    return await apiClient.get<User>("/auth/me");
  } catch {
    // User is not authenticated
    return null;
  }
}
