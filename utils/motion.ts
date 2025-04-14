export const cardMovieVariants = (delay: number) => ({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay,
            ease: "easeInOut",
            duration: 0.5
        }
    }
})