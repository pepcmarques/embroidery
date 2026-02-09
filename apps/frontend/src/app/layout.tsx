import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Embroidery Store',
  description: 'Premium embroidery products and accessories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-embroidery-background flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
