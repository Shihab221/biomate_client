// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customBlue: "#38BDF8", // Add your custom hex color here
      },
      fontFamily: {
        inter: ["Inter var", "sans-serif"],
        sans: ["var(--font-sora)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
