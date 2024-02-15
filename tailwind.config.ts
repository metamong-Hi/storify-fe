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
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      // spacing: {
      //   sm: '8px',
      //   md: '9.6px',
      //   lg: '12.8px',
      //   xl: '16px',
      //   '2xl': '19.2px',
      // },

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
      colors: {
        pastelRed: '#fda5a550',
        pastelOrange: '#fdba7450',
        pastelYellow: '#fcd34d50',
        pastelGreen: '#86efac50',
        pastelBlue: '#93c5fd50',
        pastelPurple: '#c4b5fd50',
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
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

        spin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        ottogi: {
          '0%, 100%': { transform: 'rotate(-3deg) translateX(-5px)' },
          '50%': { transform: 'rotate(3deg) translateX(5px)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        ottogi: 'ottogi 2s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out infinite',
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
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};

export default config;
