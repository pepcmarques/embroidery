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

          {/* Floating Contact Image */}
          <div className="fixed top-24 left-6 z-30 hidden sm:block">
            <div className="relative w-60 h-60 rounded-lg overflow-hidden shadow-lg border-2 border-embroidery-primary/20 hover:border-embroidery-primary/40 transition-all duration-300 hover:scale-105 rotate-[350deg]">
              <Image
                src="/images/contact1.jpg"
                alt="Contact"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
