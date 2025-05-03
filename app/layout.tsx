import type { Metadata } from "next";
import "@styles/globals.css";
import "@styles/utilities.css";

import { Providers } from "./providers";

import { Header, Navbar, Footer } from "@sections";
import { VideoModalClient } from "@components/Clients";

export const metadata: Metadata = {
  title: "PacoMovies",
  description: "Search for every film",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>
          <main className="flex max-lg:block">
            <Header />
            <Navbar />
            <section className="relative z-10 min-h-screen flex flex-col grow">
              {children}
              <Footer />
            </section>
          </main>

          <VideoModalClient />
        </Providers>
      </body>
    </html>
  );
}
