import React, { createContext, useContext, useState, useEffect } from 'react'
import { demoAuth } from '../lib/supabase'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = demoAuth.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)
    try {
      const { user: newUser } = await demoAuth.signUp(email, password, username)
      setUser(newUser)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { user: signedInUser } = await demoAuth.signIn(email, password)
      setUser(signedInUser)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await demoAuth.signOut()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}