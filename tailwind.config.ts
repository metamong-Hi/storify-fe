import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      KyoboHand: ['KyoboHand'],
      Gulim: ['Gulim'],
      NamuGulim: ['NamuGulim'],
      ModernGulim: ['ModernGulim'],
      Kids: ['Kids'],
      Socks: ['Socks'],
      HyuGothic: ['HyuGothic'],
      LightWrite: ['LightWrite'],
      Sowal: ['Sowal'],
      Boss: ['Boss'],
      Beach: ['Beach'],
      Soopilmyungjo: ['Soopilmyungjo'],
      Banditbul: ['Banditbul'],
      Paint: ['Paint'],
      Spring: ['Spring'],
      Baby: ['Baby'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: '512px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      borderWidth: {
        '6': '6px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
      },
      inset: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        '2xs': '0.5rem',
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        '3xl': [
          '2rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
            fontWeight: '550',
          },
        ],
        '4xl': [
          '2.5rem',
          {
            lineHeight: '2.75rem',
            letterSpacing: '-0.03em',
            fontWeight: '600',
          },
        ],
        '5xl': [
          '3rem',
          {
            lineHeight: '3rem',
            letterSpacing: '-0.04em',
            fontWeight: '650',
          },
        ],
        '6xl': [
          '3.5rem',
          {
            lineHeight: '3.5rem',
            letterSpacing: '-0.05em',
            fontWeight: '700',
          },
        ],
        '7xl': [
          '4rem',
          {
            lineHeight: '4rem',
            letterSpacing: '-0.06em',
            fontWeight: '750',
          },
        ],
      },
      width: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      height: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui'), nextui()],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
    ], 
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};

export default config;
