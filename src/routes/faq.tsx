import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

const FAQS = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Our standard MOQ is 100–500 units per style and color, depending on the product category. We can sometimes accommodate lower MOQs for sampling or startup brands — please reach out to discuss.",
  },
  {
    q: "Do you do private label and custom branding?",
    a: "Yes. We are a 100% B2B manufacturer. Every garment is produced under your brand — custom hangtags, woven labels, polybags and packaging are all included.",
  },
  {
    q: "What is your typical lead time?",
    a: "Samples ship within 7–14 days of approved tech-pack. Bulk production typically takes 30–45 days after sample approval, depending on quantity and complexity.",
  },
  {
    q: "What fabrics and finishes do you offer?",
    a: "Polyester, polyester-spandex, nylon, cotton, modal blends, recycled polyester (rPET), french terry, fleece, mesh, ripstop and more. Print options include sublimation, screen, DTF, heat-transfer, embroidery, applique and silicone.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We export worldwide. Major markets include the United States, United Kingdom, EU, Australia, Canada, UAE and the Gulf. Shipping is available via sea, air or courier on FOB or DDP terms.",
  },
  {
    q: "Can you work from my tech-pack or develop from a sample?",
    a: "Both. We accept tech-packs in any standard format (Adobe Illustrator, PDF, Excel) and can also reverse-engineer from a physical reference sample.",
  },
  {
    q: "Do you have compliance and certifications?",
    a: "Yes. Our facility is audited for social compliance. Fabrics can be sourced OEKO-TEX certified on request. Full compliance documentation is provided for EU and US imports.",
  },
  {
    q: "How do I request a quote?",
    a: "Use the Contact page, WhatsApp us directly, or email  sportswear@peterbarbara.com with your tech-pack or product brief. We respond to all inquiries within 24 hours.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Peter & Barbara Sportswear" },
      {
        name: "description",
        content:
          "Common questions about B2B sportswear manufacturing, MOQs, lead times, shipping and customization.",
      },
      { property: "og:title", content: "FAQ — Peter & Barbara Sportswear" },
      {
        property: "og:description",
        content: "Common questions about working with our Sialkot factory.",
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <p className="eyebrow text-brand">FAQ</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">Working with us.</h1>
        <p className="mt-4 text-muted-foreground">
          Everything you need to know before placing your first order.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-start justify-between gap-6">
                <h2 className="text-lg font-semibold sm:text-xl">{f.q}</h2>
                <span className="mt-1 text-2xl font-light text-brand transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 pr-12 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
