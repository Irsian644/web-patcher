import { lazy } from "react";
import Layout from "./Layout";
import Home from "./pages/Home";

// Code-split inner pages (homepage eager for fast first paint / LCP).
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const WebDesignAlbania = lazy(() => import("./pages/landing/WebDesignAlbania"));
const EcommerceDevelopment = lazy(() => import("./pages/landing/EcommerceDevelopment"));
const BusinessWebsites = lazy(() => import("./pages/landing/BusinessWebsites"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "web-design-albania", element: <WebDesignAlbania /> },
      { path: "ecommerce-development", element: <EcommerceDevelopment /> },
      { path: "business-websites", element: <BusinessWebsites /> },
      // Prerendered to dist/404.html (Vercel serves it for unknown paths),
      // and the wildcard catches client-side navigations to bad routes.
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

// Paths vite-react-ssg should prerender to static HTML.
export const ssgPaths = [
  "/",
  "/services",
  "/portfolio",
  "/about",
  "/contact",
  "/web-design-albania",
  "/ecommerce-development",
  "/business-websites",
  "/404",
];
