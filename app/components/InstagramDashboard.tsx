'use client'

import React, { useState } from 'react'
import { User, Reel, Flashcard } from '../types'
import InstagramReels from './InstagramReels'
import FlashcardsSection from './FlashcardsSection'
import GroupsSection from './GroupsSection'
import ProfileSection from './ProfileSection'
import BottomNavigation from './BottomNavigation'

interface InstagramDashboardProps {
  user: User
  reels: Reel[]
  flashcards: Flashcard[]
  onLike: (reelId: string) => void
  onBookmark: (reelId: string) => void
  onShare: (reel: Reel) => void
  onComment: (reelId: string, comment: string) => void
}

export default function InstagramDashboard({
  user,
  reels,
  flashcards,
  onLike,
  onBookmark,
  onShare,
  onComment
}: InstagramDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')
  const [currentFlashcards, setCurrentFlashcards] = useState(flashcards)
  const [watchedReels, setWatchedReels] = useState<Set<string>>(new Set())
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set())
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set(['andhra-university']))
  const [totalScore, setTotalScore] = useState(1500)


  const handleLikeReel = (reelId: string) => {
    setWatchedReels(prev => new Set([...prev, reelId]))
    onLike(reelId)
  }

  const handleReelView = (reelId: string) => {
    setWatchedReels(prev => new Set([...prev, reelId]))
  }

  const handleBookmarkReel = (reelId: string) => {
    onBookmark(reelId)
  }

  const handleShareReel = (reel: Reel) => {
    onShare(reel)
  }

  const handleCommentReel = (reelId: string, comment: string) => {
    onComment(reelId, comment)
  }

  const handleFlashcardComplete = (flashcardId: string, isCorrect: boolean) => {
    setStudiedCards(prev => new Set([...prev, flashcardId]))
    if (isCorrect) {
      setTotalScore(prev => prev + 50)
    }
    const updatedFlashcards = currentFlashcards.map(card =>
      card.id === flashcardId
        ? {
          ...card,
          attempts: card.attempts + 1,
          correctAttempts: isCorrect ? card.correctAttempts + 1 : card.correctAttempts,
          lastAttempted: new Date().toISOString()
        }
        : card
    )
    setCurrentFlashcards(updatedFlashcards)
  }

  const handleBookmarkFlashcard = (cardId: string) => {
    const updatedFlashcards = flashcards.map(card =>
      card.id === cardId
        ? { ...card, isBookmarked: !card.isBookmarked }
        : card
    )
    setCurrentFlashcards(updatedFlashcards)
  }

  const handleRefreshFlashcards = () => {
    setCurrentFlashcards(flashcards)
  }

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Main Content */}
      {activeTab === 'home' && (
        <InstagramReels
          reels={reels}
          onLike={handleLikeReel}
          onBookmark={handleBookmarkReel}
          onShare={handleShareReel}
          onComment={handleCommentReel}
          onReelView={handleReelView}
        />
      )}

      {activeTab === 'flashcards' && (
        <div className="h-full bg-gray-50 dark:bg-gray-900 pb-20">
          <div className="h-full">
            <FlashcardsSection
              flashcards={flashcards}
              onBookmark={handleBookmarkFlashcard}
              onRefresh={handleRefreshFlashcards}
              onComplete={handleFlashcardComplete}
            />
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <GroupsSection user={user} />
      )}

      {activeTab === 'profile' && (
        <ProfileSection 
          user={user} 
          totalScore={totalScore}
          studiedCards={studiedCards.size}
          watchedReels={watchedReels.size}
          joinedGroups={joinedGroups.size}
        />
      )}
      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}
