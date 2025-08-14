import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle, XCircle, Loader2, Shield, Eye, Zap } from 'lucide-react'

interface PlausibleIntegrationProps {
  className?: string
}

const PlausibleIntegration: React.FC<PlausibleIntegrationProps> = ({ className }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Plausible is running
    const checkPlausibleConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000', { 
          method: 'HEAD',
          mode: 'no-cors' // This will work even if CORS is not configured
        })
        setIsConnected(true)
      } catch (error) {
        setIsConnected(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPlausibleConnection()
  }, [])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Checking Plausible Analytics connection...</p>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Plausible Analytics Not Available</h3>
          <p className="text-gray-400 mb-4">
            The Plausible Analytics server is not currently running. 
            This is expected during development.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-white mb-2">Plausible Analytics Features:</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Privacy-friendly analytics (GDPR compliant)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>No cookies or personal data collection</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Lightweight tracking script</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://plausible.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Learn More</span>
            </a>
            <button 
              onClick={() => window.open('https://github.com/plausible/analytics', '_blank')}
              className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Source</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <h3 className="font-semibold text-white">Plausible Analytics Connected</h3>
              <p className="text-sm text-gray-400">Privacy-friendly analytics dashboard</p>
            </div>
          </div>
          <a 
            href="http://localhost:8000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Dashboard</span>
          </a>
        </div>
      </div>
      
      <div className="h-96">
        <iframe 
          src="http://localhost:8000" 
          className="w-full h-full border-0"
          title="Plausible Analytics Dashboard"
        />
      </div>
    </div>
  )
}

export default PlausibleIntegration 