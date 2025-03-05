import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure HMR works properly in the Blink environment
    hmr: {
      // Use the current host for WebSocket connections
      host: 'localhost',
      // Use secure WebSocket if needed
      protocol: 'ws',
      // Disable strict port checking
      clientPort: null
    },
    // Allow connections from all hosts
    host: '0.0.0.0',
    // Ensure proper port
    port: 3000
  }
})