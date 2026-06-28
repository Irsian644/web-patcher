import { useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import { useSmoothScroll } from "./lib/useSmoothScroll";

export default function Layout() {
  const { pathname } = useLocation();

  // Lenis smooth scroll site-wide (respects reduced motion internally).
  useSmoothScroll();

  // Reset scroll on route change (SPA navigation).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <Analytics />
    </>
  );
}
