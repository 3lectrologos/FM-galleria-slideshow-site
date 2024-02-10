import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      darkgray: '#7D7D7D',
      gray: '#E5E5E5',
      lightgray: '#F3F3F3',
      white: '#FFFFFF',
    },
    screens: {
      tablet: '750px',
      desktop: '1380px',
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
export default config
