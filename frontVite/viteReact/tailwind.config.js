import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#F85606"
      }
    },
  },
  screens: {
    '2xl': { 'max': '1536px' },
    'xl': { 'max': '1280px' },
    'lg': { 'max': '1024px' },
    'md': { 'max': '768px' },
    'sm': { 'max': '640px' },
  },
  plugins: [],
});
