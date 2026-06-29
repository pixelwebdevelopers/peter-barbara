import { inquireWhatsappLink } from "@/lib/catalog";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  sku: string;
  description: string;
  image: string;
  alternateImage?: string;
};

export function ProductCard({ name, sku, description, image, alternateImage }: Props) {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(image);

  useEffect(() => {
    if (open) {
      setActiveImage(alternateImage || image);
    }
  }, [open, image, alternateImage]);

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
      </button>
      <div className="flex flex-1 flex-col gap-2 pt-4">
        <span className="font-mono text-xs font-bold tracking-wider text-muted-foreground">
          {sku}
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-wide">{name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        <a
          href={inquireWhatsappLink(name, sku)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Inquire about this product <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-background/90 text-foreground hover:bg-background z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative flex flex-col items-center gap-6 max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center flex-1 min-h-0">
              <img
                src={activeImage}
                alt={name}
                className="max-h-[70vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
              />
            </div>
            {alternateImage && (
              <div className="flex gap-4 p-2.5 bg-secondary/30 rounded-xl border border-border/30 backdrop-blur-md shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 bg-background/50 transition-all ${
                    activeImage === image
                      ? "border-brand scale-105 shadow-md shadow-brand/10"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label="View front view"
                >
                  <img src={image} alt="View 1" className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 text-[8px] font-semibold text-white rounded">
                    View 1
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage(alternateImage)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 bg-background/50 transition-all ${
                    activeImage === alternateImage
                      ? "border-brand scale-105 shadow-md shadow-brand/10"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label="View alternate view"
                >
                  <img src={alternateImage} alt="View 2" className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 text-[8px] font-semibold text-white rounded">
                    View 2
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
