import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw, Link, HelpCircle, ChevronDown, Circle } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 border-b border-gray-700 h-12 flex items-center px-4"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left side - Navigation controls */}
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <RotateCcw className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Center - Title */}
        <div className="flex items-center space-x-2">
          <Circle className="w-5 h-5 text-blue-500" />
          <h1 className="text-lg font-semibold text-white">analytics.ai</h1>
          <Link className="w-4 h-4 text-gray-400" />
        </div>

        {/* Right side - User controls */}
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
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