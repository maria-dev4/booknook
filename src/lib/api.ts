const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getToken = async () => {
  const res = await fetch("/api/token");
  if (!res.ok) return null;
  const data = await res.json();
  return data.token as string;
};

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = await getToken();
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }
  return data;
};