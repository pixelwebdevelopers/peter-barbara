import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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
  if (items.length === 0) return null;

  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent className="-ml-4">
        {items.map((item, i) => (
          <CarouselItem
            key={`${item.slug}-${item.hash ?? "cat"}-${i}`}
            className="basis-4/5 pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <Link
              to="/category/$slug"
              params={{ slug: item.slug }}
              hash={item.hash}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary/60">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-background/0 text-foreground opacity-0 transition-opacity group-hover:bg-background/90 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="pt-4">
                <p className="eyebrow text-muted-foreground">{item.subtitle}</p>
                <h3 className="mt-1 text-sm font-semibold uppercase tracking-wide group-hover:text-brand">
                  {item.title}
                </h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 lg:-left-12" />
      <CarouselNext className="right-2 lg:-right-12" />
    </Carousel>
  );
}
