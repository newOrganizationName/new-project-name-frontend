"use client";

import { useEffect, useRef } from "react";
import { useMe } from "@/features/auth";
import { tokenStorage } from "@/shared/lib";

interface Props {
  children: React.ReactNode;
}

/**
 * Initializes auth session on app load.
 * Checks if accessToken exists in localStorage and fetches user profile.
 * 
 * TODO: This should be replaced with httpOnly cookies on the backend.
 */
export function AuthSessionInitializer({ children }: Props) {
  const initialized = useRef(false);
  const { refetch } = useMe();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      
      // Only try to fetch user if we have an access token
      const hasToken = !!tokenStorage.getAccessToken();
      if (hasToken) {
        refetch();
      }
    }
  }, [refetch]);

  return <>{children}</>;
}
