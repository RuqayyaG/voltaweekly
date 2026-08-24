import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FaultLines",
  description: "Geopolitics and markets analysis. How political movements affect markets and vice versa.",
  openGraph: {
    title: "FaultLines",
    description: "Geopolitics and markets analysis. How political movements affect markets and vice versa.",
    url: "https://faultlines-jade.vercel.app",
    siteName: "FaultLines",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaultLines",
    description: "Geopolitics and markets analysis. How political movements affect markets and vice versa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}