/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#161B22",
          700: "#2B333D",
          500: "#5B6672",
          300: "#9AA4AF",
        },
        paper: {
          DEFAULT: "#F5F6F8",
          raised: "#FFFFFF",
        },
        brand: {
          DEFAULT: "#2F5D62",
          dim: "#3E7379",
          tint: "#E4EEEE",
        },
        priority: {
          high: "#C1443B",
          highTint: "#FBE9E7",
          medium: "#5B6672",
          mediumTint: "#EAEBEE",
          low: "#3F7A4E",
          lowTint: "#E6F0E7",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,27,34,0.04), 0 8px 20px -12px rgba(22,27,34,0.12)",
        nav: "0 12px 32px -8px rgba(22,27,34,0.22)",
      },
    },
  },
  plugins: [],
}
