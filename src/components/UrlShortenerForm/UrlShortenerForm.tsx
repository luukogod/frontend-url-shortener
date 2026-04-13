"use client";

import { FormEvent, useState } from "react";

type UrlShortenerFormProps = {
  submitting: boolean;
  onSubmit: (value: string) => Promise<boolean>;
};

export const UrlShortenerForm = ({ submitting, onSubmit }: UrlShortenerFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created = await onSubmit(value);
    if (created) {
      setValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6"
    >
      <label htmlFor="url-input" className="mb-2 block text-sm font-medium text-slate-700">
        Enter URL
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="url-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-offset-2 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Shorten URL"}
        </button>
      </div>
    </form>
  );
};
