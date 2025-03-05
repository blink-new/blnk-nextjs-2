import { motion } from 'framer-motion'
import { LucideInfo } from 'lucide-react'
import { useState } from 'react'
import { SolarSystem } from './components/SolarSystem'

function App() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Solar System Visualization
        </motion.h1>
        <motion.button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInfo(!showInfo)}
        >
          <LucideInfo className="text-white" />
        </motion.button>
      </header>
      
      <main className="flex-1 relative">
        <SolarSystem className="w-full h-full" />
        
        {showInfo && (
          <motion.div 
            className="absolute right-4 top-4 bg-black/80 p-6 rounded-lg max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-xl font-bold mb-4">About This Visualization</h2>
            <p className="mb-4">
              This is a simplified model of our solar system. The sizes and distances are not to scale
              to make the visualization more accessible.
            </p>
            <p className="mb-4">
              Each planet rotates on its axis and orbits around the sun at different speeds.
            </p>
            <p>
              Use your mouse to:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Left-click and drag to rotate the view</li>
              <li>Scroll to zoom in and out</li>
              <li>Right-click and drag to pan</li>
            </ul>
            <button 
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
              onClick={() => setShowInfo(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </main>
      
      <footer className="p-4 text-center text-white/60 text-sm">
        <p>Created with React Three Fiber</p>
      </footer>
    </div>
  )
}

export default App