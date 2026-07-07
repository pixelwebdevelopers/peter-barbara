import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { createServerFn } from "@tanstack/react-start";
import { PasswordGate } from "@/components/PasswordGate";

import appCss from "../styles.css?url";
import faviconUrl from "@/assets/favicon.png";
import logoUrl from "@/assets/Logo.png";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const checkPakistanAccess = createServerFn({ method: "GET" }).handler(async () => {
  let isPakistan = false;
  let isAuthorized = false;
  let isLocalhost = false;
  let countryHeaderVal = "";

  try {
    const { getCookie, getRequestHeader, getRequestUrl } =
      await import("@tanstack/react-start/server");
    const requestUrl = getRequestUrl();
    const url = new URL(requestUrl || "/", "http://localhost");
    const countryParam = url.searchParams.get("country");
    const clearAuthParam = url.searchParams.get("clear_auth");

    const hostname = url.hostname;
    isLocalhost =
      hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.");

    const userAgent = getRequestHeader("user-agent") || "";
    const isBot =
      /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora\slink\spreview|showyoubot|outbrain|pinterest\/0\.|slackbot|vkShare|W3C_Validator/i.test(
        userAgent,
      );

    if (!isBot) {
      let countryHeader =
        getRequestHeader("x-vercel-ip-country") ||
        getRequestHeader("cf-ipcountry") ||
        getRequestHeader("x-country") ||
        getRequestHeader("x-client-ip-country");

      // Server-side fallback for non-local environments
      // On localhost, we let client-side lookups run so browser-extension VPNs are respected
      if (!countryHeader && !isLocalhost) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1500);
          const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            if (data && data.country_code) {
              countryHeader = data.country_code;
              console.log(`[Geo Gate Server] Fallback lookup detected: ${countryHeader}`);
            }
          }
        } catch {
          // Secondary fallback
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1500);
            const res = await fetch("https://api.country.is", { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
              const data = await res.json();
              if (data && data.country) {
                countryHeader = data.country;
                console.log(
                  `[Geo Gate Server] Secondary fallback lookup detected: ${countryHeader}`,
                );
              }
            }
          } catch (e2) {
            console.warn("[Geo Gate Server] Fallback geolocation lookup failed:", e2);
          }
        }
      }

      countryHeaderVal = countryHeader || "";

      // If ?country parameter is explicitly set, use it to override the IP detection
      if (countryParam) {
        isPakistan = countryParam.toUpperCase() === "PK";
      } else {
        isPakistan = countryHeader?.toUpperCase() === "PK";
      }

      if (clearAuthParam === "true") {
        isAuthorized = false;
      } else {
        const authCookie = getCookie("pk_auth");
        isAuthorized = authCookie === "true";
      }
    }
  } catch (err) {
    console.error("Error in checkPakistanAccess server function:", err);
  }

  console.log(
    `[Geo Gate Server] Country Header: "${countryHeaderVal}", isPakistan: ${isPakistan}, isAuthorized: ${isAuthorized}, isLocalhost: ${isLocalhost}`,
  );

  return {
    isPakistan,
    isAuthorized,
    isLocalhost,
  };
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Peter & Barbara Sportswear — B2B Sportswear Manufacturer, Sialkot Pakistan" },
      {
        name: "description",
        content:
          "Peter & Barbara is a B2B sportswear manufacturer in Sialkot, Pakistan — supplying activewear, team uniforms, performance wear and accessories to international brands and importers.",
      },
      { name: "author", content: "Peter & Barbara Sportswear" },
      { property: "og:title", content: "Peter & Barbara Sportswear — Built for Performance" },
      {
        property: "og:description",
        content:
          "B2B sportswear manufacturer in Sialkot, Pakistan. Activewear, team uniforms, performance wear and accessories for international brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: faviconUrl },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  loader: async () => {
    return await checkPakistanAccess();
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const loaderData = Route.useLoaderData();
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [geoCountry, setGeoCountry] = useState<string | null>(null);

  // Check client-side cookie directly to prevent lock flash after entry
  const isClientAuthorized =
    typeof document !== "undefined" && document.cookie.includes("pk_auth=true");

  // Only show a loading screen on localhost / local network while fetching IP fallback
  // Initialize from loaderData to prevent hydration mismatch!
  const [loadingGeo, setLoadingGeo] = useState(
    () => loaderData.isLocalhost && !loaderData.isAuthorized && !isClientAuthorized,
  );

  // Clear cookie and storage client-side if clear_auth is present in URL query
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("clear_auth=true")) {
      document.cookie = "pk_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      localStorage.removeItem("user_country");
      sessionStorage.removeItem("user_country");
      console.log("[Password Gate Debug] Authentication cleared.");
    }
  }, []);

  // Fallback client-side geolocation check if server doesn't report Pakistan
  useEffect(() => {
    if (loaderData.isPakistan) {
      setLoadingGeo(false);
      return;
    }

    // Check query params client-side
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("country")?.toUpperCase() === "PK") {
        setGeoCountry("PK");
        setLoadingGeo(false);
        return;
      }
    }

    const cachedCountry = sessionStorage.getItem("user_country");
    if (cachedCountry) {
      setGeoCountry(cachedCountry);
      setLoadingGeo(false);
      return;
    }

    // Cascading fetch to find country code
    fetch("https://ipapi.co/json/")
      .then((res) => {
        if (!res.ok) throw new Error("ipapi failed");
        return res.json();
      })
      .then((data) => {
        if (data && data.country_code) {
          const code = data.country_code.toUpperCase();
          sessionStorage.setItem("user_country", code);
          setGeoCountry(code);
        }
      })
      .catch(() => {
        // Fallback 1: ipinfo.io
        return fetch("https://ipinfo.io/json")
          .then((res) => {
            if (!res.ok) throw new Error("ipinfo failed");
            return res.json();
          })
          .then((data) => {
            if (data && data.country) {
              const code = data.country.toUpperCase();
              sessionStorage.setItem("user_country", code);
              setGeoCountry(code);
            }
          });
      })
      .catch(() => {
        // Fallback 2: api.country.is
        return fetch("https://api.country.is")
          .then((res) => {
            if (!res.ok) throw new Error("country.is failed");
            return res.json();
          })
          .then((data) => {
            if (data && data.country) {
              const code = data.country.toUpperCase();
              sessionStorage.setItem("user_country", code);
              setGeoCountry(code);
            }
          });
      })
      .catch((err) => console.warn("All client-side geo-IP lookup fallbacks failed:", err))
      .finally(() => {
        setLoadingGeo(false);
      });
  }, [loaderData.isPakistan]);

  // Check if we need to clear auth via query parameter
  const needsClearAuth =
    typeof window !== "undefined" && window.location.search.includes("clear_auth=true");

  const isPakistanUser = loaderData.isPakistan || geoCountry === "PK";
  const isUserAuthorized = (loaderData.isAuthorized || isClientAuthorized) && !needsClearAuth;

  const showGate = isPakistanUser && !isUserAuthorized && !unlocked;

  // Print verbose diagnostics in the developer console for debugging
  useEffect(() => {
    console.log("[Password Gate Diagnostics]", {
      serverReportedPakistan: loaderData.isPakistan,
      serverReportedAuthorized: loaderData.isAuthorized,
      clientGeoCountry: geoCountry,
      clientCookieAuthorized: isClientAuthorized,
      finalIsPakistanUser: isPakistanUser,
      finalIsUserAuthorized: isUserAuthorized,
      reactUnlockedState: unlocked,
      willShowGateScreen: showGate,
      loadingGeo,
    });
  }, [
    loaderData,
    geoCountry,
    isClientAuthorized,
    isPakistanUser,
    isUserAuthorized,
    unlocked,
    showGate,
    loadingGeo,
  ]);

  if (loadingGeo) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-5">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Peter & Barbara Logo"
              className="h-16 w-auto object-contain brightness-0 invert opacity-40 animate-pulse"
            />
          )}
          <div className="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-white/80" />
        </div>
      </div>
    );
  }

  if (showGate) {
    return (
      <PasswordGate
        onUnlock={() => {
          setUnlocked(true);
          router.invalidate();
        }}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
