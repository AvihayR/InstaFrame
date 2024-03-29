import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './cmps/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'link-blue': '#0095F6',
        'dark': '#151515',
        'light-dark': '#262626',
        'light': '#f7f7f7',
        'follow': '#0095f6',
      },
    },
    screens: {
      'xs': '495px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
  mode: 'jit',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
}

