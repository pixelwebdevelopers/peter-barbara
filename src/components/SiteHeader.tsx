import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { CATEGORIES } from "@/lib/catalog";
import { Menu, X, ChevronDown } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:px-8">
        {/* Left nav (desktop) */}
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatsOpen(true)}
            onMouseLeave={() => setCatsOpen(false)}
          >
            <button className="eyebrow inline-flex cursor-pointer items-center gap-1 text-foreground transition-colors hover:text-brand">
              Categories
              <ChevronDown className="h-3 w-3" />
            </button>
            {catsOpen && (
              <div className="absolute left-0 top-full w-[420px] border border-border bg-background p-4 shadow-lg">
                <ul className="space-y-1">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/category/$slug"
                        params={{ slug: c.slug }}
                        className="block px-3 py-2 text-sm hover:bg-muted"
                      >
                        <span className="font-medium">{c.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {c.subcategories.length} types
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link to="/categories" className="eyebrow hover:text-brand">All Products</Link>
        </nav>

        {/* Center logo */}
        <div className="flex items-center lg:justify-center">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src={logo} alt="Peter & Barbara Sportswear" className="h-11 w-auto sm:h-12" />
          </Link>
        </div>

        {/* Right nav (desktop) */}
        <nav className="hidden items-center justify-end gap-7 text-sm font-medium lg:flex">
          <Link to="/about" className="eyebrow hover:text-brand">About</Link>
          <Link to="/faq" className="eyebrow hover:text-brand">FAQ</Link>
          <Link to="/contact" className="eyebrow rounded-none border border-foreground bg-foreground px-4 py-2 text-background hover:border-brand hover:bg-brand">
            Contact
          </Link>
        </nav>

        {/* Mobile burger (right) */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {/* Categories accordion */}
            <button
              onClick={() => setMobileCatsOpen((v) => !v)}
              className="flex w-full items-center justify-between py-3 text-base font-semibold"
              aria-expanded={mobileCatsOpen}
            >
              Categories
              <ChevronDown className={`h-5 w-5 transition-transform ${mobileCatsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileCatsOpen && (
              <ul className="mb-2 space-y-0.5 border-l border-border pl-4">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-2.5 text-sm text-muted-foreground hover:text-brand"
                    >
                      <span>{c.name}</span>
                      <span className="text-xs">{c.subcategories.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div className="divide-y divide-border border-t border-border">
              <Link to="/categories" onClick={() => setOpen(false)} className="block py-3.5 text-base font-medium">All Products</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="block py-3.5 text-base font-medium">About</Link>
              <Link to="/faq" onClick={() => setOpen(false)} className="block py-3.5 text-base font-medium">FAQ</Link>
            </div>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="eyebrow mt-4 flex w-full items-center justify-center bg-foreground px-4 py-3.5 text-background hover:bg-brand"
            >
              Contact / Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
