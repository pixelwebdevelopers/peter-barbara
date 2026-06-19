import { inquireWhatsappLink } from "@/lib/catalog";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  sku: string;
  description: string;
  image: string;
};

export function ProductCard({ name, sku, description, image }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative aspect-square cursor-zoom-in overflow-hidden bg-secondary/60"
        aria-label={`View ${name} larger`}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
          }}
        />
        <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-[10px] font-mono tracking-wider text-foreground">
          {sku}
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-2 pt-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide">{name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        <a
          href={inquireWhatsappLink(name, sku)}
          target="_blank" rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Inquire about this product <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-background/90 text-foreground hover:bg-background"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={image}
            alt={name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </article>
  );
}
