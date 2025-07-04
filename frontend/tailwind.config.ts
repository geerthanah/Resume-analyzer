import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // App Router pages
    "./components/**/*.{js,ts,jsx,tsx}" // If you have components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config;
