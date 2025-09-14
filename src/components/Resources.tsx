import React from 'react'
import { resources } from '../data/resources'
import { ExternalLink, Phone, Video, Globe, Heart, Headphones, BookOpen } from 'lucide-react'

export function Resources() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="w-6 h-6" />
      case 'helpline':
        return <Phone className="w-6 h-6" />
      case 'video':
        return <Video className="w-6 h-6" />
      default:
        return <BookOpen className="w-6 h-6" />
    }
  }

  const getColorScheme = (type: string) => {
    switch (type) {
      case 'website':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800'
      case 'helpline':
        return 'bg-red-50 border-red-200 hover:bg-red-100 text-red-800'
      case 'video':
        return 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800'
    }
  }

  const websites = resources.filter(r => r.type === 'website')
  const helplines = resources.filter(r => r.type === 'helpline')
  const videos = resources.filter(r => r.type === 'video')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Mental Health Resources</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access professional support, emergency helplines, and therapeutic content to support your mental wellness journey.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Crisis Support</h3>
              <p className="text-red-700">
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please reach out to one of our emergency helplines immediately. You're not alone, and help is available 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Support */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Globe className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Professional Support</h2>
          </div>
          
          <div className="grid gap-6">
            {websites.map((resource) => (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${getColorScheme(resource.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getIcon(resource.type)}
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                      {resource.description && (
                        <p className="text-gray-700 mb-4">{resource.description}</p>
                      )}
                      <div className="flex items-center text-sm font-medium">
                        <span className="mr-2">Visit YourDost</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Emergency Helplines */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Phone className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Emergency Helplines</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helplines.map((resource) => (
              <a
                key={resource.id}
                href={resource.link}
                className={`block p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${getColorScheme(resource.type)}`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {getIcon(resource.type)}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-gray-700 mb-4">{resource.description}</p>
                  )}
                  <div className="inline-flex items-center justify-center bg-white bg-opacity-50 px-3 py-2 rounded-lg">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Call Now</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Therapeutic Videos */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Headphones className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Therapeutic Content</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((resource) => (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${getColorScheme(resource.type)}`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {getIcon(resource.type)}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-gray-700 mb-4">{resource.description}</p>
                  )}
                  <div className="inline-flex items-center justify-center bg-white bg-opacity-50 px-3 py-2 rounded-lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Watch Video</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Remember</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Seeking help is a sign of strength, not weakness</li>
            <li>• Mental health is just as important as physical health</li>
            <li>• Recovery is possible, and you don't have to face this alone</li>
            <li>• These resources are here to support you 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  )
}