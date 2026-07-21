import { ServiceWorkerRegister } from "@/components/service-worker-register";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matching Card Game",
  description: "A one-minute matching card puzzle.",
  manifest: "/manifest.json",
  applicationName: "Matching Card Game",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Match Cards"
  },
  icons: {
    icon: [
      { url: "/icons/qb-logo.png", sizes: "512x512", type: "image/png" },
      { url: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" }
    ],
    apple: [{ url: "/icons/qb-logo.png", sizes: "512x512", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#0b1218"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
