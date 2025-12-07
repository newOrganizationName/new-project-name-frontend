import { apiClient } from "@/shared/api";

export async function logoutAction(): Promise<void> {
  await apiClient.post<{ message: string }>("/auth/logout");
}
