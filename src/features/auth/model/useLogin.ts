"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "../api/loginAction";
import { meQuery } from "../api/meQuery";
import { useAuthStore } from "@/shared/store";
import { tokenStorage } from "@/shared/lib";
import type { LoginRequest } from "../model/auth.types";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await loginAction(data);

      /**
       * TODO: Temporary solution! Storing accessToken in localStorage.
       */
      tokenStorage.setAccessToken(response.accessToken);

      const user = await meQuery();

      return user;
    },
    onSuccess: (user) => {
      if (user) {
        setUser(user);
        toast.success("Вітаємо! Ви увійшли в акаунт");
        router.push("/");
      }
    },
  });
}
