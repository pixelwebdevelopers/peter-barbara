import { Link } from "@tanstack/react-router";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type CarouselProduct = {
  image: string;
  title: string;
  subtitle: string;
  slug: string; // category slug
  hash?: string; // subcategory section id
};

export function ProductCarousel({ items }: { items: CarouselProduct[] }) {
  const [zoomed, setZoomed] = useState<CarouselProduct | null>(null);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  if (items.length === 0) return null;

  return (
    <>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {items.map((item, i) => (
            <CarouselItem
              key={`${item.slug}-${item.hash ?? "cat"}-${i}`}
              className="basis-4/5 pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="group block">
                <div className="relative aspect-square overflow-hidden bg-secondary/60">
                  <button
                    type="button"
                    onClick={() => setZoomed(item)}
                    className="block h-full w-full cursor-zoom-in"
                    aria-label={`View ${item.title} larger`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                  <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-background/0 text-foreground opacity-0 transition-opacity group-hover:bg-background/90 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </div>
                <Link
                  to="/category/$slug"
                  params={{ slug: item.slug }}
                  hash={item.hash}
                  className="block pt-4"
                >
                  <p className="eyebrow text-muted-foreground">{item.subtitle}</p>
                  <h3 className="mt-1 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide group-hover:text-brand">
                    {item.title}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </h3>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:-left-12" />
        <CarouselNext className="right-2 lg:-right-12" />
      </Carousel>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.title}
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-background/90 text-foreground hover:bg-background"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={zoomed.image}
            alt={zoomed.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}
