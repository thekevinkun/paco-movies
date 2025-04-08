import type { Metadata } from "next";
import "@styles/globals.css";

import { Header, Footer } from "@sections";
import { Navbar } from "@components";
import { Providers } from "./providers";

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
            <section className="grow">
              {children}
              <Footer />
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
