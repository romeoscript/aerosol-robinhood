import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "./Providers";
import { CircleDot, Github, MessageCircle, Twitter } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { LayoutContent } from "@/components/layout/layout-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyPay - Send Money with Social Handles",
  description: "The easiest way to send digital payments through social media. Connect wallets to social handles and transfer instantly with zero fees.",
  keywords: ["crypto", "payments", "social media", "twitter", "blockchain", "ethereum", "robinhood chain", "digital payments", "easy", "simple"],
  authors: [{ name: "EasyPay Team" }],
  creator: "EasyPay",
  publisher: "EasyPay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easypay.app",
    title: "EasyPay - Send Money with Social Handles",
    description: "The easiest way to send digital payments through social media. Connect wallets to social handles and transfer instantly with zero fees.",
    siteName: "EasyPay",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyPay - Send Money with Social Handles",
    description: "The easiest way to send digital payments through social media. Connect wallets to social handles and transfer instantly with zero fees.",
    creator: "@easypay_app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}