import clsx from 'clsx';
import type { Metadata } from 'next';

import '@/styles/globals.css';

import { exo2 } from '@/ui/fonts';

import Background from '@/components/background/background';
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
    <html lang="en" className="h-full">
      <body
        className={clsx(
          exo2.className,
          'min-h-full min-w-[360px] break-words pb-12 pl-[48px] pr-[48px] md:pl-9 md:pr-9 sm:pl-6 sm:pr-6 text-white'
        )}
      >
        <Background />
        <Header />
        <div className="flex items-start justify-center">
          <div className="w-[1440px] 2xl:w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
