import type { Metadata } from 'next';
import './globals.css';
import { exo2 } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'LaventX | Front-End Developer',
  description: "Hi! I'm Maxim Lavent, a front-end developer.",
  authors: [
    {
      name: 'Maxim Lavent',
      url: 'https://github.com/laventX'
    }
  ],
  icons: [
    '/favicon.ico',
    {
      rel: 'apple-touch-icon',
      url: '/favicon-apple.png'
    }
  ],
  manifest: '/favicon.webmanifest'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>{children}</body>
    </html>
  );
}
