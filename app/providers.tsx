"use client"

import { MenuProvider } from "@contexts";

export function Providers({ children } : Readonly<{children: React.ReactNode;}>) {
  return (
    <MenuProvider>
      {children}
    </MenuProvider>
  );
}