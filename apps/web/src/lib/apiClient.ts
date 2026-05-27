import { useAuthStore } from "../store/authStore";

const BASE_URL = "http://localhost:3000/api";

export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const token = useAuthStore.getState().token;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Something went wrong");
    }

    return data;
  },

  get(endpoint: string) {
    return this.fetch(endpoint, { method: "GET" });
  },

  post(endpoint: string, body: any) {
    return this.fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch(endpoint: string, body: any) {
    return this.fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete(endpoint: string) {
    return this.fetch(endpoint, { method: "DELETE" });
  },
};
