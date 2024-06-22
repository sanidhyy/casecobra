import type { Metadata, Viewport } from "next";
import { Recursive } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { constructMetadata } from "@/lib/utils";

import "./globals.css";

const recursive = Recursive({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#171717",
  colorScheme: "light",
};

export const metadata: Metadata = constructMetadata();

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />

        <main className="grainy-light flex min-h-[calc(100vh_-_3.5rem_-_1px)] flex-col">
          <div className="flex h-full flex-1 flex-col">
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>

        <Toaster theme="light" closeButton richColors />
      </body>
    </html>
  );
};

export default RootLayout;
