/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'infinite-scroll-reversed': 'infinite-scroll-reversed 125s linear infinite',
        stripes: 'stripes 5s infinite alternate',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-reversed': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        stripes: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '100px 0' },
        },
      },
      fontFamily: {
        custom: ['IosevkaTerm', 'monospace'],
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.white'),
              '&:hover': {
                color: theme('colors.white'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            h4: {
              color: theme('colors.gray.200'),
            },
            h5: {
              color: theme('colors.gray.200'),
            },
            h6: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.white'),
            },
            figcaption: {
              color: theme('colors.gray.300'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
