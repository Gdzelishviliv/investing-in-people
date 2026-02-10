import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/molecules/Header";
import { Footer } from "./components/molecules/Footer";

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
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
