'use client'

import React, { useState } from 'react'
import { Flashcard } from '../types'
import { ChevronLeft, ChevronRight, Bookmark, RotateCcw } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'

interface FlashcardsSectionProps {
  flashcards: Flashcard[]
  onBookmark: (cardId: string) => void
  onRefresh?: () => void
  onComplete?: (flashcardId: string, isCorrect: boolean) => void
}

export default function FlashcardsSection({ flashcards, onBookmark, onRefresh, onComplete }: FlashcardsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const currentCard = flashcards[currentIndex]

  const flipCard = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleCorrectAnswer = () => {
    if (onComplete && currentCard) {
      onComplete(currentCard.id, true)
    }
    nextCard()
  }

  const handleIncorrectAnswer = () => {
    if (onComplete && currentCard) {
      onComplete(currentCard.id, false)
    }
    nextCard()
  }

  const resetCard = () => {
    if (currentCard) {
      setFlippedCards(prev => {
        const newSet = new Set(prev)
        newSet.delete(currentCard.id)
        return newSet
      })
    }
  }

  const handleRefresh = () => {
    if (onRefresh) {
      setCurrentIndex(0)
      setFlippedCards(new Set())
      onRefresh()
    }
  }

  const getCardColors = (index: number) => {
    const colorSchemes = [
      {
        front: 'from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800',
        back: 'from-green-500 to-teal-600 dark:from-green-700 dark:to-teal-800'
      },
      {
        front: 'from-pink-500 to-rose-600 dark:from-pink-700 dark:to-rose-800',
        back: 'from-orange-500 to-red-600 dark:from-orange-700 dark:to-red-800'
      },
      {
        front: 'from-indigo-500 to-blue-600 dark:from-indigo-700 dark:to-blue-800',
        back: 'from-cyan-500 to-blue-600 dark:from-cyan-700 dark:to-blue-800'
      },
      {
        front: 'from-violet-500 to-purple-600 dark:from-violet-700 dark:to-purple-800',
        back: 'from-fuchsia-500 to-pink-600 dark:from-fuchsia-700 dark:to-pink-800'
      },
      {
        front: 'from-emerald-500 to-green-600 dark:from-emerald-700 dark:to-green-800',
        back: 'from-lime-500 to-emerald-600 dark:from-lime-700 dark:to-emerald-800'
      },
      {
        front: 'from-amber-500 to-orange-600 dark:from-amber-700 dark:to-orange-800',
        back: 'from-yellow-500 to-amber-600 dark:from-yellow-700 dark:to-amber-800'
      },
      {
        front: 'from-red-500 to-pink-600 dark:from-red-700 dark:to-pink-800',
        back: 'from-rose-500 to-red-600 dark:from-rose-700 dark:to-red-800'
      },
      {
        front: 'from-teal-500 to-cyan-600 dark:from-teal-700 dark:to-cyan-800',
        back: 'from-blue-500 to-teal-600 dark:from-blue-700 dark:to-teal-800'
      }
    ]
    return colorSchemes[index % colorSchemes.length]
  }

  const handlers = useSwipeable({
    onSwipedLeft: nextCard,
    onSwipedRight: prevCard,
    trackMouse: true
  })

  if (!currentCard) return null

  const isFlipped = flippedCards.has(currentCard.id)
  const cardColors = getCardColors(currentIndex)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="h-full flex flex-col space-y-4 md:space-y-6">
      <div className="flex items-center justify-between px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Flashcards
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {currentIndex + 1} of {flashcards.length}
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center px-4 md:px-8">
        <div 
          {...handlers}
          className="relative w-full h-full max-w-md md:max-w-none md:w-full md:max-h-[70vh]"
        >
          <div 
            className={`card-flip ${isFlipped ? 'flipped' : ''} h-80 md:h-full cursor-pointer`}
            onClick={() => flipCard(currentCard.id)}
          >
            <div className="card-flip-inner">
              {/* Front of card - Question */}
              <div className={`card-flip-front bg-gradient-to-br ${cardColors.front} p-6 md:p-12 flex flex-col justify-center items-center text-center shadow-2xl`}>
                <div className="mb-4 md:mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${getDifficultyColor(currentCard.difficulty)}`}>
                    {currentCard.difficulty.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white text-xl md:text-3xl font-bold mb-4 md:mb-8 drop-shadow-lg">
                  Question
                </h3>
                <p className="text-white text-lg md:text-2xl leading-relaxed max-w-4xl drop-shadow-md">
                  {currentCard.question}
                </p>
                <div className="mt-6 md:mt-12 text-white text-sm md:text-base opacity-75 drop-shadow-sm">
                  Tap to reveal answer
                </div>
              </div>

              {/* Back of card - Answer */}
              <div className={`card-flip-back bg-gradient-to-br ${cardColors.back} p-6 md:p-12 flex flex-col justify-center items-center text-center shadow-2xl`}>
                <div className="mb-4 md:mb-6">
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                    {currentCard.category}
                  </span>
                </div>
                <h3 className="text-white text-xl md:text-3xl font-bold mb-4 md:mb-8 drop-shadow-lg">
                  Answer
                </h3>
                <p className="text-white text-lg md:text-2xl leading-relaxed max-w-4xl drop-shadow-md">
                  {currentCard.answer}
                </p>
                {/* Answer Feedback Buttons */}
                <div className="mt-6 md:mt-8 flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleIncorrectAnswer()
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 shadow-lg"
                  >
                    ❌ Incorrect
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCorrectAnswer()
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 shadow-lg"
                  >
                    ✅ Correct
                  </button>
                </div>
                <div className="mt-4 text-white text-sm md:text-base opacity-75 drop-shadow-sm">
                  How did you do?
                </div>
              </div>
            </div>
          </div>

          {/* Card Actions - Responsive positioning */}
          <div className="absolute -bottom-16 md:-bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 md:space-x-6">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 md:p-4 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-700 dark:text-gray-300" />
            </button>

            <button
              onClick={handleRefresh}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 md:p-4 hover:shadow-xl transition-all duration-200"
            >
              <RotateCcw className="w-6 h-6 md:w-8 md:h-8 text-gray-700 dark:text-gray-300" />
            </button>

            <button
              onClick={() => onBookmark(currentCard.id)}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 md:p-4 hover:shadow-xl transition-all duration-200"
            >
              <Bookmark 
                className={`w-6 h-6 md:w-8 md:h-8 ${currentCard.isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-700 dark:text-gray-300'}`} 
              />
            </button>

            <button
              onClick={nextCard}
              disabled={currentIndex === flashcards.length - 1}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 md:p-4 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-8 md:mt-12 px-4 md:px-0">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

    </div>
  )
}
