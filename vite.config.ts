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
    // Configure HMR
    hmr: {
      // Use secure WebSocket
      protocol: 'wss',
      // Use the host's port 443 for WebSocket
      clientPort: 443,
      // Don't validate the host
      host: 'localhost'
    },
    // Specifically allow all blink.new domains
    allowedHosts: ['.blink.new']
  }
})