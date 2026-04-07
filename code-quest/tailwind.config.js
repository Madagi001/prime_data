/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                'text-muted': '#94a3b8',
                'world-1': '#10b981',
                'world-2': '#8b5cf6',
                'world-3': '#f59e0b',
                'world-4': '#ef4444',
            }
        },
    },
    plugins: [],
}
