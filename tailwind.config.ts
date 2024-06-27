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
          '500': '#09070c'
        }
      }
    }
  },
  plugins: []
};

export default config;
