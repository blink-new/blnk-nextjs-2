import { motion, AnimatePresence } from 'framer-motion'
import { LucideInfo } from 'lucide-react'
import { useState } from 'react'
import { SolarSystem } from './components/SolarSystem'

function App() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white relative">
      {/* Main visualization takes up the entire screen */}
      <div className="absolute inset-0 z-0">
        <SolarSystem className="w-full h-full" />
      </div>
      
      {/* UI elements overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <motion.h1 
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Solar System
        </motion.h1>
        <motion.button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Information"
        >
          <LucideInfo className="text-white" />
        </motion.button>
      </div>
      
      {/* Information panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            className="absolute right-4 top-16 bg-black/70 backdrop-blur-md p-6 rounded-lg max-w-md z-20 border border-white/10"
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
      </AnimatePresence>
    </div>
  )
}

export default App