import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Heart, Brain, TrendingUp, Users, Shield, Zap } from 'lucide-react'

interface HomeProps {
  onPageChange: (page: string) => void
}

export function Home({ onPageChange }: HomeProps) {
  const { user } = useAuth()

  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Log your daily emotions and see patterns over time',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Brain,
      title: 'Self-Assessment',
      description: 'Take daily tests to monitor your mental wellness',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Progress Dashboard',
      description: 'Visualize your mental health journey with charts and insights',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Expert Resources',
      description: 'Access professional support and therapeutic content',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-16 h-16 text-red-500 mr-4" />
              <h1 className="text-6xl font-bold text-gray-900">Care4U</h1>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your personal digital companion for mental wellness. Track your mood, assess your mental health, 
              and access professional resources—all in one supportive platform designed specifically for students.
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Welcome back, {user?.username}! 👋
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={() => onPageChange('mood')}
                  className="group p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-semibold mb-2">Log Your Mood</h3>
                  <p className="text-sm opacity-90">How are you feeling today?</p>
                </button>
                
                <button
                  onClick={() => onPageChange('test')}
                  className="group p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Brain className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-semibold mb-2">Take Assessment</h3>
                  <p className="text-sm opacity-90">Check your wellness score</p>
                </button>
                
                <button
                  onClick={() => onPageChange('dashboard')}
                  className="group p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-semibold mb-2">View Progress</h3>
                  <p className="text-sm opacity-90">See your journey</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Mental Wellness
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and resources to support your mental health journey, 
            backed by psychology research and expert guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex p-4 rounded-xl ${feature.bgColor} mb-4`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600">Your mental health data is secure and confidential</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Backed</h3>
              <p className="text-gray-600">Resources curated by mental health professionals</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Available</h3>
              <p className="text-gray-600">24/7 access to support and emergency resources</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Take the First Step Today</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Your mental health matters. Start your wellness journey with Care4U and discover 
              the tools and support you need to thrive.
            </p>
            <button
              onClick={() => onPageChange('mood')}
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}