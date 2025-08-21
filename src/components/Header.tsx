import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Circle, HelpCircle } from 'lucide-react'

const Header: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 border-b border-gray-700 h-12 flex items-center px-4 relative"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left side - Title */}
        <div className="flex items-center space-x-2">
          <Circle className="w-5 h-5 text-blue-500" />
          <h1 className="text-lg font-semibold text-white">analytics.ai</h1>
        </div>

        {/* Right side - User controls */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setShowHelp(!showHelp)}
              title="Keyboard shortcuts"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            
            {/* Help tooltip */}
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-64 bg-gray-700 border border-gray-600 rounded-lg p-3 shadow-lg z-50"
              >
                <h3 className="text-sm font-semibold text-white mb-2">Keyboard Shortcuts</h3>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Trigger Popup:</span>
                    <kbd className="px-2 py-1 bg-gray-600 rounded text-white">
                      {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+O
                    </kbd>
                  </div>
                </div>
                <button 
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => setShowHelp(false)}
                >
                  ×
                </button>
              </motion.div>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-300 cursor-pointer hover:text-white">
            <span>nithilan@analytics.ai</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header 