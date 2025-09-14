import React, { useState } from 'react'
import { selfTestQuestions, getFeedback, type Question } from '../data/selfTest'
import { demoData } from '../lib/supabase'
import { CheckCircle, RotateCcw } from 'lucide-react'

export function SelfTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < selfTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0)
      demoData.addTestResult(totalScore)
      setShowResults(true)
    }
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  if (showResults) {
    const totalScore = answers.reduce((sum, score) => sum + score, 0)
    const feedback = getFeedback(totalScore)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Results</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{totalScore}/20</div>
              <div className="text-lg text-gray-600">({Math.round((totalScore / 20) * 100)}%)</div>
            </div>
            
            <div className={`mb-6 ${feedback.color}`}>
              <h3 className="text-xl font-semibold mb-3">{feedback.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
            </div>
            
            <button
              onClick={resetTest}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Test Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = selfTestQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / selfTestQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Daily Self-Assessment</h1>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {selfTestQuestions.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-8 leading-relaxed">
            {question.question}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">{index + 1}</span>
                  </div>
                  <span className="text-gray-800 font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}