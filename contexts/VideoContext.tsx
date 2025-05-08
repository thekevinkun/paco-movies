import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

import type { IVideoContextProps } from "@types";

const VideoContextDefaultValues: IVideoContextProps = {
  videoKey: null,
  videoTitle: "",
  open: (key: string, videoTitle: string) => {},
  close: () => {},
};

const VideoContext = createContext<IVideoContextProps>(
  VideoContextDefaultValues
);

export const VideoProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
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
  const open = useCallback(
    (key: string, videoTitle: string) => {
      setVideoKey(key);
      setVideoTitle(videoTitle);

      window.history.replaceState(null, "", `${pathname}#play=${key}`);
    },
    [pathname]
  );

  // Close modal and remove hash
  const close = useCallback(() => {
    setVideoKey(null);
    setVideoTitle("");

    // Use history.replaceState to clean the hash without re-render
    window.history.replaceState(null, "", pathname);
  }, [pathname]);

  return (
    <VideoContext.Provider value={{ videoKey, videoTitle, open, close }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const ctx = useContext(VideoContext);

  if (!ctx) throw new Error("useVideo must be used within a VideoProvider");

  return ctx;
};
