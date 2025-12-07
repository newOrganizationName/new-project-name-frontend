"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { meQuery } from "../api/meQuery";
import { useAuthStore } from "@/shared/store";
import { tokenStorage } from "@/shared/lib";

export function useMe() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: meQuery,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false, // Manual control via refetch
  });

  useEffect(() => {
    if (query.isLoading || query.isFetching) {
      return;
    }

    if (query.data) {
      setUser(query.data);
    } else if (query.isSuccess || query.isError) {
      setUser(null);
      if (query.isError) {
        tokenStorage.removeAccessToken();
      }
    }
  }, [query.data, query.isSuccess, query.isError, query.isLoading, query.isFetching, setUser]);

  useEffect(() => {
    const hasToken = !!tokenStorage.getAccessToken();
    if (!hasToken || (!query.isLoading && !query.isFetching)) {
      setLoading(false);
    }
  }, [query.isLoading, query.isFetching, setLoading]);

  return query;
}
