/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        embroidery: {
          primary: 'var(--color-embroidery-primary)',
          'primary-hover': 'var(--color-embroidery-primary-hover)',
          secondary: 'var(--color-embroidery-secondary)',
          'secondary-hover': 'var(--color-embroidery-secondary-hover)',
          accent: 'var(--color-embroidery-accent)',
          'accent-hover': 'var(--color-embroidery-accent-hover)',
          neutral: 'var(--color-embroidery-neutral)',
          background: 'var(--color-embroidery-background)',
          surface: 'var(--color-embroidery-surface)',
          'surface-hover': 'var(--color-embroidery-surface-hover)',
          muted: 'var(--color-embroidery-muted)',
          border: 'var(--color-embroidery-border)',
          danger: 'var(--color-embroidery-danger)',
        },
      },
    },
  },
  plugins: [],
}