"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { ShortLink } from "@/types";

type ShortLinkItemProps = {
  link: ShortLink;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export const ShortLinkItem = ({ link }: ShortLinkItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="grid min-w-0 flex-1 gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Original URL</p>
            <p className="truncate text-sm text-slate-800">{link.original_url}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Short URL</p>
            <a
              href={link.short_url}
              target="_blank"
              rel="noreferrer"
              className="truncate text-sm font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              {link.short_url}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={link.short_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800"
            >
              Test Link
            </a>
            <span className="text-xs text-slate-500">{formatDate(link.created_at)}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1.5 sm:items-end">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">QR code</p>
          <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-inner">
            <QRCode
              value={link.short_url}
              size={104}
              level="M"
              title={`QR code for ${link.short_url}`}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
