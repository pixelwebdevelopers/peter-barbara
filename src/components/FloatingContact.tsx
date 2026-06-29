import { useState } from "react";
import { MessageCircle, Mail, Phone, X } from "lucide-react";
import { WHATSAPP_NUMBER, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/catalog";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 rounded-md border border-border bg-background p-3 shadow-xl">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Peter & Barbara, I'd like to inquire about your sportswear products.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4 text-brand" /> WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-muted"
          >
            <Mail className="h-4 w-4 text-brand" /> Email us
          </a>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-muted"
          >
            <Phone className="h-4 w-4 text-brand" /> Call us
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
