"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutAction } from "../api/logoutAction";
import { useAuthStore } from "@/shared/store";
import { tokenStorage } from "@/shared/lib";

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const clearAuth = () => {
    logout();
    tokenStorage.removeAccessToken();
  };

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      clearAuth();
      router.push("/");
    },
    onError: () => {
      clearAuth();
    },
  });
}
