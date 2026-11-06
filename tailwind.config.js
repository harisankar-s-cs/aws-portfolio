/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0A09', // Warm near-black
        bone: '#EDE6DA',       // Bone white
        amber: {
          lamp: '#F2A73B',     // Lamp amber accent
        },
        hairline: '#1F1D1A',   // 1px subtle divider
        hairlineLight: '#2D2A26',
        muted: '#8C8275',      // Secondary text
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'cinema-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
