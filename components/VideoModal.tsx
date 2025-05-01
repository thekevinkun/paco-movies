"use client"

import { useEffect, useState } from "react";
import { useVideo } from "@contexts/VideoContext";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const VideoModal = () => {
    const { videoKey, videoTitle, close } = useVideo();
    const [isOpen, setIsOpen] = useState(false);

    // Handle escape key and body scroll lock
    useEffect(() => {
        if (videoKey) {
            setIsOpen(true);
            document.body.classList.add("modal-open");
        } else {
            setIsOpen(false);
            document.body.classList.remove("modal-open");
        }

        const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
        window.addEventListener("keydown", esc);

        return () => window.removeEventListener("keydown", esc);
    }, [videoKey, close]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                >
                    {/* Blurred background */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"
                        onClick={close}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal content */}
                    <motion.div
                        className="relative z-10 w-full 
                            max-w-4xl max-xl:max-w-3xl max-lg:max-w-2xl max-md:max-w-xl
                            max-sm:max-w-lg max-[548px]:max-w-md max-xs:max-w-sm
                            max-[417px]:max-w-xs aspect-video"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <iframe
                            className="w-full h-full rounded-lg border-none"
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                            title={videoTitle}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />

                        <RxCross2 
                            className="absolute top-[-9%] max-lg:top-[-10.5%]
                                max-md:top-[-12%] max-sm:top-[-14%] max-xs:top-[-15%]
                                right-1 max-xs:right-0 text-4xl max-[548px]:text-3xl
                                text-danger cursor-pointer hover:text-danger/55"
                            onClick={close}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default VideoModal;