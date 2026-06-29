import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Peter & Barbara Sportswear, Sialkot Pakistan" },
      {
        name: "description",
        content:
          "Peter & Barbara is a B2B sportswear manufacturer based in Sialkot, Pakistan. We supply international brands and importers with premium technical apparel.",
      },
      { property: "og:title", content: "About Peter & Barbara Sportswear" },
      { property: "og:description", content: "B2B sportswear manufacturer in Sialkot, Pakistan." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <p className="eyebrow text-brand">About</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          A Sialkot factory, supplying the world's sporting brands.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl border-t border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted-foreground">Our Story</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed lg:col-span-8">
            <p>
              Peter & Barbara Sportswear is a B2B manufacturer based in Sialkot, Pakistan — the city
              that has supplied the world's sporting goods for over a century. We work exclusively
              with international brands, importers and federations who need a reliable production
              partner for technical apparel.
            </p>
            <p>
              From activewear and team uniforms to sport-specific kits and accessories, every
              garment leaves our factory built to perform. We don't sell to consumers. We sell to
              the brands that do.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted-foreground">Capabilities</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {[
              [
                "Full-Package Manufacturing",
                "Fabric sourcing, cutting, sewing, printing, embroidery and finishing — all in-house.",
              ],
              [
                "Custom Sublimation",
                "Edge-to-edge dye sublimation for unlimited colors, gradients and patterns.",
              ],
              [
                "Low MOQs",
                "Programs start from 100–500 units per style. Scale up to 50,000+ units per season.",
              ],
              ["Rapid Sampling", "Sample turnaround in 7–14 days. Bulk production in 30–45 days."],
              ["Quality Control", "Mid-line and final QC with full inspection reports."],
              [
                "Ethical Production",
                "Audited facility with documented compliance for EU and US markets.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-foreground pt-4">
                <h3 className="text-base font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted-foreground">By the numbers</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            {[
              ["15+", "Years exporting"],
              ["30+", "Countries served"],
              ["50K", "Units / month capacity"],
              ["24h", "Inquiry response"],
            ].map(([n, l]) => (
              <div key={n}>
                <p className="text-5xl font-extrabold tracking-tight text-brand">{n}</p>
                <p className="mt-2 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
