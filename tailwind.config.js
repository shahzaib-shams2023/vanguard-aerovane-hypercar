/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tarmac: '#0A0A0B',
        gunmetal: '#111215',
        graphite: '#191B20',
        hairline: '#262830',
        alabaster: '#EFECE6',
        stone: '#DFDBD2',
        chalk: '#F4F1EA',
        ash: '#9899A2',
        ink: '#121214',
        inkMuted: '#57585E',
        rosso: '#C81D11',
        rossoBright: '#E32B1E',
        modena: '#E5A918',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        editorial: '0.18em',
        telemetry: '0.26em',
      },
    },
  },
  plugins: [],
};
