const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiError extends Error {
  status: number;
  data?: unknown;
}

export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: "include", // Enable cookies
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const error = new Error(`API error: ${res.status}`) as ApiError;
    error.status = res.status;
    try {
      error.data = await res.json();
    } catch {
      // Response is not JSON
    }
    throw error;
  }

  // Handle empty responses
  const text = await res.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text);
}

// Convenience methods
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
