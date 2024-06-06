/** @type {import('tailwindcss').Config} */
// 执行 npx tailwindcss init -p 命令生成 tailwind.config.js、postcss.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

