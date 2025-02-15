import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "threesan",
  description: "threesan's website",
};

interface LayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: LayoutProps) {
  return (
      <html lang="en">
          <body>
              {children}
          </body>
      </html>
  );
}