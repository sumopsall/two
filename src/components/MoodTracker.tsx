import React, { useState } from 'react'
import { demoData } from '../lib/supabase'
import type { MoodType } from '../types'

const moods: Array<{ type: MoodType; emoji: string; label: string; color: string }> = [
  { type: 'happy', emoji: '😊', label: 'Happy', color: 'bg-green-100 hover:bg-green-200 text-green-800' },
  { type: 'sad', emoji: '😢', label: 'Sad', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
  { type: 'stressed', emoji: '😰', label: 'Stressed', color: 'bg-red-100 hover:bg-red-200 text-red-800' },
  { type: 'anxious', emoji: '😟', label: 'Anxious', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  { type: 'relaxed', emoji: '😌', label: 'Relaxed', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800' },
  { type: 'angry', emoji: '😠', label: 'Angry', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800' }
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleMoodSubmit = () => {
    if (selectedMood) {
      demoData.addMood(selectedMood)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setSelectedMood(null)
      }, 3000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mood Logged!</h2>
          <p className="text-gray-600">
            Thank you for sharing how you're feeling. Your mood has been recorded for today.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How are you feeling today?</h1>
          <p className="text-lg text-gray-600">Select the mood that best describes how you're feeling right now.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {moods.map((mood) => (
              <button
                key={mood.type}
                onClick={() => setSelectedMood(mood.type)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                  selectedMood === mood.type
                    ? 'border-blue-500 ring-4 ring-blue-100 scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                } ${mood.color}`}
              >
                <div className="text-6xl mb-3">{mood.emoji}</div>
                <div className="font-semibold text-lg">{mood.label}</div>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="text-center">
              <div className="mb-4">
                <p className="text-gray-600 mb-2">You selected:</p>
                <div className="inline-flex items-center bg-blue-50 px-6 py-3 rounded-xl">
                  <span className="text-2xl mr-3">
                    {moods.find(m => m.type === selectedMood)?.emoji}
                  </span>
                  <span className="font-semibold text-blue-800">
                    {moods.find(m => m.type === selectedMood)?.label}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleMoodSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 transform hover:scale-105"
              >
                Log My Mood
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}