/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * The `content` array tells Tailwind where to scan for class names.
   * It's crucial to configure this correctly based on your project structure
   * so Tailwind can generate only the necessary CSS.
   */
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Scan files within the 'src' directory
    "./pages/**/*.{js,ts,jsx,tsx}",    // Common directory for Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Common directory for components
    "./app/**/*.{js,ts,jsx,tsx}",      // Common directory for Next.js App Router
    "./public/index.html",             // If you have a static index.html
    "./index.html",                    // If index.html is in the root
    "./*.{html,js,jsx,ts,tsx}",         // Scan files directly in the root directory
  ],

  /**
   * The `theme` object is where you define your project's design palette,
   * like custom colors, fonts, spacing, breakpoints, etc.
   *
   * Using `extend` allows you to add your customizations *without* overriding
   * Tailwind's default theme values. If you want to completely replace a
   * default value (e.g., the entire color palette), define it directly
   * under `theme` instead of `theme.extend`.
   */
  theme: {
    extend: {
      // Example: Adding custom colors
      // colors: {
      //   'primary': '#1DA1F2',
      //   'secondary': '#14171A',
      //   'accent': '#657786',
      // },

      // Example: Adding custom fonts (ensure fonts are loaded via CSS or HTML)
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      //   serif: ['Merriweather', 'serif'],
      // },

      // Example: Adding custom spacing
      // spacing: {
      //   '128': '32rem',
      // }

      // Add other theme customizations here (breakpoints, etc.)
    },
  },

  /**
   * The `plugins` array allows you to add official or third-party plugins
   * that extend Tailwind's functionality, such as adding new utilities
   * or base styles (e.g., for form styling or typography).
   */
  plugins: [
    // Example: Adding the official forms plugin
    // require('@tailwindcss/forms'),
    // Example: Adding the official typography plugin
    // require('@tailwindcss/typography'),
    // Add other plugins here
  ],
}