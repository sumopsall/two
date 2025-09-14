import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { demoData } from '../lib/supabase'
import { Calendar, TrendingUp, Heart, Brain, Target } from 'lucide-react'
import { format, subDays, startOfDay } from 'date-fns'

export function Dashboard() {
  const [moodData, setMoodData] = useState<any[]>([])
  const [recentMood, setRecentMood] = useState<string>('')
  const [lastTestScore, setLastTestScore] = useState<number>(0)

  useEffect(() => {
    // Get mood data for the last 7 days
    const moods = demoData.getMoods(7)
    
    // Process mood data for chart
    const moodCounts: { [key: string]: { [mood: string]: number } } = {}
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'MM/dd')
      moodCounts[date] = {
        happy: 0, sad: 0, stressed: 0, anxious: 0, relaxed: 0, angry: 0
      }
    }
    
    // Count moods by day
    moods.forEach(mood => {
      const date = format(new Date(mood.timestamp), 'MM/dd')
      if (moodCounts[date]) {
        moodCounts[date][mood.mood] += 1
      }
    })
    
    // Convert to chart data
    const chartData = Object.entries(moodCounts).map(([date, moods]) => ({
      date,
      ...moods,
      total: Object.values(moods).reduce((sum, count) => sum + count, 0)
    }))
    
    setMoodData(chartData)
    
    // Set recent mood
    if (moods.length > 0) {
      setRecentMood(moods[moods.length - 1].mood)
    }
    
    // Get last test score
    const tests = demoData.getTestResults()
    if (tests.length > 0) {
      setLastTestScore(tests[tests.length - 1].score)
    }
  }, [])

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      happy: '😊', sad: '😢', stressed: '😰', anxious: '😟', relaxed: '😌', angry: '😠'
    }
    return moodMap[mood] || '😐'
  }

  const getMoodColor = (mood: string) => {
    const colorMap: { [key: string]: string } = {
      happy: 'text-green-600', sad: 'text-blue-600', stressed: 'text-red-600',
      anxious: 'text-yellow-600', relaxed: 'text-purple-600', angry: 'text-orange-600'
    }
    return colorMap[mood] || 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Wellness Dashboard</h1>
          <p className="text-lg text-gray-600">Track your mental health journey and progress</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Latest Mood</h3>
                <div className="flex items-center mt-2">
                  <span className="text-3xl mr-3">{getMoodEmoji(recentMood)}</span>
                  <span className={`text-xl font-medium capitalize ${getMoodColor(recentMood)}`}>
                    {recentMood || 'No data yet'}
                  </span>
                </div>
              </div>
              <Heart className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Latest Test Score</h3>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-green-600">{lastTestScore}/20</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({Math.round((lastTestScore / 20) * 100)}%)
                  </span>
                </div>
              </div>
              <Brain className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Days</h3>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-purple-600">
                    {moodData.filter(d => d.total > 0).length}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">Last 7 days</span>
                </div>
              </div>
              <Calendar className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">7-Day Mood Trend</h3>
            </div>
            
            {moodData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="happy" stroke="#10b981" strokeWidth={2} name="Happy" />
                  <Line type="monotone" dataKey="relaxed" stroke="#8b5cf6" strokeWidth={2} name="Relaxed" />
                  <Line type="monotone" dataKey="stressed" stroke="#ef4444" strokeWidth={2} name="Stressed" />
                  <Line type="monotone" dataKey="anxious" stroke="#f59e0b" strokeWidth={2} name="Anxious" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Start tracking your moods to see trends here</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Mood Distribution</h3>
            </div>
            
            {moodData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="happy" fill="#10b981" name="Happy" />
                  <Bar dataKey="relaxed" fill="#8b5cf6" name="Relaxed" />
                  <Bar dataKey="stressed" fill="#ef4444" name="Stressed" />
                  <Bar dataKey="anxious" fill="#f59e0b" name="Anxious" />
                  <Bar dataKey="sad" fill="#3b82f6" name="Sad" />
                  <Bar dataKey="angry" fill="#f97316" name="Angry" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Track your daily moods to see distribution patterns</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
              <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Log today's mood to keep your streak going</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200">
              <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">Take the daily self-test to monitor your wellness</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-800">Explore resources for additional support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}