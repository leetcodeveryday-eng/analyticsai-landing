import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Smartphone, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { AppData } from '../App'

interface MobileEmulatorProps {
  appData: AppData
  onFileUpload: (file: File) => void
}

const MobileEmulator: React.FC<MobileEmulatorProps> = ({ appData, onFileUpload }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.name.endsWith('.ipa')) {
      setIsAnalyzing(true)
      
      // Simulate file analysis
      setTimeout(() => {
        onFileUpload(file)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }, 2000)
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.ipa']
    },
    multiple: false
  })

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Mobile Device Frame */}
      <div className="mobile-frame">
        <div className="mobile-screen">
          {!appData.uploadedFile ? (
            <div className="h-full flex flex-col items-center justify-center p-6 bg-black">
              <div className="text-center">
                <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Upload IPA File</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop your iOS app bundle here to get started
                </p>
                
                <div
                  {...getRootProps()}
                  className={`upload-zone ${isDragActive ? 'dragover' : ''} cursor-pointer`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isDragActive ? 'Drop the IPA file here' : 'Click to select or drag IPA file'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col bg-black">
              {/* Status Bar */}
              <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs">
                <span>8:30</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                  </div>
                  <div className="w-1 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              
              {/* App Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black">
                {isAnalyzing ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                    <p className="text-white text-center">Analyzing app structure...</p>
                    <p className="text-sm text-gray-400 text-center mt-2">Extracting bundle info and dependencies</p>
                  </div>
                ) : analysisComplete ? (
                  <div className="text-center">
                    {/* Spotify-like interface */}
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <div className="w-1 h-4 bg-black rounded-full mx-0.5"></div>
                        <div className="w-1 h-6 bg-black rounded-full mx-0.5"></div>
                        <div className="w-1 h-4 bg-black rounded-full mx-0.5"></div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-2">Millions of songs.</h2>
                    <h3 className="text-xl text-white mb-8">Free on Spotify.</h3>
                    
                    <div className="space-y-3 w-full max-w-xs">
                      <button className="w-full bg-green-500 text-black font-bold py-3 px-6 rounded-full hover:bg-green-400 transition-colors">
                        Sign up free
                      </button>
                      <button className="w-full bg-white text-black font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                        <span>Continue with Google</span>
                      </button>
                      <button className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">f</div>
                        <span>Continue with Facebook</span>
                      </button>
                    </div>
                    
                    <p className="text-gray-400 mt-6">
                      <span className="underline cursor-pointer">Log in</span>
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{appData.appName}</h3>
                    <p className="text-gray-400">Ready for analytics integration</p>
                  </div>
                )}
              </div>
              
              {/* Navigation Bar */}
              <div className="bg-black p-2 flex justify-center">
                <div className="flex space-x-8">
                  <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
                  <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                  <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      
      {/* Upload Instructions */}
      {!appData.uploadedFile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-sm"
        >
          <p className="text-sm text-gray-600">
            Upload your iOS app bundle (.ipa file) to begin analytics integration. 
            The AI assistant will analyze your app and provide personalized recommendations.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default MobileEmulator 