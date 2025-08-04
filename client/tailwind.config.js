/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#2b3e50",
        active: "#1ca1c1",
        accent: "#00b29e",
        page: "#f5f7fa",
        muted: "#8b8b8b",
        border: "#e1e1e1",
      },
    },
  },
  plugins: [],
};
