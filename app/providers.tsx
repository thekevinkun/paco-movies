"use client"

import { MenuProvider } from "@contexts/MenuContext";

export function Providers({ children } : Readonly<{children: React.ReactNode;}>) {
  return (
    <MenuProvider>
      {children}
    </MenuProvider>
  );
}