import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/molecules/Header/Header";
import { Footer } from "./components/molecules/Footer";
import { ScrollToTop } from "./components/atoms/ScrollToTop";
import type { Metadata, Viewport } from 'next'

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Investing in People and Culture",
  description: "Supporting refugees, asylum seekers, and minority communities",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#8b1e1e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#8b1e1e" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <div className="fixed inset-0 bg-[#e3e4e4] -z-10" />
        <div className="relative mx-auto max-w-480 min-h-screen flex flex-col bg-[#f5f7fa]/95 shadow-2xl">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
