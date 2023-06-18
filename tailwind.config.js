/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(112deg, rgba(33, 106, 95, 1) 0%, rgba(149, 166, 187, 1) 100%)",
      },
    },
  },
  plugins: [],
};
