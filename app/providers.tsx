"use client"

import { MenuProvider, MovieProvider } from "@contexts";

export function Providers({ children } : Readonly<{children: React.ReactNode;}>) {
  return (
    <MenuProvider>
      <MovieProvider>
        {children}
      </MovieProvider>
    </MenuProvider>
  );
}