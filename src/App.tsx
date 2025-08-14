import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MobileEmulator from './components/MobileEmulator'
import ChatAssistant from './components/ChatAssistant'
import AnalyticsDashboard from './components/AnalyticsDashboard'
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
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('add')
  
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
    
    addMessage(`I've uploaded ${file.name}. The app appears to be "${file.name.replace('.ipa', '')}". I'm ready to help you add analytics directly to your product! What type of analytics would you like to integrate?`, 'assistant')
  }

  const handleChatMessage = async (message: string) => {
    addMessage(message, 'user')
    
    // Simulate AI response with Plausible Analytics integration
    setTimeout(() => {
      let response = ''
      
      if (message.toLowerCase().includes('analytics') || message.toLowerCase().includes('tracking')) {
        response = `I can help you integrate Plausible Analytics into your iOS app! Plausible is a privacy-friendly, GDPR-compliant analytics platform that doesn't use cookies or collect personal data. 

Here's how we can get started:
1. **Add the Plausible script** to your iOS app's web view or use their Events API
2. **Track custom events** like user actions, purchases, and feature usage
3. **View insights** in the analytics dashboard (check the "View Analytics" tab)

Would you like me to help you set up specific tracking events for your app?`
      } else if (message.toLowerCase().includes('privacy') || message.toLowerCase().includes('gdpr')) {
        response = `Great question! Plausible Analytics is designed with privacy in mind:

✅ **No cookies** - Doesn't use any cookies or persistent identifiers
✅ **GDPR compliant** - No personal data collection
✅ **No IP tracking** - IP addresses are never stored
✅ **Lightweight** - Only 1KB tracking script

This makes it perfect for apps that need to respect user privacy while still getting valuable analytics insights.`
      } else {
        const responses = [
          "I can help you add Plausible Analytics directly to your app! Plausible is a privacy-friendly alternative to Google Analytics. Let's start by setting up tracking events.",
          "Great choice! I'll help you integrate Plausible Analytics into your app step by step. First, let me analyze your app structure to suggest the best places to add tracking events.",
          "I can generate the exact code you need to add Plausible Analytics to your app. Would you like me to start with user engagement tracking, conversion events, or custom user actions?",
          "Let me create the Plausible Analytics integration code for you. I'll include event tracking, user identification, and performance monitoring to give you comprehensive insights.",
          "Perfect! I'll generate the necessary code snippets and configuration files for Plausible Analytics. This will include SDK setup, event tracking, and dashboard configuration."
        ]
        response = responses[Math.floor(Math.random() * responses.length)]
      }
      
      addMessage(response, 'assistant')
    }, 1000)
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
                  />
                </div>
              </div>

              {/* Chat Assistant Section */}
              <div className="w-96">
                <ChatAssistant 
                  messages={messages}
                  onSendMessage={handleChatMessage}
                  appData={appData}
                />
              </div>
            </>
          ) : (
            /* Analytics Dashboard Section */
            <div className="flex-1 h-full">
              <AnalyticsDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 