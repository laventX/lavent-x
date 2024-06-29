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
    <html lang="en" className="h-full min-h-full">
      <body
        className={clsx(
          exo2.className,
          'grid h-full min-h-full w-full min-w-[360px] grid-cols-1 grid-rows-[min-content_1fr] break-words pb-12 pl-[48px] pr-[48px] text-white md:pl-9 md:pr-9 sm:pl-6 sm:pr-6'
        )}
      >
        <Background />
        <Header />
        <div className="flex items-start justify-center">
          <div className="h-full w-[1440px] 2xl:w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
