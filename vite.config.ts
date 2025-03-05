import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow connections from all hosts
    host: '0.0.0.0',
    // Ensure proper port
    port: 3000,
    // Disable HMR to avoid WebSocket connection issues
    hmr: false,
    // Allow all hosts
    allowedHosts: 'all'
  }
})