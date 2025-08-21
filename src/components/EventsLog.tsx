import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Activity } from 'lucide-react'

interface Event {
  id: string
  name: string
  timestamp: string
  metadata?: Record<string, any>
}

interface EventsLogProps {
  isVisible: boolean
  onClose: () => void
  videoDuration: number
  isPlaying: boolean
}

const EventsLog: React.FC<EventsLogProps> = ({ isVisible, onClose, videoDuration, isPlaying }) => {
  const [events, setEvents] = useState<Event[]>([])

  // Function to calculate timestamp relative to 2:30 PM
  const calculateRelativeTimestamp = (timeOffset: number) => {
    const baseTime = new Date()
    baseTime.setHours(14, 29, 54, 0) // Set to 2:30 PM
    
    const relativeTime = new Date(baseTime.getTime() + (timeOffset * 1000)) // Add offset in milliseconds
    return relativeTime.toLocaleTimeString()
  }

  // Define the events with their timing (in seconds from video start)
  const eventSchedule = [
    { name: 'Onboarding_Started', time: 3 },
    { name: 'Account_Created', time: 24, metadata: { method: 'email', user_id: 'user_456' } },
    { name: 'Artist_Selection_Completed', time: 43, metadata: { artists_selected: 3, user_id: 'user_456' } },
    { name: 'Onboarding_Completed', time: 52, metadata: { duration_seconds: 20, user_id: 'user_456' } },
  ]

  useEffect(() => {
    if (!isVisible || !isPlaying) {
      setEvents([])
      return
    }

    // Clear any existing timeouts
    const timeouts: NodeJS.Timeout[] = []

    // Schedule each event with its own setTimeout
    eventSchedule.forEach(event => {
      const timeout = setTimeout(() => {
        setEvents(prev => [...prev, {
          id: `${event.name}_${Date.now()}`,
          name: event.name,
          timestamp: calculateRelativeTimestamp(event.time),
          metadata: event.metadata
        }])
      }, event.time * 1000) // Convert seconds to milliseconds
      
      timeouts.push(timeout)
    })

    // Cleanup function to clear all timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [isVisible, isPlaying])

  const formatMetadata = (metadata: Record<string, any>) => {
    return Object.entries(metadata)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-2xl w-96 max-h-80 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-semibold">Events Log</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Events List */}
            <div className="max-h-60 overflow-y-auto">
              {events.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Waiting for events...</p>
                </div>
              ) : (
                <div className="p-2">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="mb-2 p-3 bg-gray-700 rounded-lg border-l-4 border-green-400"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-green-400 font-mono text-sm font-semibold">
                              {event.name}
                            </span>
                            <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                              {event.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>


          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EventsLog 