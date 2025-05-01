"use client"

import { MenuProvider, VideoProvider } from "@contexts";

export function Providers({ children } : Readonly<{children: React.ReactNode;}>) {
  return (
    <MenuProvider>
      <VideoProvider>
        {children}
      </VideoProvider>
    </MenuProvider>
  );
}