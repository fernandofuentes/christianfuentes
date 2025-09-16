/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#141414', // Luxury Dark Navy (Primary)
          dark: '#141414',    // Deeper Navy for dramatic sections
          light: '#1E3A5F', // Secondary Navy for section breaks
        },
        gold: '#BFA06A', // Refined Gold Accent
        blueAccent: '#1E6091', // Sapphire CTA Blue
        offwhite: '#F5F5F5', // Soft White
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Elegant luxury serif
      },
    },
  },
  plugins: [],
};
