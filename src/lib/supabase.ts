import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// For demo purposes, we'll use localStorage as fallback
export const demoAuth = {
  signUp: async (email: string, password: string, username: string) => {
    const users = JSON.parse(localStorage.getItem('care4u_users') || '[]')
    const existingUser = users.find((u: any) => u.email === email)
    
    if (existingUser) {
      throw new Error('User already exists')
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      password, // In real app, this would be hashed
      created_at: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('care4u_users', JSON.stringify(users))
    localStorage.setItem('care4u_current_user', JSON.stringify(newUser))
    
    return { user: newUser }
  },
  
  signIn: async (email: string, password: string) => {
    // For demo purposes, allow any email/password combination
    let users = JSON.parse(localStorage.getItem('care4u_users') || '[]')
    let user = users.find((u: any) => u.email === email)
    
    if (!user) {
      // Create a new user automatically if they don't exist
      user = {
        id: Date.now().toString(),
        email,
        username: email.split('@')[0], // Use email prefix as username
        password,
        created_at: new Date().toISOString()
      }
      users.push(user)
      localStorage.setItem('care4u_users', JSON.stringify(users))
    }
    
    localStorage.setItem('care4u_current_user', JSON.stringify(user))
    return { user }
  },
  
  signOut: async () => {
    localStorage.removeItem('care4u_current_user')
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('care4u_current_user')
    return user ? JSON.parse(user) : null
  }
}

// Demo data functions
export const demoData = {
  addMood: (mood: string) => {
    const user = demoAuth.getCurrentUser()
    if (!user) return
    
    const moods = JSON.parse(localStorage.getItem('care4u_moods') || '[]')
    const newMood = {
      id: Date.now().toString(),
      userId: user.id,
      mood,
      timestamp: new Date().toISOString()
    }
    
    moods.push(newMood)
    localStorage.setItem('care4u_moods', JSON.stringify(moods))
  },
  
  getMoods: (days = 7) => {
    const user = demoAuth.getCurrentUser()
    if (!user) return []
    
    const moods = JSON.parse(localStorage.getItem('care4u_moods') || '[]')
    const userMoods = moods.filter((m: any) => m.userId === user.id)
    
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    
    return userMoods.filter((m: any) => new Date(m.timestamp) >= cutoff)
  },
  
  addTestResult: (score: number) => {
    const user = demoAuth.getCurrentUser()
    if (!user) return
    
    const tests = JSON.parse(localStorage.getItem('care4u_tests') || '[]')
    const newTest = {
      id: Date.now().toString(),
      userId: user.id,
      score,
      date: new Date().toISOString().split('T')[0]
    }
    
    tests.push(newTest)
    localStorage.setItem('care4u_tests', JSON.stringify(tests))
  },
  
  getTestResults: () => {
    const user = demoAuth.getCurrentUser()
    if (!user) return []
    
    const tests = JSON.parse(localStorage.getItem('care4u_tests') || '[]')
    return tests.filter((t: any) => t.userId === user.id)
  }
}