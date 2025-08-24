'use client'

import { useState, useEffect } from 'react'
import { User, Reel, Flashcard } from './types'
import { generateReels, generateFlashcards } from './data/mockData'
import AuthScreen from './components/AuthScreen'
import InstagramDashboard from './components/InstagramDashboard'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [reels, setReels] = useState<Reel[]>([])
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('edugram-user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      
      // Generate content based on user profile
      const userReels = generateReels(parsedUser.skills, parsedUser.interests)
      const userFlashcards = generateFlashcards(parsedUser.skills, parsedUser.interests)
      
      setReels(userReels)
      setFlashcards(userFlashcards)
    }
    setLoading(false)
  }, [])

  const handleUserSignup = (newUser: User) => {
    setUser(newUser)
    localStorage.setItem('edugram-user', JSON.stringify(newUser))
    
    // Generate personalized content
    const userReels = generateReels(newUser.skills, newUser.interests)
    const userFlashcards = generateFlashcards(newUser.skills, newUser.interests)
    
    setReels(userReels)
    setFlashcards(userFlashcards)
  }

  const handleLoadMore = () => {
    if (user) {
      // Generate more reels based on user profile
      const moreReels = generateReels(user.skills, user.interests)
      const newReels = moreReels.map((reel, index) => ({
        ...reel,
        id: `${reel.id}-more-${Date.now()}-${index}`
      }))
      setReels(prev => [...prev, ...newReels.slice(0, 6)])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthScreen onComplete={handleUserSignup} />
  }

  return (
    <InstagramDashboard
      user={user}
      reels={reels}
      flashcards={flashcards}
      onUpdateReels={setReels}
      onUpdateFlashcards={setFlashcards}
      onLoadMore={handleLoadMore}
    />
  )
}
