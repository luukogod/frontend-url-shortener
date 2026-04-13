import { CreateShortLinkPayload, ShortLink } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
};

const request = async <T>(input: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${input}`, {
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
