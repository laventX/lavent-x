'use client';

import clsx from 'clsx';
import Typewriter from 'typewriter-effect';

import { CustomComponentProps } from '@/types';

import { sourceCodePro } from '@/ui/fonts';

type GreetingProps = CustomComponentProps;

export default function Greeting({ className }: GreetingProps) {
  return (
    <div
      className={clsx(
        className,
        sourceCodePro.className,
        'text-4xl leading-[3.75rem] [font-weight:315] lg:text-[1.75rem] lg:leading-[3.25rem] md:text-[1.5rem] md:leading-[3rem] md:[font-weight:375] sm:text-[1.25rem] sm:leading-[2.75rem]'
      )}
    >
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .pauseFor(300)
            .typeString('Hi!')
            .pauseFor(150)
            .typeString('<br>')
            .pauseFor(500)
            .typeString("<br>I'm Maxim, a front-end developer.")
            .pauseFor(500)
            .typeString('<br>I ♥ creating and web technologies.')
            .start();
        }}
        options={{
          delay: 50,
          cursor: '_'
        }}
      />
    </div>
  );
}
