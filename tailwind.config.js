module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          paper: "#f8f7f2",
          ink: "#2a2a2a",
          accent: "#9c6644",
          moss: "#7d8c6d",
          stone: "#d3cec4",
          water: "#6d8c9e",
          shadow: "rgba(0, 0, 0, 0.05)"
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        // ... keep existing theme colors ...
      },
      fontFamily: {
        zen: ['var(--font-zen-maru-gothic)'],
        serif: ['var(--font-noto-serif-jp)'],
        cormorant: ['var(--font-cormorant)'],
        cinzel: ['var(--font-cinzel)'],
        tangerine: ['var(--font-tangerine)'],
        poppins: ['var(--font-poppins)'],
        'young-serif': ['var(--font-young-serif)'],
        prata: ['var(--font-prata)'],
      },

    },
  },
  plugins: [],
} 