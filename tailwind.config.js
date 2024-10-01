/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary))",
        secondary: "rgba(var(--color-secondary))",
        tertiary: "rgba(var(--color-tertiary))",
      },
      spacing: {
        pixelSize: "var(--pixel-size)", // Default value; you can change it as needed
      },
    },
  },
  plugins: [],
};
