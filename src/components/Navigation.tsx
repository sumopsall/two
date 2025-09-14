import React from 'react'
import { Home, BarChart3, Heart, BookOpen, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { user, signOut } = useAuth()

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'test', label: 'Self-Test', icon: User },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Care4U</span>
            </div>
            
            <div className="hidden md:flex space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
            <button
              onClick={signOut}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden border-t border-gray-200 pt-2 pb-3">
          <div className="flex flex-wrap gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}