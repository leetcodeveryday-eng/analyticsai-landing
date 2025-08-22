import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Plus, Settings } from 'lucide-react'
import MobileEmulator from './components/MobileEmulator'
import ChatAssistant from './components/ChatAssistant'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import PostHogServer from './components/PostHogServer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import LandingPage from './components/LandingPage'

export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  buttons?: Array<{
    text: string
    action: string
  }>
}

export interface AppData {
  uploadedFile: File | null
  appName: string
  bundleId: string
  version: string
}

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true)
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'docs'>('add')
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [playEventsVideo, setPlayEventsVideo] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecordingAttachment, setHasRecordingAttachment] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [loadingText, setLoadingText] = useState<string>('')
  const [showPopup, setShowPopup] = useState(false)
  const [isTypingMessage, setIsTypingMessage] = useState(false)
  const hasShownWelcomeRef = useRef(false)
  
  const [messages, setMessages] = useState<Message[]>([])
  
  const [appData, setAppData] = useState<AppData>({
    uploadedFile: null,
    appName: '',
    bundleId: '',
    version: ''
  })

  // Project management state
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>('Select Project')
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Mock project data - in real app this would come from API
  const projects = [
    { id: '1', name: 'Spotify Example', type: 'iOS' },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProjectDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])



    // Show initial welcome message with typing animation
  useEffect(() => {
    const showWelcomeMessage = async () => {
      if (!hasShownWelcomeRef.current) {
        hasShownWelcomeRef.current = true
        await addTypingMessage('Hello! I\'m your analytics.ai assistant. Upload your iOS app to get started, and I\'ll help you add analytics directly to your product interactively.')
      }
    }
    
    showWelcomeMessage()
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+O (Mac) or Ctrl+O (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'o') {
        event.preventDefault() // Prevent default browser behavior
        console.log('Cmd+O pressed - triggering popup!')
        setShowPopup(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleViewReport = () => {
    setShowPopup(false)
    // Navigate to the analytics view
    setActiveTab('view')
  }



  const handleProjectSelect = (projectName: string) => {
    setSelectedProject(projectName)
    setIsProjectDropdownOpen(false)
  }

  const handleConnectProject = () => {
    // Handle connect project logic
    console.log('Connecting to project...')
  }

  const addMessage = (content: string, type: 'user' | 'assistant', buttons?: Array<{ text: string; action: string }>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      buttons
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addTypingMessage = async (content: string, buttons?: Array<{ text: string; action: string }>) => {
    // Prevent multiple typing messages
    if (isTypingMessage) return
    
    setIsTypingMessage(true)
    const messageId = Date.now().toString()
    const newMessage: Message = {
      id: messageId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      buttons: undefined // Start without buttons
    }
    
    // Add empty message first
    setMessages(prev => [...prev, newMessage])
    
    // Start typing animation
    setIsTyping(true)
    
    // Type out the content word by word for natural typing effect
    const words = content.split(' ')
    let currentContent = ''
    
    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i]
      
      // Update the message content
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentContent }
            : msg
        )
      )
      
      // Add a faster delay between words for ChatGPT-like typing effect
      await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 30))
    }
    
    // Add buttons after typing is complete
    if (buttons && buttons.length > 0) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, buttons }
            : msg
        )
      )
    }
    
    // Stop typing indicator and reset flag
    setIsTyping(false)
    setIsTypingMessage(false)
  }

  const handleFileUpload = (file: File) => {
    setAppData(prev => ({
      ...prev,
      uploadedFile: file,
      appName: file.name.replace('.ipa', ''),
      bundleId: 'com.example.app', // This would be extracted from the IPA
      version: '1.0.0' // This would be extracted from the IPA
    }))
    
    // Reset video playback state when new file is uploaded
    setShouldPlayVideo(false)
    setPlayEventsVideo(false)
    
    addTypingMessage(`I've uploaded ${file.name}. The app appears to be "${file.name.replace('.ipa', '')}". I'm ready to help you add analytics directly to your product! What type of analytics would you like to integrate?`)
  }

  const enablePlayButton = () => {
    // play new video
    
  }

  const handleChatMessage = async (message: string) => {
    addMessage(message, 'user')
    
    // Clear recording attachment when user sends a message
    setHasRecordingAttachment(false)
    
    if (message == "I want to find out how many users drop off after the onboarding screen. This is what it looks like when a user completes the onboarding flow.") {
      // Start typing indicator
      setIsTyping(true)
      setLoadingText('Thinking...')
      
      // After 2 seconds, update loading text
      setTimeout(() => {
        setLoadingText('Analyzing provided flow...')
        
        // After 3 more seconds, show the full response with typing animation
        setTimeout(() => {
          setIsTyping(false)
          setLoadingText('')
          
          const response = `Here is a practical, step-by-step guide on how to answer "how many users drop off after the onboarding?" for your engineering team.

To measure drop-off, you need to define the start and end points of your onboarding process and track how many users successfully move from start to finish. This is called a funnel. The users who start but don't finish are the ones who "drop off."

## 1. 🎯 Define the Onboarding Funnel
First, you and the product team need to define the essential steps of the onboarding process. This is a product decision, not an engineering one. Map out the critical path a new user must take to be considered "onboarded."

A typical funnel might look like this:

Step 1: User opens the app for the first time (views Welcome Screen).

Step 2: User signs up or creates an account.

Step 3: User completes select 3 artists

Step 4: User sees the home screen for the first time.

The start of your funnel is Step 1. The end is Step 4.

## 2. ⚙️ Implement Event Tracking
Next, implement tracking for specific events. An "event" is just a record of a user action. Since you have no tracking in the project, you'll need to start with the basics.

A. Establish User Identity
Before tracking actions, you must be able to identify the user performing them.

user_id: A unique identifier for each user that is created after they sign up or log in. This should be persistent.

anonymous_id: A unique identifier for a user before they sign up. This allows you to track what anonymous visitors do and later tie it to their user_id once they register.

B. Instrument the Key Funnel Events
For the funnel defined above, the engineers need to add code that sends an event at the beginning and end of the flow.

The Starting Event: This event should fire as soon as the user enters the onboarding flow.

Event Name: Onboarding_Started

When to Trigger: When the first screen of the onboarding process is viewed.

The Completion Event: This event should fire only when the user has successfully completed the final step.

Event Name: Onboarding_Completed

When to Trigger: When the user lands on the main dashboard or home screen for the very first time after finishing the last setup action.

The Returned Event: This event should fire only when the user has successfully completed the final step.

Event Name: Returned_after_onboarding

When to Trigger: When the user relaunches or re-foregrounds the application one or more days after completing onboarding.

To get more detailed insights into where users drop off, you should also track the intermediate steps. For example:

Account_Created

Artist_Selection_Completed

Do you want me to implement tracking for all the events now?`
          
          addTypingMessage(response)
        }, 3000)
      }, 2000)
      
      return
    }
    
    // Simulate AI response for other messages
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      let response = ''
      
      if (message == "Yes, implement those events.") {
        response = `Perfect! I've successfully implemented a comprehensive analytics system for your Spotify clone app. Here's a summary of what has been created:
🎯 Analytics Implementation Complete
Key Components Created:
AnalyticsManager (SpotifyClone/Service/AnalyticsManager.swift)
Singleton pattern for easy access throughout the app
Tracks all required funnel events
Stores events locally for development
Ready for production analytics service integration
OnboardingViewModel Updates
Integrated with analytics manager
Tracks step completion and user data
Measures onboarding completion time
App Lifecycle Integration
AppDelegate monitors app foreground/active states
Tracks return after onboarding (1+ days later)
Analytics Dashboard (SpotifyClone/Views/AnalyticsDashboard.swift)
Development tool to view all tracked events
Floating button on home screen for easy access
Shows event details, properties, and timestamps
Events Tracked:
✅ Onboarding_Started - When user enters onboarding flow
✅ Onboarding_Completed - When user finishes onboarding
✅ Returned_after_onboarding - When user returns 1+ days later
✅ Account_Created - When user provides email and password
✅ Artist_Selection_Completed - When user selects 3 artists
✅ Onboarding_Step_Completed - For each individual step

Features:


Real-time tracking of user progress through onboarding
Detailed properties for each event (timestamps, user data, step info)
Local storage for development and debugging
Production-ready architecture for Firebase, Mixpanel, etc.
Console logging with 📊 prefix for easy debugging
Analytics dashboard accessible from home screen

How to Use:
Run the app and tap "SIGN UP FREE" to start onboarding
Complete the flow (email → password → age → name → artists)
Check console for analytics events (📊 prefix)
Access dashboard via floating analytics button on home screen
View all events with detailed properties and timestamps
The system is now ready to provide valuable insights into your onboarding funnel, helping you identify drop-off points and optimize the user experience. All events are properly instrumented and will fire at the exact moments specified in your requirements.

Click the "Play Events" button to see the trached events in the mobile emulator.

Would you like me to make a Pull Request for the changes?`
        
        addTypingMessage(response, [
          { text: 'Play Events', action: 'play_events' }
        ])
        return
      } else if (message == "Create the PR") {
        response = `A Pull Request has been created - https://github.com/jk3vinl/iOSSpotifyExample/pull/2\nWaiting for approval.`
      }
      
      addTypingMessage(response)
    }, 1000)
  }

  const handleAddRecording = () => {
    setIsRecording(true)
    // Add a 2-second delay before starting video playback
    setTimeout(() => {
      setShouldPlayVideo(true)
    }, 2000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setHasRecordingAttachment(true)
  }

  const handleButtonClick = (action: string) => {
    if (action === 'play_events') {
      setPlayEventsVideo(true)
      setShouldPlayVideo(true)
      addTypingMessage('Playing events in the mobile emulator...')
    }
  }

  const handleVideoComplete = () => {
    addTypingMessage('Would you like me to create a pull request for the code changes?')
  }

  return (
    <>
      {showLandingPage ? (
        <LandingPage />
      ) : (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
          {/* Popup Notification */}
          {showPopup && (
            <div className="fixed top-4 right-4 z-50 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-semibold">AI</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-3">
                    I have a report ready for you to view.
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleViewReport}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Report
                    </button>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="px-3 py-1.5 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            <Sidebar onTabChange={setActiveTab} activeTab={activeTab} />
            
            <div className="flex-1 flex overflow-hidden">
              {activeTab === 'add' ? (
                <>
                  {/* Mobile Emulator Section */}
                  <div className="flex-1 relative">
                    {/* Project Management - Top Left and Top Right */}
                    {/* Project Selector Dropdown - Top Left */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-white transition-colors shadow-lg"
                        >
                          <span>{selectedProject}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isProjectDropdownOpen && (
                          <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50">
                            <div className="p-2">
                              <div className="text-xs text-gray-400 px-2 py-1">Recent Projects</div>
                              {projects.map((project) => (
                                <button
                                  key={project.id}
                                  onClick={() => handleProjectSelect(project.name)}
                                  className="w-full text-left px-2 py-2 hover:bg-gray-700 rounded text-sm text-white flex items-center justify-between"
                                >
                                  <span>{project.name}</span>
                                  <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                                    {project.type}
                                  </span>
                                </button>
                              ))}
                              <div className="border-t border-gray-600 mt-2 pt-2">
                                <button className="w-full text-left px-2 py-2 hover:bg-gray-700 rounded text-sm text-blue-400 flex items-center space-x-2">
                                  <Plus className="w-4 h-4" />
                                  <span>Add New Project</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Emulator Content */}
                    <div className="flex items-center justify-center p-8 h-full">
                      <div className="text-center">
                        <div className="mb-4">
                          <span className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded shadow-sm">
                            Embedded Content
                          </span>
                        </div>
                        <MobileEmulator 
                          appData={appData}
                          onFileUpload={handleFileUpload}
                          shouldPlayVideo={shouldPlayVideo}
                          playEventsVideo={playEventsVideo}
                          onVideoComplete={handleVideoComplete}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Chat Assistant Section */}
                  <div className="w-1/2">
                    <ChatAssistant 
                      messages={messages}
                      onSendMessage={handleChatMessage}
                      onButtonClick={handleButtonClick}
                      appData={appData}
                      onAddRecording={handleAddRecording}
                      isRecording={isRecording}
                      onStopRecording={handleStopRecording}
                      hasRecordingAttachment={hasRecordingAttachment}
                      isTyping={isTyping}
                      loadingText={loadingText}
                    />
                  </div>
                </>
              ) : activeTab === 'view' ? (
                /* Analytics Dashboard Section */
                <div className="flex-1 h-full">
                  <AnalyticsDashboard />
                </div>
              ) : (
                /* PostHog Server Section */
                <div className="flex-1 h-full">
                  <PostHogServer />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App 