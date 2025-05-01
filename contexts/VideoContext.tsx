import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

import { IVideoContext } from "@types";

const VideoContextDefaultValues: IVideoContext = {
    videoKey: null,
    videoTitle: "",
    open: (key: string, videoTitle: string) => {},
    close: () => {},
}

const VideoContext = createContext<IVideoContext>(VideoContextDefaultValues);

export const VideoProvider = ({ children } : Readonly<{children: ReactNode;}>) => {
    const router = useRouter();
    const pathname = usePathname();
    const [videoKey, setVideoKey] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string>("");

    // Auto-open modal if user visits a URL like /page#play=abc123
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash;
            const match = hash.match(/#play=([\w-]+)/);
            if (match) {
                const key = match[1];
                setVideoKey(key);
            }
        }
    }, []);

    // Open modal and update hash
    const open = useCallback((key: string, videoTitle: string) => {
        setVideoKey(key);
        setVideoTitle(videoTitle);

        // Prevent scroll jump
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        window.history.replaceState(null, "", `${pathname}#play=${key}`);
    }, [pathname]);

     // Close modal and remove hash
    const close = useCallback(() => {
        setVideoKey(null);
        setVideoTitle("");

        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        // Use history.replaceState to clean the hash without re-render
        window.history.replaceState(null, "", pathname);

        // Delay scroll restore to ensure it overrides browser behavior
        requestAnimationFrame(() => {
            if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        });
    }, [pathname]);

    return (
        <VideoContext.Provider value={{ videoKey, videoTitle, open, close }}>
          {children}
        </VideoContext.Provider>
    );
}

export const useVideo = () => {
    const ctx = useContext(VideoContext);
    
    if (!ctx) throw new Error("useVideo must be used within a VideoProvider");
    
    return ctx;
};