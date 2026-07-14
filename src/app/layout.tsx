import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matching Card Game",
  description: "A one-minute matching card puzzle."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
