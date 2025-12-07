import { getErrorMessage } from "@/shared/lib/errorMessages";
import { tokenStorage } from "@/shared/lib/tokenStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiError extends Error {
  status: number;
  data?: unknown;
}

/**
 * TODO: Temporary solution! Getting accessToken from localStorage.
 * This should be replaced with httpOnly cookies on the backend for better security.
 */
function getAuthHeaders(): Record<string, string> {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
}

export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  let res: Response;
  
  try {
    res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: "include", // Enable cookies
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...(options?.headers || {}),
      },
    });
  } catch (networkError) {
    const error = new Error(getErrorMessage(networkError)) as ApiError;
    error.status = 0;
    throw error;
  }

  if (!res.ok) {
    let errorData: unknown;
    try {
      errorData = await res.json();
    } catch {
      // Response is not JSON
    }
    
    const error = new Error(getErrorMessage(errorData)) as ApiError;
    error.status = res.status;
    error.data = errorData;
    throw error;
  }

  // Handle empty responses
  const text = await res.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text);
}

export const apiClient = {
  get: <T>(url: string, options?: RequestInit) =>
    api<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body?: unknown, options?: RequestInit) =>
    api<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(url: string, body?: unknown, options?: RequestInit) =>
    api<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
    api<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(url: string, options?: RequestInit) =>
    api<T>(url, { ...options, method: "DELETE" }),
};
