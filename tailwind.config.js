import { defineConfig } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

export default defineConfig({
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
});
