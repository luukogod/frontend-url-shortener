export type ShortLink = {
  id: string;
  original_url: string;
  short_url: string;
  created_at: string;
};

export type CreateShortLinkPayload = {
  original_url: string;
};

export type ApiError = {
  error: string;
};
