import "./globals.css";
import { Urbanist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
const inter = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: "BillTap",
  description: "BillTap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >{children}</body>
      <Analytics />
    </html>
  );
}
