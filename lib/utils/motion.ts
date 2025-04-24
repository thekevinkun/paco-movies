export const parentStaggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      staggerDirection: 1, // forward order
    },
  },
}

export const cardMovieVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
}