import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'react-infinite-scroller': 'react-infinite-scroller/index.js'
    },
  },
  plugins: [react()],
})
