import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medizaai | রাজশাহীর সবচেয়ে সহজ স্বাস্থ্যসেবা",
  description: "ভিডিও কলে ডাক্তার, হাসপাতালে সঙ্গী গাইড আর ঘরে ওষুধ — সব এক জায়গায়।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${hind.variable} font-sans`}>{children}</body>
    </html>
  );
}