import React, { useCallback, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Smartphone, FileText, AlertCircle } from 'lucide-react'
import { AppData } from '../App'

interface MobileEmulatorProps {
  appData: AppData
  onFileUpload: (file: File) => void
  shouldPlayVideo: boolean
}

const MobileEmulator: React.FC<MobileEmulatorProps> = ({ appData, onFileUpload, shouldPlayVideo }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [videoPath, setVideoPath] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Set the video path to the public folder (served by the React app)
    setVideoPath('/screen-recording.mov')
  }, [])

  useEffect(() => {
    // Play video when shouldPlayVideo becomes true
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video play failed:', error)
      })
    }
  }, [shouldPlayVideo])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.name.toLowerCase().endsWith('.ipa')) {
      setIsAnalyzing(true)
      
      // Simulate file analysis
      setTimeout(() => {
        onFileUpload(file)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }, 2000)
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.ipa'],
      'application/x-ios-app': ['.ipa']
    },
    multiple: false,
    maxFiles: 1
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
                  Drag and drop your iOS app bundle (.ipa) here to get started
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
                  <p className="text-xs text-gray-500 mt-1">Only .ipa files are accepted</p>
                </div>

                {/* File rejection errors */}
                {fileRejections.length > 0 && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">
                        {fileRejections[0].errors[0].message === 'File type not accepted' 
                          ? 'Please upload only .ipa files' 
                          : fileRejections[0].errors[0].message}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col bg-black">
              {/* App Content - Video takes full phone screen */}
              <div className="h-full w-full bg-black">
                {isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                    <p className="text-white text-center">Analyzing app structure...</p>
                    <p className="text-sm text-gray-400 text-center mt-2">Extracting bundle info and dependencies</p>
                  </div>
                ) : analysisComplete ? (
                  <div className="h-full w-full">
                    {/* Video takes entire phone screen - no status bar, no bezels */}
                    <video
                      ref={videoRef}
                      src={videoPath}
                      className="w-full h-full object-cover"
                      autoPlay={false}
                      muted
                      playsInline
                      controls={false}
                      preload="auto"
                    />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{appData.appName}</h3>
                    <p className="text-gray-400">Ready for analytics integration</p>
                  </div>
                )}
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
          <p className="text-xs text-gray-500 mt-2">
            <strong>Note:</strong> Only .ipa files are accepted
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default MobileEmulator 