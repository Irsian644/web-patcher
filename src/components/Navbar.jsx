import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import CTA from "./CTA";
import { NAV, BRAND } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
      <motion.div
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="wrap flex h-16 items-center justify-between sm:h-[4.5rem]">
          <Link to="/" aria-label="TheWebPatcher home" className="rounded">
            <Logo />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {NAV.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `group relative text-[0.92rem] transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {/* current-page marker / hover underline */}
                    <span
                      className={`absolute -bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-blue-soft transition-all duration-300 ease-out-expo ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <CTA href={BRAND.dmUrl} variant="bare">
              Free website idea
            </CTA>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative h-10 w-10 md:hidden"
          >
            <span
              className={`absolute left-2.5 top-1/2 h-px w-5 bg-ink transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute left-2.5 top-1/2 h-px w-5 bg-ink transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-[var(--z-overlay)] bg-bg/97 backdrop-blur-2xl md:hidden"
          >
            <div className="wrap flex flex-col gap-1 pt-8">
              {NAV.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-5 font-display text-3xl font-semibold text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                <CTA href={BRAND.dmUrl} onClick={() => setOpen(false)}>
                  Get a free website idea
                </CTA>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
