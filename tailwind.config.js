export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
      extend: {
          fontFamily: {
              circular: ['Circular', 'sans-serif'],
              general: ['General', 'sans-serif'],
              robertm: ['Robertm', 'sans-serif'],
              robertr: ['Robertr', 'sans-serif'],
              zentry: ['Zentry', 'sans-serif'],
              valorant: ['Valorant', 'sans-serif'],
          },
          colors: {
            red: {
              400: '#f87171',
              500: '#ef4444',
              600: '#dc2626',
              700: '#b91c1c',
            },
            black:{
              400: '#a8a29e',
              500: '#78716c',
              600: '#57534e',
              700: '#44403c',
              800: '#292524',
              900: '#0c0a09',
            },
            sky:{
              50: '#f0f9ff',
              500: '#0ea5e9',
            },
            violet:{
              500: '#8b5cf6',
            },
            yellow:{
              400: '#facc15',
            },
            amber:{
              400: '#fbbf24',
            },
            blue:{
              75 : '#dfdff0',
            }
          },
      },
  },
  plugins: [],
}
