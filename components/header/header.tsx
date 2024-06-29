import clsx from 'clsx';

import { CustomComponentProps } from '@/types/components';

import Logo from '@/components/logo/logo';

type HeaderProps = CustomComponentProps;

export default function Header({ className }: HeaderProps) {
  return (
    <div className={clsx(className, '')}>
      <Logo />
    </div>
  );
}
