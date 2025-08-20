import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronRight,
  Search,
  Bell,
  HelpCircle,
  Plus,
  Filter,
  Calendar,
  BarChart3,
  Users,
  Activity,
  Eye,
  MousePointer,
  Smartphone,
  Globe,
  Clock,
  ArrowUp,
  ArrowDown,
  Settings,
  Play,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  PieChart,
  Map,
  TestTube,
  MessageSquare,
  Database,
  BarChart,
  Layers,
  Package
} from 'lucide-react'

interface RetentionData {
  day: number
  percentage: number
  users: number
}

interface RetentionTableData {
  segment: string
  users: number
  day0: number
  day1: number
  day2: number
  day3: number
  day4: number
  day5: number
  day6: number
  day7: number
}

const AnalyticsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Daily' | '7D' | '30D' | '90D'>('Daily')
  const [selectedView, setSelectedView] = useState<'Overall' | 'Country' | 'Device family' | 'Platform' | 'Monthly New Users'>('Overall')
  const [activeTab, setActiveTab] = useState<'Immediate Drop-off' | 'Drop-off Pattern'>('Immediate Drop-off')
  const [expandedSections, setExpandedSections] = useState({
    productAnalytics: false,
    users: false,
    experiment: false,
    reports: true
  })

  // Mock onboarding drop-off data - focusing on immediate post-onboarding drop-off
  const retentionData: RetentionData[] = [
    { day: 0, percentage: 100, users: 1432 },
    { day: 1, percentage: 33.2, users: 476 }, // 66.8% drop-off immediately after onboarding
    { day: 2, percentage: 28.4, users: 407 },
    { day: 3, percentage: 25.2, users: 361 },
    { day: 4, percentage: 22.8, users: 327 },
    { day: 5, percentage: 21.0, users: 301 },
    { day: 6, percentage: 18.0, users: 258 },
    { day: 7, percentage: 16.3, users: 234 }
  ]

  const retentionTableData: RetentionTableData[] = [
    {
      segment: 'All Users',
      users: 1432,
      day0: 100,
      day1: 33.2, // This shows the dramatic drop-off right after onboarding
      day2: 28.4,
      day3: 25.2,
      day4: 22.8,
      day5: 21.0,
      day6: 18.0,
      day7: 16.3
    }
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`
  }

  const getBarWidth = (percentage: number) => {
    return `${percentage}%`
  }

  return (
    <div className="flex h-full bg-white text-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-4">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Home</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>All Content</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Live Events</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Ask Amplitude</span>
            </div>
            
            {/* Product Analytics Section */}
            <div>
              <div 
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => toggleSection('productAnalytics')}
              >
                <span>Product Analytics</span>
                {expandedSections.productAnalytics ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              {expandedSections.productAnalytics && (
                <div className="ml-4 space-y-1">
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>Product Overview</span>
                  </div>
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>Onboarding</span>
                  </div>
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>Feature Engagement</span>
                  </div>
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md cursor-pointer">
                    <span>Retention</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Marketing Analytics</span>
            </div>
            
            {/* Users Section */}
            <div>
              <div 
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => toggleSection('users')}
              >
                <span>Users</span>
                {expandedSections.users ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              {expandedSections.users && (
                <div className="ml-4 space-y-1">
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>User Lookup</span>
                  </div>
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>User Segments</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Session Replay</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Heatmap</span>
            </div>
            
            {/* Experiment Section */}
            <div>
              <div 
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => toggleSection('experiment')}
              >
                <span>Experiment</span>
                {expandedSections.experiment ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              {expandedSections.experiment && (
                <div className="ml-4 space-y-1">
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>A/B Tests</span>
                  </div>
                  <div className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>Feature Flags</span>
                  </div>
                </div>
              )}
            </div>

            {/* Reports Section */}
            <div>
              <div 
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => toggleSection('reports')}
              >
                <span>Reports</span>
                {expandedSections.reports ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              {expandedSections.reports && (
                <div className="ml-4 space-y-1">
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md cursor-pointer">
                    <span>Post-Onboarding Drop-off Analysis</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Guides and Surveys</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Data</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Metrics</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Object Management</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
              <span>Releases</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center space-x-4 min-w-0">
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md whitespace-nowrap">
                Create <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md whitespace-nowrap">
                Record <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md whitespace-nowrap">
                Favorites <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md whitespace-nowrap">
                Spaces <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search or ask a question"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="p-6 pb-12 overflow-y-auto" style={{ height: 'calc(100vh - 64px - 20px)' }}>

              {/* Title and Actions */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900">Post-Onboarding Drop-off Analysis</h1>
                </div>
                <div className="flex items-center space-x-4 flex-wrap">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Filter
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Segment
                  </button>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <button 
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        selectedTimeframe === 'Daily' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedTimeframe('Daily')}
                    >
                      Daily
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        selectedTimeframe === '7D' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedTimeframe('7D')}
                    >
                      7D
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        selectedTimeframe === '30D' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedTimeframe('30D')}
                    >
                      30D
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        selectedTimeframe === '90D' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedTimeframe('90D')}
                    >
                      90D
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                <button 
                  className={`pb-2 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'Immediate Drop-off' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('Immediate Drop-off')}
                >
                  Immediate Drop-off
                </button>
                <button 
                  className={`pb-2 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'Drop-off Pattern' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('Drop-off Pattern')}
                >
                  Drop-off Pattern
                </button>
              </div>

              {activeTab === 'Immediate Drop-off' && (
                <div className="ml-4 space-y-1">

                </div>
              )}

              {/* Post-Onboarding Drop-off Graph */}
              {activeTab === 'Immediate Drop-off' ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Insight: 66.8% Drop-off After Onboarding</h3>
                    <p className="text-sm text-gray-600">Users complete onboarding but abandon the app immediately after</p>
                  </div>
                  <div className="h-64 flex items-end justify-between space-x-2 min-w-0">
                    {retentionData.map((data, index) => (
                      <div key={data.day} className="flex-1 flex flex-col items-center min-w-0">
                        <div className="text-xs text-gray-500 mb-2 text-center">
                          {formatPercentage(data.percentage)}
                        </div>
                        <div 
                          className={`w-full rounded-t ${data.day === 1 ? 'bg-orange-500' : 'bg-blue-500'}`}
                          style={{ height: `${(data.percentage / 100) * 200}px` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2 text-center">
                          {data.day === 0 ? 'Onboarding' : `Day ${data.day}`}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Users Retained</span>
                      <div className="w-3 h-3 bg-orange-500 rounded-full ml-4"></div>
                      <span className="text-sm text-gray-600">Critical Drop-off Point</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop-off Pattern Over Time</h3>
                    <p className="text-sm text-gray-600">Cumulative drop-off rate showing when users abandon the app</p>
                  </div>
                  <div className="h-64 flex items-end justify-between space-x-2 min-w-0">
                    {retentionData.map((data, index) => {
                      const dropOffRate = 100 - data.percentage;
                      return (
                        <div key={data.day} className="flex-1 flex flex-col items-center min-w-0">
                          <div className="text-xs text-gray-500 mb-2 text-center">
                            {formatPercentage(dropOffRate)}
                          </div>
                          <div 
                            className="w-full bg-red-500 rounded-t"
                            style={{ height: `${(dropOffRate / 100) * 200}px` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2 text-center">
                            {data.day === 0 ? 'Onboarding' : `Day ${data.day}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Cumulative Drop-off Rate</span>
                    </div>
                  </div>
                </div>
              )}

              {/* View By Selector */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mr-4">View By:</label>
                <div className="inline-flex space-x-2 flex-wrap">
                  {['Overall', 'Country', 'Device family', 'Platform', 'Monthly New Users'].map((view) => (
                    <button
                      key={view}
                      className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${
                        selectedView === view 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedView(view as any)}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post-Onboarding Drop-off Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-yellow-50 border-b border-yellow-200">
                  <h4 className="text-sm font-semibold text-yellow-800">Critical Finding</h4>
                  <p className="text-xs text-yellow-700">956 users (66.8%) drop off immediately after completing onboarding</p>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Segment
                      </th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      {Array.from({ length: 8 }, (_, i) => (
                        <th key={i} className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          D{i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {retentionTableData.map((row, index) => (
                      <tr key={index}>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900">
                          {row.segment}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-900">
                          {row.users.toLocaleString()}
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1"></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day0)}</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-orange-500 h-2 rounded mr-1" style={{ width: `${row.day1 * 0.08}px` }}></div>
                            <span className="text-xs font-semibold text-orange-600">{formatPercentage(row.day1)}</span>
                            <span className="text-xs text-orange-500 ml-1 font-semibold">({Math.round(row.users * (row.day1 / 100))})</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1" style={{ width: `${row.day2 * 0.08}px` }}></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day2)}</span>
                            <span className="text-xs text-gray-500 ml-1">({Math.round(row.users * (row.day2 / 100))})</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1" style={{ width: `${row.day3 * 0.08}px` }}></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day3)}</span>
                            <span className="text-xs text-gray-500 ml-1">({Math.round(row.users * (row.day3 / 100))})</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1" style={{ width: `${row.day4 * 0.08}px` }}></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day4)}</span>
                            <span className="text-xs text-gray-500 ml-1">({Math.round(row.users * (row.day4 / 100))})</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1" style={{ width: `${row.day5 * 0.08}px` }}></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day5)}</span>
                            <span className="text-xs text-gray-500 ml-1">({Math.round(row.users * (row.day5 / 100))})</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1" style={{ width: `${row.day6 * 0.08}px` }}></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day6)}</span>
                            <span className="text-xs text-gray-500 ml-1">({Math.round(row.users * (row.day6 / 100))})</span>
                          </div>
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center">
                            <div className="w-8 bg-blue-500 h-2 rounded mr-1" style={{ width: `${row.day7 * 0.08}px` }}></div>
                            <span className="text-xs text-gray-900">{formatPercentage(row.day7)}</span>
                            <span className="text-xs text-gray-500 ml-1">({Math.round(row.users * (row.day7 / 100))})</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Improve Post-Onboarding Section */}
              <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4">🚨 Critical Issue: Users Abandon After Onboarding</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-red-200">
                    <h4 className="text-sm font-semibold text-red-700 mb-2">Immediate Action Required</h4>
                    <p className="text-sm text-red-600 mb-2">66.8% of users (956 people) complete onboarding but never return to the app.</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• <strong>Onboarding completion rate:</strong> 100% (users finish the flow)</li>
                      <li>• <strong>Day 1 retention:</strong> Only 33.2% (476 users)</li>
                      <li>• <strong>Critical gap:</strong> Users don't see value after onboarding</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded border border-red-200">
                    <h4 className="text-sm font-semibold text-red-700 mb-2">Recommended Solutions</h4>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• <strong>Immediate value demonstration:</strong> Show users what they can accomplish right after onboarding</li>
                      <li>• <strong>Success state:</strong> Create a compelling "first win" experience</li>
                      <li>• <strong>Clear next steps:</strong> Guide users to their first meaningful action</li>
                      <li>• <strong>Onboarding optimization:</strong> Ensure onboarding actually prepares users for success</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  )
}

export default AnalyticsDashboard 