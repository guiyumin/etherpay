import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@arco-design/web-react/dist/css/arco.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ether Pay",
  description: "Your private crypto payment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
