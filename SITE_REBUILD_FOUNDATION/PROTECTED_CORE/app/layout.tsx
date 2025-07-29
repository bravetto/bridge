import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAHmere Webb Freedom Portal",
  description: "Supporting JAHmere Webb's journey to freedom.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
