import type { Metadata } from "next";
import "@styles/globals.css";
import "@styles/utilities.css";

import { Providers } from "./providers";

import { Header, Navbar, Footer } from "@sections";
import { VideoModalClient, PreviewModalClient } from "@components/Clients";

export const viewport = {
  theme_color: "#008080",
};

export const metadata: Metadata = {
  title: "PacoMovies",
  description: "Discover movies and tv shows around the world.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
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

          <PreviewModalClient />
          <VideoModalClient />
        </Providers>
      </body>
    </html>
  );
}
