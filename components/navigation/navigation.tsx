'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useWindowSize } from 'usehooks-ts';

import { PAGES } from '@/consts';

import { CustomComponentProps } from '@/types';

import { getBreakpoint } from '@/ui/tailwind-config';

type NavigationProps = CustomComponentProps;

export default function Navigation({ className }: NavigationProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width: windowWidth = 0 } = useWindowSize({
    initializeWithValue: false
  });

  const wideScreenBreakpoint = getBreakpoint('3lg');

  const [screenWide, setScreenWide] = useState<boolean>(
    windowWidth >= wideScreenBreakpoint
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const isScreenWide = windowWidth >= wideScreenBreakpoint;

    setScreenWide(isScreenWide);
    if (isScreenWide && modalOpen) {
      closeModal();
    }
  }, [windowWidth, modalOpen, wideScreenBreakpoint]);

  const handleNavigationButtonClick = () => {
    openModal();
  };

  return screenWide ? (
    <Links
      className={clsx(
        className,
        'inline-flex flex-row flex-wrap items-center justify-end space-x-11'
      )}
    />
  ) : (
    <>
      <BurgerMenu onClick={handleNavigationButtonClick} />
      <Modal
        open={modalOpen}
        onClose={closeModal}
        center
        animationDuration={150}
        classNames={{
          modal:
            'rounded-lg !bg-space-800/40 !p-12 !m-0 w-[320px] inline-flex justify-center !backdrop-blur-sm'
        }}
        showCloseIcon={false}
      >
        <Links
          className={clsx(
            className,
            'inline-flex flex-col items-center space-y-4'
          )}
          onLinkClick={closeModal}
        />
      </Modal>
    </>
  );
}

type LinksProps = CustomComponentProps & {
  onLinkClick?: () => void;
};

function Links({ className, onLinkClick = () => {} }: LinksProps) {
  const currentPathname = usePathname();

  return (
    <div className={className}>
      {PAGES.map((page) => {
        const isActive = currentPathname === page.href;

        return (
          <Link
            key={page.name}
            href={page.href}
            className={clsx(
              isActive &&
                'cursor-default after:absolute after:-bottom-1 after:left-0 after:block after:h-0.5 after:w-full after:bg-white',
              'relative text-3xl uppercase',
              !isActive &&
                'transition-colors hover:text-space-100 active:text-space-200'
            )}
            onClick={onLinkClick}
          >
            <p>{page.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
type BurgerMenuProps = CustomComponentProps & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

function BurgerMenu({ className, onClick }: BurgerMenuProps) {
  return (
    <button
      className={clsx(className, 'group/burger relative h-[41px] w-[64px]')}
      onClick={onClick}
    >
      <BurgerDash className="top-0" />
      <BurgerDash className="top-[18px]" />
      <BurgerDash className="top-[36px]" />
    </button>
  );
}

type BurgerDashProps = CustomComponentProps;

function BurgerDash({ className }: BurgerDashProps) {
  return (
    <div
      className={clsx(
        className,
        'absolute left-0 top-0 h-[5px] w-full rounded-full bg-white transition-colors group-hover/burger:bg-space-100 group-active/burger:bg-space-200'
      )}
    ></div>
  );
}
