export interface User {
  id: string
  email: string
  username: string
  created_at: string
}

export interface Mood {
  id: string
  userId: string
  mood: string
  timestamp: string
}

export interface TestResult {
  id: string
  userId: string
  score: number
  date: string
}

export interface Resource {
  id: string
  title: string
  type: 'website' | 'helpline' | 'video'
  link: string
  description?: string
}

export type MoodType = 'happy' | 'sad' | 'stressed' | 'anxious' | 'relaxed' | 'angry'