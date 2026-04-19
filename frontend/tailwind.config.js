/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'gb-bg': '#1a1a1a',
                'gb-card': '#2d2d2d',
                'gb-border': '#3d3d3d',
                'gb-muted': '#9ca3af',
                'gb-text': '#f5f5f5',
                'gb-orange': '#f97316',
            },
            fontFamily: {
                mono: ['"Courier New"', 'Courier', 'monospace'],
            },
        },
    },
    plugins: [],
}