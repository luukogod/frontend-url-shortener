import { CreateShortLinkPayload, ShortLink } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const API_REQUEST_TIMEOUT_MS = 15_000;

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
};

const fetchWithTimeout = async (
  url: string,
  init?: RequestInit
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        "The server took too long to respond. Check that the backend is running."
      );
    }
    if (error instanceof TypeError) {
      throw new Error(
        "Could not reach the server. Check your connection and that the backend is running."
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const request = async <T>(input: string, init?: RequestInit): Promise<T> => {
  const response = await fetchWithTimeout(`${API_BASE_URL}${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as T;
};

export const createShortLink = (payload: CreateShortLinkPayload) =>
  request<ShortLink>("/api/shortlinks", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getAllShortLinks = () => request<ShortLink[]>("/api/shortlinks");

export const getShortLinkById = (id: string) =>
  request<ShortLink>(`/api/shortlinks/${encodeURIComponent(id)}`);
