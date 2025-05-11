"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

import { useVideo } from "@contexts/VideoContext";

import { parentModalVariants, previewModalVariants } from "@lib/utils/motion";

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
  }, [videoKey, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          variants={parentModalVariants(0.15)}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Blurred background */}
          <motion.div
            variants={parentModalVariants()}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            variants={previewModalVariants()}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative z-10 w-full max-md:px-3
                            max-w-4xl max-xl:max-w-3xl 
                            max-lg:max-w-2xl 
                            max-md:max-w-full aspect-video"
          >
            <iframe
              className="w-full h-full rounded-lg border-none"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title={videoTitle}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

            <RxCross2
              className="absolute max-md:mr-3 top-[-8.5%] max-xl:top-[-9%] max-lg:top-[-10.5%]
                                max-md:top-[-12%] max-sm:top-[-14%] max-xs:top-[-15%]
                                right-1 max-xs:right-0 text-4xl max-xs:text-3xl
                                text-danger cursor-pointer hover:text-danger/55"
              onClick={close}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
