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
    // Enable CORS
    cors: true,
    // Configure HMR
    hmr: {
      // Use WebSockets for reliable connections
      protocol: 'ws',
      // Use the host's port 443 for WebSocket
      clientPort: 443,
      // Ensures HMR WebSocket server is externally accessible
      host: '0.0.0.0',
      // Enable overlay for better debugging
      overlay: true,
      // Increases connection timeout for stability
      timeout: 30000
    },
    // Allow both blink.new domains and localhost
    allowedHosts: ['.blink.new', 'localhost', '127.0.0.1']
  }
})