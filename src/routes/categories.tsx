import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/catalog";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — Peter & Barbara Sportswear" },
      {
        name: "description",
        content: "Browse all seven sportswear categories manufactured by Peter & Barbara.",
      },
      { property: "og:title", content: "All Categories — Peter & Barbara Sportswear" },
      { property: "og:description", content: "Browse all seven sportswear categories." },
    ],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <p className="eyebrow text-brand">Catalog</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">All Categories</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Seven complete product families. Each engineered for its sport, manufactured to your
          specification.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="space-y-px bg-border">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="group grid grid-cols-12 items-center gap-4 bg-background px-6 py-10 transition-colors hover:bg-foreground hover:text-background"
            >
              <span className="eyebrow col-span-2 text-muted-foreground group-hover:text-background/60">
                0{i + 1}
              </span>
              <div className="col-span-7">
                <h2 className="text-2xl font-bold sm:text-3xl">{cat.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground group-hover:text-background/70">
                  {cat.tagline}
                </p>
              </div>
              <div className="col-span-2 hidden text-sm text-muted-foreground group-hover:text-background/70 sm:block">
                {cat.subcategories.length} types
              </div>
              <ArrowRight className="col-span-1 h-5 w-5 justify-self-end transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
