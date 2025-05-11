export const parentStaggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      staggerDirection: 1, // forward order
    },
  },
};

export const cardMovieVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.25,
    },
  },
};

export const parentModalVariants = (duration?: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration,
    },
  },
});

export const previewModalVariants = (isMobile?: boolean | false) => ({
  hidden: {
    opacity: 0,
    scale: isMobile ? 1 : 0.95,
    y: isMobile ? "100%" : 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: isMobile ? 1 : 0.95,
    y: isMobile ? "100%" : 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
});
