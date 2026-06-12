import type { Metadata, Viewport } from "next";
import { Lexend_Exa } from "next/font/google";
import "./globals.css";

const lexendExa = Lexend_Exa({
  variable: "--font-lexend-exa",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Anton Gubarev-Pentin — Product Design Lead",
  description: "Product Design Lead & Design Manager with 8+ years of experience in Design ops, Team building, Cross-Platform, Insure-Tech, E-com, Med-Tech",
  keywords: ["product design", "design lead", "design manager", "portfolio", "UI/UX"],
  authors: [{ name: "Anton Gubarev-Pentin" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020202",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={lexendExa.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
