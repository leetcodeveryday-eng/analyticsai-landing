import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Copy, Check } from 'lucide-react'
import { Message, AppData } from '../App'

interface ChatAssistantProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  onButtonClick: (action: string) => void
  appData: AppData
  onAddRecording: () => void
  isRecording?: boolean
  onStopRecording?: () => void
  hasRecordingAttachment?: boolean
  loadingText?: string
  isTyping?: boolean
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ messages, onSendMessage, onButtonClick, appData, onAddRecording, isRecording = false, onStopRecording, hasRecordingAttachment = false, loadingText, isTyping = false }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isTyping) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="panel flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Analytics Assistant</h3>
            <p className="text-sm text-gray-400">
              {appData.uploadedFile ? `Analyzing ${appData.appName}` : 'Ready to help with analytics'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`chat-message ${message.type}`}>
                  <div className="flex items-start justify-between group">
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.buttons && message.buttons.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.buttons.map((button, index) => (
                            <button
                              key={index}
                              onClick={() => onButtonClick(button.action)}
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {button.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => copyMessage(message.content, message.id)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-600 rounded"
                    >
                      {copiedMessageId === message.id ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-300" />
              </div>
              <div className="bg-gray-700 rounded-2xl p-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  {loadingText && (
                    <span className="text-sm text-gray-300">{loadingText}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        {/* Recording Button - Only show when app is uploaded */}
        {appData.uploadedFile && (
          <div className="mb-3">
            {!isRecording ? (
              <button
                onClick={onAddRecording}
                className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>📹</span>
                <span>Add Recording</span>
              </button>
            ) : (
              <button
                onClick={onStopRecording}
                className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>⏹️</span>
                <span>Stop Recording</span>
              </button>
            )}
          </div>
        )}
        
        {/* Video Context - Show when recording attachment is available */}
        {hasRecordingAttachment && (
          <div className="mb-3 p-3 bg-gray-800 border border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">🎥</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">User Flow</p>
                <p className="text-xs text-gray-400">Ready to analyze your app flow</p>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xs">Remove</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value)
                autoResize(e)
              }}
              onKeyPress={handleKeyPress}
              placeholder={hasRecordingAttachment ? "Ask about the recording..." : "Ask about analytics integration..."}
              className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 overflow-hidden"
              rows={1}
              style={{ minHeight: '44px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

export default ChatAssistant 