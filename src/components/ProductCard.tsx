import { inquireWhatsappLink } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";

type Props = {
  name: string;
  sku: string;
  description: string;
  image: string;
};

export function ProductCard({ name, sku, description, image }: Props) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary/60">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
          }}
        />
        <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-[10px] font-mono tracking-wider text-foreground">
          {sku}
        </span>
      </div>
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
    </article>
  );
}
