'use client'

import { Home, BookOpen, Users, User } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map(tab => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-4 transition-colors duration-200 ${
                isActive ? 'text-purple-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <IconComponent className={`w-6 h-6 mb-1 ${isActive ? 'text-purple-400' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
