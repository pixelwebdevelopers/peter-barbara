import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldAlert, Phone } from "lucide-react";
import { PAKISTAN_ACCESS_PASSWORD, WHATSAPP_NUMBER } from "@/lib/catalog";
import logoUrl from "@/assets/Logo.png";
import bgUrl from "@/assets/hero-1-1.jpg";

type Props = {
  onUnlock: () => void;
};

export function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    // Simulate small delay for premium feels
    setTimeout(() => {
      if (password === PAKISTAN_ACCESS_PASSWORD) {
        if (rememberMe) {
          // Set cookie with 30 days expiration
          document.cookie = `pk_auth=true; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        } else {
          // Set session-only cookie (expires when browser is closed)
          document.cookie = `pk_auth=true; path=/; SameSite=Lax`;
        }
        onUnlock();
      } else {
        setError(true);
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black font-sans">
      {/* Background Image with blur and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-md scale-105"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />

      {/* Main Lock Box Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div
          className={`w-full rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
            error ? "animate-shake border-red-500/50" : ""
          }`}
        >
          {/* Brand Logo and Title */}
          <div className="flex flex-col items-center text-center">
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Peter & Barbara Logo"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            )}
            <div className="mt-6 flex items-center justify-center gap-2 text-brand text-xs uppercase tracking-widest font-semibold">
              <Lock className="h-3.5 w-3.5" />
              <span>Restricted Access Gate</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Verify Credentials
            </h1>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              This catalog is password-restricted in your region. Importers, partners, and clients
              can request credentials.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="access-password"
                className="text-xs uppercase tracking-wider text-white/50 font-medium"
              >
                Access Password
              </label>
              <div className="relative rounded-lg bg-white/5 border border-white/10 focus-within:border-white/30 transition-all duration-300">
                <input
                  id="access-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter passcode"
                  required
                  className="w-full bg-transparent px-4 py-3.5 pr-11 text-white placeholder-white/20 outline-none text-sm font-medium tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 py-1">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-brand focus:ring-brand focus:ring-offset-0 focus:ring-1 accent-brand cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-white/60 select-none cursor-pointer hover:text-white/80 transition-colors"
              >
                Don't require password for this browser
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs font-medium text-red-400">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Incorrect password. Please try again or request help.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="eyebrow w-full flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-4 text-sm font-bold text-black hover:bg-brand hover:text-brand-foreground transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/35 border-t-black" />
              ) : (
                "Unlock Access"
              )}
            </button>
          </form>

          {/* Contact Support links */}
          <div className="mt-8 border-t border-white/5 pt-6 text-center">
            <p className="text-xs text-white/40">
              Need assistance? Request credentials via WhatsApp:
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello, I am trying to access the Peter & Barbara catalog website and need the access password.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Request Password</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
