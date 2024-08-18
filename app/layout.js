import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GoogleAnalytics from '../components/GoogleAnalytics.js';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashLearn",
  description: "AI Flashcard Generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <GoogleAnalytics />
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
