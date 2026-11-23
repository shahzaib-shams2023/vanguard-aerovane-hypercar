/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vanguard: {
          dark: '#08090B',
          surface: '#0F1115',
          panel: '#151820',
          border: '#232733',
          red: '#E61A24',
          redGlow: '#FF333D',
          amber: '#FF9500',
          cyan: '#00F0FF',
          silver: '#E4E7EE',
          muted: '#7E8597',
        },
      },
      fontFamily: {
        display: ['"Syncopate"', '"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        telemetry: '.32em',
        aerospace: '.45em',
        hyperspeed: '.6em',
      },
      boxShadow: {
        'glow-red': '0 0 35px -5px rgba(230, 26, 36, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.4)',
        'carbon-panel': 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}

