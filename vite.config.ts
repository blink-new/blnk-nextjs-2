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
    // Allow the Blink host
    hmr: {
      clientPort: 443,
      host: '3000-i8qsm27ubenm13421qybh-c395845c.blink.new'
    },
    // Allow all hosts (including the Blink host)
    allowedHosts: 'all'
  }
})