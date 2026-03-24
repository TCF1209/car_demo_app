import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AutoCare Pro",
  description: "Your automotive one-stop service — quality parts, trusted service, loyalty rewards",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FF6B35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <AppProvider>
          <div className="mx-auto min-h-screen max-w-md bg-white shadow-sm">
            <TopNav />
            <main className="pb-20">{children}</main>
            <BottomNav />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
