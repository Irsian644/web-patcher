// Shared Framer Motion primitives. Tuned for cinematic, ease-out-expo reveals.

const EXPO = [0.16, 1, 0.3, 1];

// A line/element that rises and sharpens into view (blur + translate).
export const rise = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EXPO },
  },
};

// Subtle version for body/meta.
export const riseSoft = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

// Headline line that wipes up from a clipped mask.
export const lineWipe = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EXPO } },
};

export const inView = { once: true, margin: "-12% 0px -12% 0px" };
