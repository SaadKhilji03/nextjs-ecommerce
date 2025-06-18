import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // You can customize colors, fonts, etc. here
    },
  },
  plugins: [],
};

export default config;
