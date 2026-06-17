import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { CATEGORIES } from "@/lib/catalog";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Left nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatsOpen(true)}
            onMouseLeave={() => setCatsOpen(false)}
          >
            <button className="eyebrow text-foreground hover:text-brand transition-colors">
              Categories
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
        <div className="flex items-center justify-center lg:justify-center justify-self-start lg:justify-self-center">
          <Link to="/" className="flex items-center">
            <img src={logo.url} alt="Peter & Barbara Sportswear" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Right nav */}
        <nav className="hidden items-center justify-end gap-7 text-sm font-medium lg:flex">
          <Link to="/about" className="eyebrow hover:text-brand">About</Link>
          <Link to="/faq" className="eyebrow hover:text-brand">FAQ</Link>
          <Link to="/contact" className="eyebrow rounded-none border border-foreground bg-foreground px-4 py-2 text-background hover:bg-brand hover:border-brand">
            Contact
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="space-y-1">
              <p className="eyebrow mb-2 text-muted-foreground">Categories</p>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm"
                >
                  {c.name}
                </Link>
              ))}
              <div className="mt-4 space-y-1 border-t border-border pt-4">
                <Link to="/about" onClick={() => setOpen(false)} className="block py-2 text-sm">About</Link>
                <Link to="/faq" onClick={() => setOpen(false)} className="block py-2 text-sm">FAQ</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-brand">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
