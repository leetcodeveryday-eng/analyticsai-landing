import React from 'react'
import { motion } from 'framer-motion'
import { TestTube, BarChart3, BookOpen, Menu } from 'lucide-react'

interface SidebarProps {
  activeTab: 'add' | 'view' | 'docs'
  onTabChange: (tab: 'add' | 'view' | 'docs') => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { icon: BarChart3, label: 'Add Analytics', id: 'add' as const },
    { icon: TestTube, label: 'View Analytics', id: 'view' as const },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sidebar w-48 bg-gray-800 flex flex-col flex-shrink-0"
      style={{ height: 'calc(100vh - 48px)' }}
    >
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 pt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium">Help</span>
        </button>
      </div>
    </motion.div>
  )
}

export default Sidebar 