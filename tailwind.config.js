module.exports = {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx}", 
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define your custom properties
      textBase: '1rem',
      textXl: '1.25rem',
      text2xl: '1.5rem',
      fontWeightSemibold: 600,
      colorGray700: '#374151',
      colorGray950: '#030712',
    },
  },
  plugins: [],
}
