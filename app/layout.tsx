import type { Metadata } from 'next';
import '@/styles/globals.css';
import { exo2 } from '@/ui/fonts';
import Background from '@/components/background/background';
import clsx from 'clsx';
import Header from '@/components/header/header';

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
      <body className={clsx(exo2.className, 'text-white')}>
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
