import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_NUMBER, CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS } from "@/lib/catalog";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Peter & Barbara Sportswear, Sialkot" },
      { name: "description", content: "Get in touch with Peter & Barbara Sportswear in Sialkot, Pakistan for B2B sportswear manufacturing inquiries." },
      { property: "og:title", content: "Contact — Peter & Barbara Sportswear" },
      { property: "og:description", content: "Get in touch for B2B manufacturing inquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const category = data.get("category") as string;
    const message = data.get("message") as string;
    const text = encodeURIComponent(
      `New inquiry\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nInterested in: ${category}\n\n${message}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <p className="eyebrow text-brand">Contact</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Let's build your line.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Send us your tech-pack, reference samples or just a question. We reply to every inquiry within 24 hours.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Contact details */}
          <div className="space-y-8 lg:col-span-4">
            <div>
              <p className="eyebrow text-muted-foreground">Direct</p>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="text-sm font-medium">Factory</p>
                    <p className="text-sm text-muted-foreground">{COMPANY_ADDRESS}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted-foreground hover:text-brand">{CONTACT_EMAIL}</a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-brand">{CONTACT_PHONE}</a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-brand"
                    >
                      Chat instantly
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <p className="eyebrow text-muted-foreground">Hours (PKT, UTC+5)</p>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                <li>Mon–Sat · 9:00 – 18:00</li>
                <li>Sun · Closed</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <form onSubmit={onSubmit} className="border border-border bg-secondary/30 p-8 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Company" name="company" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone (optional)" name="phone" />
                <div className="sm:col-span-2">
                  <label className="eyebrow text-muted-foreground">Interested in</label>
                  <select name="category" required className="mt-2 block w-full border border-border bg-background px-4 py-3 text-sm focus:border-brand focus:outline-none">
                    <option value="">Select a category…</option>
                    <option>Activewear & Gym Wear</option>
                    <option>Team Sportswear & Uniforms</option>
                    <option>Performance Wear</option>
                    <option>Outerwear & Training Wear</option>
                    <option>Yoga & Lifestyle</option>
                    <option>Sport-Specific Wear</option>
                    <option>Accessories</option>
                    <option>Multiple / Full Catalog</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="eyebrow text-muted-foreground">Your message</label>
                  <textarea
                    name="message" rows={6} required
                    placeholder="Tell us about your project — quantities, fabrics, target price, lead time, etc."
                    className="mt-2 block w-full border border-border bg-background px-4 py-3 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="eyebrow mt-8 inline-flex items-center gap-2 bg-brand px-8 py-4 text-brand-foreground hover:bg-brand/90">
                Send via WhatsApp
              </button>

              {submitted && (
                <p className="mt-4 text-sm text-muted-foreground">
                  WhatsApp opened in a new tab. If it didn't, email us at {CONTACT_EMAIL}.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground">{label}</label>
      <input
        name={name} type={type} required={required}
        className="mt-2 block w-full border border-border bg-background px-4 py-3 text-sm focus:border-brand focus:outline-none"
      />
    </div>
  );
}
