import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, Activity, Calendar, Filter } from 'lucide-react'
import PlausibleIntegration from './PlausibleIntegration'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  sessions: number
  events: number
  conversionRate: number
  topEvents: Array<{ name: string; count: number }>
  dailyData: Array<{ date: string; users: number; events: number }>
}

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalUsers: 1247,
    activeUsers: 892,
    sessions: 3456,
    events: 15678,
    conversionRate: 23.4,
    topEvents: [
      { name: 'app_open', count: 3456 },
      { name: 'user_login', count: 2891 },
      { name: 'purchase_completed', count: 1234 },
      { name: 'feature_used', count: 987 },
      { name: 'share_content', count: 654 }
    ],
    dailyData: [
      { date: '2024-08-08', users: 145, events: 1234 },
      { date: '2024-08-09', users: 167, events: 1456 },
      { date: '2024-08-10', users: 189, events: 1678 },
      { date: '2024-08-11', users: 156, events: 1345 },
      { date: '2024-08-12', users: 178, events: 1567 },
      { date: '2024-08-13', users: 203, events: 1890 },
      { date: '2024-08-14', users: 234, events: 2100 }
    ]
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-400">Powered by Plausible Analytics - Privacy-friendly web analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12.5%
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8.3%
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sessions</p>
              <p className="text-2xl font-bold">{analyticsData.sessions.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +15.2%
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
          <div className="mt-2 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2.1%
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Events */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4">Top Events</h3>
          <div className="space-y-3">
            {analyticsData.topEvents.map((event, index) => (
              <div key={event.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm">{event.name}</span>
                </div>
                <span className="text-sm font-mono text-gray-300">{event.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Activity */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
          <div className="space-y-3">
            {analyticsData.dailyData.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-gray-300">{day.users} users</div>
                  <div className="text-xs text-gray-500">{day.events} events</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Plausible Analytics Integration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <PlausibleIntegration />
      </motion.div>

      {/* Real-time Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-4">Real-time Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>User login from iOS device</span>
            <span className="text-gray-500 ml-auto">2s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Purchase completed - $29.99</span>
            <span className="text-gray-500 ml-auto">5s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Feature accessed - Analytics</span>
            <span className="text-gray-500 ml-auto">8s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>App opened from push notification</span>
            <span className="text-gray-500 ml-auto">12s ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard 