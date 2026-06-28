import { useEffect } from "react";

/**
 * Analytics loader — GA4, Google Tag Manager, and Meta Pixel.
 * Loads ONLY when the matching env var is set, and AFTER first paint
 * (idle) so it never hurts LCP/INP. Leave env vars empty to ship nothing.
 *
 * Set in .env (see .env.example):
 *   VITE_GA_ID=G-XXXXXXXXXX
 *   VITE_GTM_ID=GTM-XXXXXXX
 *   VITE_META_PIXEL_ID=000000000000000
 */
export default function Analytics() {
  useEffect(() => {
    const GA = import.meta.env.VITE_GA_ID;
    const GTM = import.meta.env.VITE_GTM_ID;
    const PIXEL = import.meta.env.VITE_META_PIXEL_ID;
    if (!GA && !GTM && !PIXEL) return;

    const load = () => {
      // Google Analytics 4
      if (GA) {
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", GA, { anonymize_ip: true });
      }

      // Google Tag Manager
      if (GTM) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM}`;
        document.head.appendChild(s);
      }

      // Meta (Facebook) Pixel
      if (PIXEL) {
        /* eslint-disable */
        !(function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        window.fbq("init", PIXEL);
        window.fbq("track", "PageView");
        /* eslint-enable */
      }
    };

    // Defer to idle so analytics never blocks interaction.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(load, 2000);
    return () => clearTimeout(t);
  }, []);

  return null;
}
