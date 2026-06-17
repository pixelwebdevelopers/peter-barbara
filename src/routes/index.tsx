import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/catalog";
import { getCoverImage } from "@/lib/productImages";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCarousel, type CarouselProduct } from "@/components/ProductCarousel";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import {
  ArrowRight,
  Dumbbell,
  Trophy,
  Gauge,
  Wind,
  Flower2,
  Bike,
  ShoppingBag,
  ClipboardList,
  Scissors,
  Factory,
  Truck,
  type LucideIcon,
} from "lucide-react";
import hero11 from "@/assets/hero-1-1.jpg";
import hero12 from "@/assets/hero-1-2.jpg";
import hero13 from "@/assets/hero-1-3.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const HERO_SLIDES = [hero11, hero12, hero13];

// Relevant icon per category (replaces the old 01–07 numbering on the home grid).
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  activewear: Dumbbell,
  "team-sportswear": Trophy,
  "performance-wear": Gauge,
  outerwear: Wind,
  "yoga-lifestyle": Flower2,
  "sport-specific": Bike,
  accessories: ShoppingBag,
};

// Home page shows every category except the last (Accessories — still reachable
// from the header, footer and /categories).
const HOME_CATEGORIES = CATEGORIES.filter((c) => c.slug !== "accessories");

// Carousel 1 — one signature product per category, links to that category page.
const FEATURED: CarouselProduct[] = HOME_CATEGORIES.flatMap((cat) => {
  for (const sub of cat.subcategories) {
    const cover = getCoverImage(cat.slug, sub.slug);
    if (cover) return [{ image: cover, title: cat.name, subtitle: "Explore category", slug: cat.slug }];
  }
  return [];
});

// Carousel 2 — every sub-category, links straight to its section on the category page.
const EXPLORE: CarouselProduct[] = HOME_CATEGORIES.flatMap((cat) =>
  cat.subcategories.flatMap((sub) => {
    const cover = getCoverImage(cat.slug, sub.slug);
    return cover
      ? [{ image: cover, title: sub.name, subtitle: cat.short, slug: cat.slug, hash: sub.slug }]
      : [];
  }),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peter & Barbara Sportswear — B2B Manufacturer, Sialkot Pakistan" },
      { name: "description", content: "Premium sportswear manufactured in Sialkot, Pakistan for international brands and importers. Activewear, team uniforms, performance wear, accessories." },
      { property: "og:title", content: "Peter & Barbara Sportswear — Built for Performance" },
      { property: "og:description", content: "B2B sportswear manufacturer in Sialkot, Pakistan." },
      { property: "og:image", content: hero11 },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-black">
        <HeroSlideshow images={HERO_SLIDES} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8">
          <p className="eyebrow text-white/80">B2B Sportswear Manufacturer · Sialkot, Pakistan</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Built for performance.
            <br />
            <span className="text-white/70">Made for your brand.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
            Full-package sportswear manufacturing for international brands, retailers and federations. Cut-and-sew, sublimation, embroidery and bespoke development — under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/categories"
              className="eyebrow inline-flex items-center gap-2 bg-white px-6 py-3.5 text-foreground hover:bg-brand hover:text-brand-foreground"
            >
              Browse Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="eyebrow inline-flex items-center gap-2 border border-white px-6 py-3.5 text-white hover:bg-white hover:text-foreground"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 text-xs uppercase tracking-widest text-muted-foreground sm:px-6 lg:px-8">
          <span>Full-Package Manufacturing</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>OEKO-TEX Certified Fabrics</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>Low MOQs · 100–500 Units</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>15+ Years Exporting Worldwide</span>
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-brand">Featured</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Signature pieces across the range.
            </h2>
          </div>
          <Link to="/categories" className="eyebrow inline-flex items-center gap-2 hover:text-brand">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductCarousel items={FEATURED} />
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-brand">The Catalog</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Built for every sport.<br />One manufacturing partner.
            </h2>
          </div>
          <Link to="/categories" className="eyebrow inline-flex items-center gap-2 hover:text-brand">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {HOME_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? Dumbbell;
            return (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="group flex flex-col bg-background p-8 transition-colors hover:bg-foreground hover:text-background"
              >
                <Icon className="h-8 w-8 text-brand transition-colors group-hover:text-background" strokeWidth={1.5} />
                <h3 className="mt-8 text-2xl font-bold tracking-tight">{cat.name}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground group-hover:text-background/70">
                  {cat.tagline}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground group-hover:text-background/60">
                    {cat.subcategories.length} product types
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="aspect-[4/5] overflow-hidden lg:aspect-auto">
            <img src={hero2} alt="Athlete training in Peter & Barbara performance gear" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-0 py-20 lg:px-16">
            <p className="eyebrow text-brand">Made in Sialkot</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              A heritage of craft.<br />A standard for sport.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Sialkot has supplied the world's sporting goods for over a century. Peter & Barbara extends that legacy into modern technical apparel — pairing skilled local craftsmanship with international quality systems, sustainable fabrics and rapid sampling.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex gap-3"><span className="text-brand">●</span> In-house fabric sourcing, cutting, sewing, printing and embroidery</li>
              <li className="flex gap-3"><span className="text-brand">●</span> Sample-to-bulk in as little as 4 weeks</li>
              <li className="flex gap-3"><span className="text-brand">●</span> Compliance with EU and US import standards</li>
              <li className="flex gap-3"><span className="text-brand">●</span> Direct factory pricing — no middlemen</li>
            </ul>
            <Link to="/about" className="eyebrow mt-10 inline-flex w-fit items-center gap-2 border border-foreground px-5 py-3 hover:bg-foreground hover:text-background">
              About the factory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="eyebrow text-brand">How We Work</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          From inquiry to shipment.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: ClipboardList, t: "Inquiry", d: "Share your tech-pack, reference or concept. We respond within 24 hours with feasibility and indicative pricing." },
            { Icon: Scissors, t: "Sampling", d: "Approved samples shipped within 7–14 days. Iterate on fabric, fit and finishing until it's right." },
            { Icon: Factory, t: "Production", d: "Bulk manufacturing with mid-line QC, full inspection and ethical compliance reporting." },
            { Icon: Truck, t: "Delivery", d: "Sea, air or courier — DDP or FOB. Your goods on time, every time." },
          ].map((s) => (
            <div key={s.t} className="border-t border-foreground pt-6">
              <s.Icon className="h-8 w-8 text-brand" strokeWidth={1.5} />
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE CAROUSEL */}
      <section className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-brand">Explore the range</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Browse by product type.
              </h2>
            </div>
            <Link to="/categories" className="eyebrow inline-flex items-center gap-2 hover:text-brand">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProductCarousel items={EXPLORE} />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <img src={hero3} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="eyebrow text-background/70">Let's build your line</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Your brand. Our factory.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-background/80">
            Request a digital catalog, send a tech-pack, or schedule a video tour of our Sialkot facility.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="eyebrow inline-flex items-center gap-2 bg-brand px-6 py-3.5 text-brand-foreground hover:bg-brand/90">
              Contact Us
            </Link>
            <Link to="/categories" className="eyebrow inline-flex items-center gap-2 border border-background px-6 py-3.5 hover:bg-background hover:text-foreground">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
