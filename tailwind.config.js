/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        light: 'linear-gradient(to right, rgb(233, 213, 255), rgb(250, 250, 250), rgb(250, 250, 250))',
        dark: 'linear-gradient(to right, rgb(88, 28, 135), rgb(38, 38, 38), rgb(38, 38, 38))'
      },
      fontFamily: {},
      
    },
  },
  darkMode: ["class"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
