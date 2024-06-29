'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import { CustomComponentProps } from '@/types/components';

type LogoProps = CustomComponentProps & {
  link?: boolean;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={clsx(className, 'inline-flex items-center')}>
      <Lavent />
      <X />
    </div>
  );
}

type LaventProps = CustomComponentProps;

function Lavent({ className }: LaventProps) {
  return (
    <p className={clsx(className, 'text-6xl uppercase [font-weight:725]')}>
      <span className="-tracking-[6px]">La</span>
      <span className="-tracking-[3px]">v</span>
      <span className="-tracking-[1px]">e</span>
      <span className="-tracking-[6px]">n</span>t
      <span className="sr-only">X</span>
    </p>
  );
}

type XProps = CustomComponentProps & {
  rotatable?: boolean;
};

function X({ className }: XProps) {
  const xRef = useRef<HTMLDivElement>(null);

  const resetRotation = () => {
    if (!xRef.current) {
      return null;
    }

    xRef.current.style.animation = 'none';
    xRef.current.offsetHeight;
    xRef.current.style.animation = '';
  };

  const handleOnClick = () => {
    if (!xRef.current) {
      return null;
    }

    if (!xRef.current.classList.contains('animate-rotate')) {
      xRef.current.classList.add('animate-rotate');
    } else {
      resetRotation();
    }
  };

  return (
    <div
      className={clsx(
        className,
        'flex h-[160px] w-[160px] cursor-pointer items-center justify-center'
      )}
      onClick={handleOnClick}
    >
      <div className="h-[116px] w-[118px] origin-[59px_58px]" ref={xRef}>
        <Dash className="-translate-x-[7px] translate-y-[19px]" angle="\" />
        <Dash className="translate-x-[56px] translate-y-[3px]" angle="/" />
        <Dash className="-translate-x-[7px] translate-y-[49px]" angle="/" />
        <Dash className="translate-x-[56px] translate-y-[33px]" angle="\" />
      </div>
    </div>
  );
}

type DashProps = CustomComponentProps & {
  angle?: '\\' | '/';
};

function Dash({ className, angle = '\\' }: DashProps) {
  return (
    <div
      className={clsx(
        className,
        'h-[16px] w-[69px] rounded-full bg-white',
        angle === '\\' ? 'rotate-45' : '-rotate-45'
      )}
    ></div>
  );
}
