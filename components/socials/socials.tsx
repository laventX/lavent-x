import clsx from 'clsx';

import { CustomComponentProps } from '@/types/components';

type SocialsProps = CustomComponentProps;

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/laventX'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/laventmx'
  },
  {
    name: 'X',
    href: 'https://x.com/laventX/'
  },
  {
    name: 'E-mail',
    href: 'mailto:laventmx@gmail.com'
  }
];

export default function Socials({ className }: SocialsProps) {
  return (
    <ul
      className={clsx(
        className,
        'text-center text-4xl leading-[3.25rem] md:text-3xl md:leading-[2.75rem]'
      )}
    >
      {socials.map((social) => {
        return (
          <li key={social.name}>
            <a
              className={clsx(
                className,
                'transition-colors hover:text-space-100 active:text-space-200'
              )}
              href={social.href}
              target="_blank"
              rel="noreferrer"
            >
              {social.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
