import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MobileEmulator from './components/MobileEmulator'
import ChatAssistant from './components/ChatAssistant'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import PostHogServer from './components/PostHogServer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface AppData {
  uploadedFile: File | null
  appName: string
  bundleId: string
  version: string
}

function App() {
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'docs'>('add')
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your analytics.ai assistant. Upload your iOS app to get started, and I\'ll help you add analytics directly to your product interactively.',
      timestamp: new Date()
    }
  ])
  
  const [appData, setAppData] = useState<AppData>({
    uploadedFile: null,
    appName: '',
    bundleId: '',
    version: ''
  })

  const addMessage = (content: string, type: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
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
    
    addMessage(`I've uploaded ${file.name}. The app appears to be "${file.name.replace('.ipa', '')}". I'm ready to help you add analytics directly to your product! What type of analytics would you like to integrate?`, 'assistant')
  }

  const enablePlayButton = () => {
    // play new video
    
  }

  const handleChatMessage = async (message: string) => {
    addMessage(message, 'user')
    
    // Simulate AI response with Plausible Analytics integration
    setTimeout(() => {
      let response = ''
      
      if (message == "I want to find out how many users drop off after the onboarding screen. This is what it looks like when a user completes the onboarding flow.") {
        response = `Here is a practical, step-by-step guide on how to answer "how many users drop off after the onboarding?" for your engineering team.

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

Do you want me to implement tracking for all the events now?
`
      } else if (message == "Yes, implement those events.") {
        response = `5 events have been added. Press play to show how the events are going to be tracked in the flow. Would you like me to make a Pull Request for the changes?`

      } else if (message == "Create the PR") {
        response = `A Pull Request has been created. Waiting for approval.`
      }
      
      addMessage(response, 'assistant')
    }, 1000)
  }

  const handleAddRecording = () => {
    // Add a 2-second delay before starting video playback
    setTimeout(() => {
      setShouldPlayVideo(true)
    }, 2000)
    
    addMessage('Watching application flow...', 'assistant')
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar onTabChange={setActiveTab} activeTab={activeTab} />
        
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'add' ? (
            <>
              {/* Mobile Emulator Section */}
              <div className="flex-1 flex items-center justify-center p-8">
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
                  />
                </div>
              </div>

              {/* Chat Assistant Section */}
              <div className="w-96">
                <ChatAssistant 
                  messages={messages}
                  onSendMessage={handleChatMessage}
                  appData={appData}
                  onAddRecording={handleAddRecording}
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
  )
}

export default App 