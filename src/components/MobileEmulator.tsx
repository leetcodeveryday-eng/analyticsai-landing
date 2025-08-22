import React, { useCallback, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Smartphone, FileText, AlertCircle } from 'lucide-react'
import { AppData } from '../App'
import EventsLog from './EventsLog'

interface MobileEmulatorProps {
  appData: AppData
  onFileUpload: (file: File) => void
  shouldPlayVideo: boolean
  playEventsVideo?: boolean
  onVideoComplete?: () => void
}

const MobileEmulator: React.FC<MobileEmulatorProps> = ({ appData, onFileUpload, shouldPlayVideo, playEventsVideo, onVideoComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [overlayPosition, setOverlayPosition] = useState({ x: 92, y: 13 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [videoPath, setVideoPath] = useState<string>('')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoDuration, setVideoDuration] = useState(30) // Default duration
  const [showEventsLog, setShowEventsLog] = useState(false)
  const [showPasswordAnimation, setShowPasswordAnimation] = useState(false)
  const [passwordDots, setPasswordDots] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Debug: Log animation state changes
  useEffect(() => {
    console.log('Password animation state changed:', showPasswordAnimation)
  }, [showPasswordAnimation])

  useEffect(() => {
    // Set the video path based on whether we're playing events video or default
    if (playEventsVideo) {
      // Use the events video file from the public folder
      setVideoPath('/events-video.mov')
    } else {
      // Set the video path to the public folder (served by the React app)
      setVideoPath('/screen-recording.mov')
    }
  }, [playEventsVideo])

  useEffect(() => {
    // Play video when shouldPlayVideo becomes true
    if (shouldPlayVideo && videoRef.current) {
      // Set video properties for autoplay
      videoRef.current.muted = true
      videoRef.current.playsInline = true
      videoRef.current.autoplay = playEventsVideo || false
      
      // Show events log when playing events video
      if (playEventsVideo) {
        setShowEventsLog(true)
      }
      
      // Try to play the video
      const playPromise = videoRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsVideoPlaying(true)
        }).catch((error) => {
          console.log('Video play failed:', error)
          // If autoplay fails, try playing on user interaction
          const handleUserInteraction = () => {
            videoRef.current?.play().then(() => {
              setIsVideoPlaying(true)
            }).catch(console.error)
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
          }
          document.addEventListener('click', handleUserInteraction)
          document.addEventListener('keydown', handleUserInteraction)
        })
      }
    }
  }, [shouldPlayVideo, playEventsVideo])

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

  const handleVideoLoad = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 30)
    }
  }

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && isVideoPlaying) {
      const currentTime = videoRef.current.currentTime
      
      if (playEventsVideo) {
        // Events video: Show password animation from 18 to 23 seconds, dots complete by 21
        if (currentTime >= 18 && currentTime < 23) {
          setShowPasswordAnimation(true)
          // Calculate number of dots based on time (0.3 seconds per dot, complete by 21 seconds)
          const dotsToShow = Math.min(10, Math.floor((currentTime - 18) * 3.33))
          setPasswordDots(dotsToShow)
          console.log('Events video - Password animation: SHOW at', currentTime, 'dots:', dotsToShow)
        } else {
          setShowPasswordAnimation(false)
          setPasswordDots(0)
          if (currentTime < 18 || currentTime >= 23) {
            console.log('Events video - Password animation: HIDE at', currentTime)
          }
        }
      } else {
        // Screen recording: Show password animation from 20 to 28.5 seconds, dots complete by 28
        if (currentTime >= 20 && currentTime < 28.5) {
          setShowPasswordAnimation(true)
          // Calculate number of dots based on time (0.8 seconds per dot, complete by 28 seconds)
          const dotsToShow = Math.min(10, Math.floor((currentTime - 20) * 1.25))
          setPasswordDots(dotsToShow)
          console.log('Screen recording - Password animation: SHOW at', currentTime, 'dots:', dotsToShow)
        } else {
          setShowPasswordAnimation(false)
          setPasswordDots(0)
          if (currentTime < 20 || currentTime >= 28.5) {
            console.log('Screen recording - Password animation: HIDE at', currentTime)
          }
        }
      }
    }
  }

  const handleVideoEnd = () => {
    setIsVideoPlaying(false)
    setShowEventsLog(false)
    setShowPasswordAnimation(false)
    
    // Call the callback when events video completes
    if (playEventsVideo && onVideoComplete) {
      onVideoComplete()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const container = e.currentTarget.getBoundingClientRect()
    const newX = e.clientX - container.left - dragOffset.x
    const newY = e.clientY - container.top - dragOffset.y
    
    // Constrain to container bounds
    const maxX = container.width - 16 // 16px is overlay width
    const maxY = container.height - 16 // 16px is overlay height
    
    const constrainedX = Math.max(0, Math.min(newX, maxX))
    const constrainedY = Math.max(0, Math.min(newY, maxY))
    
    setOverlayPosition({
      x: constrainedX,
      y: constrainedY
    })
    
    // Log relative position within phone screen
    console.log(`Overlay position: x=${Math.round(constrainedX)}, y=${Math.round(constrainedY)}`)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

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
                  <div 
                    className="h-full w-full relative"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {/* Video takes entire phone screen - no status bar, no bezels */}
                    <video
                      ref={videoRef}
                      src={videoPath}
                      className="w-full h-full object-cover"
                      autoPlay={playEventsVideo}
                      muted={true}
                      playsInline={true}
                      controls={false}
                      preload="auto"
                      onLoadedMetadata={handleVideoLoad}
                      onTimeUpdate={handleVideoTimeUpdate}
                      onEnded={handleVideoEnd}
                    />
                    
                    {/* Password Typing Animation */}
                    {showPasswordAnimation && (
                      <div 
                        className="absolute z-20"
                        style={{
                          left: '15px',
                          top: '113px'
                        }}
                      >
                        <span className="text-white text-sm font-mono">
                          {'•'.repeat(passwordDots)}
                        </span>
                      </div>
                    )}
                    
                    {/* Draggable overlay to cover red dots in videos */}
                    <div 
                      className="absolute w-4 h-4 bg-black rounded-full z-10 cursor-move hover:bg-gray-800 transition-colors"
                      style={{
                        left: `${overlayPosition.x}px`,
                        top: `${overlayPosition.y}px`
                      }}
                      onMouseDown={handleMouseDown}
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

      {/* Events Log Popup */}
      <EventsLog
        isVisible={showEventsLog}
        onClose={() => setShowEventsLog(false)}
        videoDuration={videoDuration}
        isPlaying={isVideoPlaying}
      />
    </div>
  )
}

export default MobileEmulator 