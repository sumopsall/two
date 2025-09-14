import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { Dashboard } from './components/Dashboard'
import { MoodTracker } from './components/MoodTracker'
import { SelfTest } from './components/SelfTest'
import { Resources } from './components/Resources'
import { Auth } from './components/Auth'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Care4U...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />
      case 'dashboard':
        return <Dashboard />
      case 'mood':
        return <MoodTracker />
      case 'test':
        return <SelfTest />
      case 'resources':
        return <Resources />
      default:
        return <Home onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App