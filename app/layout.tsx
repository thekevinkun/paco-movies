import type { Metadata } from "next";
import "@styles/globals.css";

import { Header, Footer } from "@sections";
import { Navbar } from "@components";

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
        <Header />
        <Navbar />
        
        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
