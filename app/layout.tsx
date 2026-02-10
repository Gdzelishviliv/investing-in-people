import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/molecules/Header";
import { Footer } from "./components/molecules/Footer";
import { ScrollToTop } from "./components/atoms/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Investing in People and Culture",
  description: "Supporting refugees, asylum seekers, and minority communities",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
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
        {/* Background with gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#f4a5a5] via-[#f28a8a] to-[#e66b6b] -z-10" />
        
        {/* Fixed width container */}
        <div className="relative mx-auto max-w-[1920px] min-h-screen flex flex-col bg-[#f5f7fa]/95 shadow-2xl">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        
        {/* Scroll to top button */}
        <ScrollToTop />
      </body>
    </html>
  );
}
