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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.className}
          min-h-dvh
          bg-linear-to-br
          from-[hsl(0,57%,79%)]
          via-[hsl(0,73%,77%)]
          to-[hsl(0,88%,56%)]
        `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
