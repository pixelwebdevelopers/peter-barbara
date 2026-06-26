import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CATEGORIES, getCategory, inquireWhatsappLink, type Category } from "@/lib/catalog";
import { getImages } from "@/lib/productImages";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = getCategory(params.slug);
    const title = c ? `${c.name} — Peter & Barbara Sportswear` : "Category — Peter & Barbara";
    const desc = c?.intro ?? "Sportswear manufactured in Sialkot, Pakistan.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return cat;
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Category not found</h1>
        <Link to="/categories" className="eyebrow mt-6 inline-block border border-foreground px-5 py-3">
          View all categories
        </Link>
      </div>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const cat = Route.useLoaderData() as Category;
  const idx = CATEGORIES.findIndex((c) => c.slug === cat.slug);
  const next = CATEGORIES[(idx + 1) % CATEGORIES.length];

  return (
    <SiteLayout>
      {/* Header */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link to="/categories" className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-brand">
            <ArrowLeft className="h-3 w-3" /> All Categories
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow text-brand">0{idx + 1} · {cat.short}</p>
              <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{cat.name}</h1>
              <p className="mt-4 text-xl text-muted-foreground">{cat.tagline}</p>
            </div>
            <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
              <p className="text-sm text-muted-foreground">{cat.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategory sections — each has its own image grid */}
      {cat.subcategories.map((sub, sIdx) => {
        const products = getImages(cat.slug, sub.slug);
        return (
          <section key={sub.slug} id={sub.slug} className="scroll-mt-24 border-b border-border">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-muted-foreground">
                    {String(sIdx + 1).padStart(2, "0")} / {String(cat.subcategories.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{sub.name}</h2>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{sub.description}</p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="font-mono text-xs text-muted-foreground">SKU PREFIX: {sub.sku}</span>
                  <a
                    href={inquireWhatsappLink(sub.name, sub.sku)}
                    target="_blank" rel="noopener noreferrer"
                    className="eyebrow inline-flex items-center gap-2 bg-brand px-4 py-2.5 text-brand-foreground hover:bg-brand/90"
                  >
                    Inquire <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {products.length > 0 ? (
                <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((prod, i) => (
                    <ProductCard
                      key={prod.id}
                      image={prod.image}
                      alternateImage={prod.alternateImage}
                      name={`${sub.name} ${String(i + 1).padStart(2, "0")}`}
                      sku={`${sub.sku}-${String(i + 1).padStart(3, "0")}`}
                      description={sub.description}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-10 text-sm text-muted-foreground">
                  New styles coming soon — contact us for the latest {sub.name.toLowerCase()} samples.
                </p>
              )}
            </div>
          </section>
        );
      })}

      {/* Next category */}
      <section className="bg-foreground text-background">
        <Link
          to="/category/$slug"
          params={{ slug: next.slug }}
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-16 transition-opacity hover:opacity-80 sm:px-6 lg:px-8"
        >
          <div>
            <p className="eyebrow text-background/60">Next Category</p>
            <h3 className="mt-2 text-3xl font-bold sm:text-4xl">{next.name}</h3>
          </div>
          <ArrowRight className="h-8 w-8" />
        </Link>
      </section>
    </SiteLayout>
  );
}
