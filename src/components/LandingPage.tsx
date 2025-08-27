import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Calendar, ArrowRight, CheckCircle, BarChart3, Zap, Shield, Menu, X } from 'lucide-react'

const LandingPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking submission
    console.log('Booking submitted:', bookingForm)
    setIsBookingModalOpen(false)
    // Reset form
    setBookingForm({ name: '', email: '', company: '', message: '' })
  }

  const handleBookDemo = () => {
    window.open('https://calendly.com/anayticsai/30min', '_blank')
  }

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "No-Code Analytics",
      description: "Simply describe what you want to measure and our AI Agent automatically generates the tracking logic and integrates it into your codebase"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Intelligent Insights",
      description: "The AI continuously watches your data and builds clear, customized reports based on your objectives, surfacing trends and anomalies"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seamless Integration",
      description: "Works with your existing analytics tools, analyzing both historical and live data without requiring complex queries"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AnalyticsAI</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
              <button
                onClick={handleBookDemo}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Book Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => {
                  setIsVideoModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Play className="w-5 h-5" />
                <span className="text-base font-medium">Watch Demo</span>
              </button>
              <button
                onClick={() => {
                  handleBookDemo()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center justify-center w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-base font-medium"
              >
                Book Demo
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Analytics powered by{' '}
              <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Add product analytics and track key metrics without writing any code. Our AI Agent lets anyone instrument analytics for specific flows, user paths, or features they want to measure - no developers required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookDemo}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Demo</span>
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose AnalyticsAI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Move faster, make better decisions, and reduce friction between product, data, and engineering teams.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              See how our AI Agent can help you track key metrics without writing any code. Book a personalized demo today.
            </p>
            <button
              onClick={handleBookDemo}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 mx-auto"
            >
              <span>Book Your Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">AnalyticsAI</h3>
          <p className="text-gray-400">
            © 2025 AnalyticsAI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden relative">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Book a Demo</h3>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={bookingForm.company}
                  onChange={(e) => setBookingForm({...bookingForm, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Demo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
