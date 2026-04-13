"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createShortLink, getAllShortLinks } from "@/lib/api";
import { ShortLink } from "@/types";
import { isValidUrl } from "@/utils/validation";

type UseUrlShortenerResult = {
  links: ShortLink[];
  loading: boolean;
  submitting: boolean;
  errorMessage: string;
  successMessage: string;
  createLink: (url: string) => Promise<boolean>;
  clearMessages: () => void;
};

export const useUrlShortener = (): UseUrlShortenerResult => {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const data = await getAllShortLinks();
        setLinks(
          [...data].sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        );
      } catch {
        setErrorMessage("Could not load existing links.");
      } finally {
        setLoading(false);
      }
    };

    void loadLinks();
  }, []);

  const clearMessages = useCallback(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, []);

  const createLink = useCallback(async (url: string) => {
    clearMessages();

    if (!isValidUrl(url)) {
      setErrorMessage("Please enter a valid URL including http:// or https://");
      return false;
    }

    setSubmitting(true);

    try {
      const created = await createShortLink({ original_url: url.trim() });
      setLinks((prev) => [created, ...prev]);
      setSuccessMessage("Short link created successfully.");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to create short link.");
      }
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [clearMessages]);

  return useMemo(
    () => ({
      links,
      loading,
      submitting,
      errorMessage,
      successMessage,
      createLink,
      clearMessages,
    }),
    [
      links,
      loading,
      submitting,
      errorMessage,
      successMessage,
      createLink,
      clearMessages,
    ]
  );
};
