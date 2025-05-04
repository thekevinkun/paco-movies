"use client"

import { MenuProvider, VideoProvider, PreviewProvider } from "@contexts";

export function Providers({ children } : Readonly<{children: React.ReactNode;}>) {
  return (
    <MenuProvider>
      <VideoProvider>
        <PreviewProvider>
          {children}
        </PreviewProvider>
      </VideoProvider>
    </MenuProvider>
  );
}