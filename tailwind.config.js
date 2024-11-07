/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  plugins: [],
  theme: {
    extend: {
      spacing: {
        1.25: "5px",
        9.5: "40px",
      },
      colors: {
        logo_red: "#D10000",
        light_gray_border: "#D3D6D5",
      },
    },
  },
};
