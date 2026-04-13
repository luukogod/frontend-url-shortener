import { ShortLink } from "@/types";
import { ShortLinkItem } from "@/components/ShortLinkItem/ShortLinkItem";

type ShortLinksListProps = {
  links: ShortLink[];
  loading: boolean;
};

export const ShortLinksList = ({ links, loading }: ShortLinksListProps) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm text-slate-600">Loading links...</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          No links yet. Create your first short URL above.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {links.map((link) => (
        <ShortLinkItem key={link.id} link={link} />
      ))}
    </ul>
  );
};
