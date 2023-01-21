module.exports = {
  content: [
    "./content/**/*.md",
    "./content/**/*.html",
    "./layouts/**/*.html",
    "./assets/**/*.js",
    "./themes/aina/content/**/*.md",
    "./themes/aina/content/**/*.html",
    "./themes/aina/layouts/**/*.html",
    "./themes/aina/assets/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
