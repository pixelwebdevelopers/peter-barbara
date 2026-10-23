import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import pixelLogo from "@/assets/pixel-web.png";
import {
  CATEGORIES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COMPANY_ADDRESS,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/lib/catalog";
import { Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img src={logo} alt="Peter & Barbara" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              B2B sportswear manufacturer based in Sialkot, Pakistan — supplying premium activewear,
              team kits and accessories to international brands and importers.
            </p>
            <div className="mt-6">
              <p className="eyebrow text-xs text-muted-foreground">Follow Us</p>
              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Peter & Barbara Sportswear on Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all hover:border-brand hover:bg-brand hover:text-brand-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Peter & Barbara Sportswear on Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all hover:border-brand hover:bg-brand hover:text-brand-foreground"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-muted-foreground">Catalog</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-brand">
                    {c.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-muted-foreground">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{COMPANY_ADDRESS}</li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-brand">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="eyebrow inline-block border border-foreground px-4 py-2 hover:bg-foreground hover:text-background"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Peter & Barbara Sportswear. All rights reserved.</p>
            <p>Built for performance. Manufactured in Sialkot, Pakistan.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
              <span className="text-border">·</span>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <Facebook className="h-3.5 w-3.5" />
                <span>Facebook</span>
              </a>
            </div>
            <a
              href="https://pixelwebdevelopers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-brand"
            >
              <span>Developed by</span>
              <img src={pixelLogo} alt="Pixel Web Developers" className="h-6 w-auto" />
              <span className="font-medium">Pixel Web Developers</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
