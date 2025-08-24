'use client'

import { useState, useMemo } from 'react'
import { User, Reel, Flashcard } from '../types'
import { Filter, Sun, Moon, Plus } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import ReelsSection from './ReelsSection'
import FlashcardsSection from './FlashcardsSection'

interface DashboardProps {
  user: User
  reels: Reel[]
  flashcards: Flashcard[]
  onUpdateReels: (reels: Reel[]) => void
  onUpdateFlashcards: (flashcards: Flashcard[]) => void
  onLoadMore: () => void
}

export default function Dashboard({ 
  user, 
  reels, 
  flashcards, 
  onUpdateReels, 
  onUpdateFlashcards,
  onLoadMore 
}: DashboardProps) {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'reels' | 'flashcards'>('reels')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const allCategories = useMemo(() => {
    const categories = new Set([...user.skills, ...user.interests])
    return Array.from(categories)
  }, [user.skills, user.interests])

  const filteredReels = useMemo(() => {
    if (selectedFilter === 'all') return reels
    return reels.filter(reel => 
      reel.category === selectedFilter || reel.tags.includes(selectedFilter.toLowerCase())
    )
  }, [reels, selectedFilter])

  const filteredFlashcards = useMemo(() => {
    if (selectedFilter === 'all') return flashcards
    return flashcards.filter(card => 
      card.category === selectedFilter || card.tags.includes(selectedFilter.toLowerCase())
    )
  }, [flashcards, selectedFilter])

  const handleLikeReel = (reelId: string) => {
    const updatedReels = reels.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            isLiked: !reel.isLiked,
            likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
          }
        : reel
    )
    onUpdateReels(updatedReels)
  }

  const handleBookmarkReel = (reelId: string) => {
    const updatedReels = reels.map(reel => 
      reel.id === reelId 
        ? { ...reel, isBookmarked: !reel.isBookmarked }
        : reel
    )
    onUpdateReels(updatedReels)
  }

  const handleShareReel = (reel: Reel) => {
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: reel.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${reel.title} - ${window.location.href}`)
      alert('Link copied to clipboard!')
    }
  }

  const handleBookmarkFlashcard = (cardId: string) => {
    const updatedFlashcards = flashcards.map(card => 
      card.id === cardId 
        ? { ...card, isBookmarked: !card.isBookmarked }
        : card
    )
    onUpdateFlashcards(updatedFlashcards)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                EduGram
              </h1>
              <div className="hidden md:block">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome back, {user.name}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                {selectedFilter !== 'all' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full" />
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="absolute right-4 top-16 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-64">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Filter by Category
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedFilter('all')
                    setShowFilters(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    selectedFilter === 'all'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All Categories
                </button>
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedFilter(category)
                      setShowFilters(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedFilter === category
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-8 mt-4">
            <button
              onClick={() => setActiveTab('reels')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'reels'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Reels ({filteredReels.length})
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'flashcards'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Flashcards ({filteredFlashcards.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {user.branch} • {user.year} • {user.college}
              </p>
              <div className="flex flex-wrap gap-2">
                {user.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    +{user.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'reels' && (
          <div>
            <ReelsSection
              reels={filteredReels}
              onLike={handleLikeReel}
              onBookmark={handleBookmarkReel}
              onShare={handleShareReel}
            />
            
            {/* Load More Button */}
            <div className="text-center mt-8">
              <button
                onClick={onLoadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Load More Reels</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsSection
            flashcards={filteredFlashcards}
            onBookmark={handleBookmarkFlashcard}
          />
        )}
      </main>
    </div>
  )
}
