/** @type {import('tailwindcss').Config} */

const {createToken} = require('@bearei/theme-token')

module.exports = {
        content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
        presets: [require('nativewind/preset')],
        theme: {
                extend: {}
        },
        plugins: []
}
