import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(3600deg)' }
        }
      },
      animation: {
        rotate: '5s cubic-bezier(0.22, 1, 0.36, 1) 1 alternate forwards rotate'
      },
      colors: {
        space: {
          '100': '#d1d1e6',
          '200': '#b6b6d4',
          '800': '#130e1a',
          '900': '#09070c'
        }
      }
    },
    screens: {
      '2xl': { max: '1535px' },
      'xl': { max: '1279px' },
      'lg': { max: '1023px' },
      'md': { max: '767px' },
      'h-md': { raw: '((max-width: 767px) and (max-height: 512px))' },
      'sm': { max: '639px' }
    }
  },
  plugins: []
};

export default config;
