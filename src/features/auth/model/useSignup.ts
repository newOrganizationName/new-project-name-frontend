"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signupAction } from "../api/signupAction";
import { meQuery } from "../api/meQuery";
import { useAuthStore } from "@/shared/store";
import { tokenStorage } from "@/shared/lib";
import type { SignUpRequest } from "../model/auth.types";

export function useSignup() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await signupAction(data);

      /**
       * TODO: Temporary solution! Storing accessToken in localStorage.
       * Should be replaced with httpOnly cookies on the backend.
       */
      tokenStorage.setAccessToken(response.accessToken);

      const user = await meQuery();
      return user;
    },
    onSuccess: (user) => {
      if (user) {
        setUser(user);
        toast.success("Акаунт успішно створено!");
        router.push("/");
      }
    },
  });
}
