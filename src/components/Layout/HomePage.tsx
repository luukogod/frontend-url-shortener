"use client";

import { ShortLinksList } from "@/components/ShortLinksList/ShortLinksList";
import { UrlShortenerForm } from "@/components/UrlShortenerForm/UrlShortenerForm";
import { useUrlShortener } from "@/hooks/useUrlShortener";

export const HomePage = () => {
  const {
    links,
    loading,
    submitting,
    errorMessage,
    successMessage,
    createLink,
    clearMessages,
  } = useUrlShortener();

  return (
    <div className="space-y-6">
      <UrlShortenerForm submitting={submitting} onSubmit={createLink} />

      {(errorMessage || successMessage) && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            errorMessage
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p>{errorMessage || successMessage}</p>
            <button
              type="button"
              onClick={clearMessages}
              className="text-xs font-medium uppercase tracking-wide opacity-80 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900">Your short links</h2>
        <ShortLinksList links={links} loading={loading} />
      </section>
    </div>
  );
};
