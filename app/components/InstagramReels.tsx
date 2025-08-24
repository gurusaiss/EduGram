'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Reel } from '../types'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX, Play, Pause } from 'lucide-react'
// import CommentsModal from './CommentsModal'

interface InstagramReelsProps {
  reels: Reel[]
  onLike: (reelId: string) => void
  onBookmark: (reelId: string) => void
  onShare: (reel: Reel) => void
  onComment: (reelId: string, comment: string) => void
  onReelView?: (reelId: string) => void
}

export default function InstagramReels({ reels, onLike, onBookmark, onShare, onComment, onReelView }: InstagramReelsProps) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [mutedReels, setMutedReels] = useState<Set<string>>(new Set())
  const [playingReels, setPlayingReels] = useState<Set<string>>(new Set())
  const [showPlayButton, setShowPlayButton] = useState<Set<string>>(new Set())
  const [showComments, setShowComments] = useState<string | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const currentReel = reels[currentReelIndex] || null

  useEffect(() => {
    // Track reel view when reel changes
    if (currentReel && onReelView) {
      onReelView(currentReel.id)
    }

    // Auto-play current reel with enhanced error handling
    if (currentReel && videoRefs.current[currentReel.id]) {
      const video = videoRefs.current[currentReel.id]
      if (video) {
        // Reset video state
        video.currentTime = 0
        video.load()
        
        // Add event listeners for better control
        const handleCanPlay = () => {
          video.play().then(() => {
            setPlayingReels(prev => new Set([...prev, currentReel.id]))
          }).catch(error => {
            console.log('Video autoplay failed:', error)
            // Try playing with user interaction
            video.muted = true
            video.play().catch(e => console.log('Muted autoplay also failed:', e))
          })
        }

        const handleError = (e: any) => {
          console.log('Video error:', e)
          console.log('Video URL:', currentReel.videoUrl)
        }

        video.addEventListener('canplay', handleCanPlay)
        video.addEventListener('error', handleError)
        
        // Cleanup listeners
        return () => {
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('error', handleError)
        }
      }
    }

    // Pause other videos
    reels.forEach((reel, index) => {
      if (index !== currentReelIndex) {
        if (videoRefs.current[reel.id]) {
          const video = videoRefs.current[reel.id]
          if (video) {
            video.pause()
            setPlayingReels(prev => {
              const newSet = new Set(prev)
              newSet.delete(reel.id)
              return newSet
            })
          }
        }
      }
    })
  }, [currentReelIndex, reels, currentReel])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isScrolling) return
      
      switch(e.key) {
        case 'ArrowDown':
        case ' ': // Spacebar
          e.preventDefault()
          if (currentReelIndex < reels.length - 1) {
            setIsScrolling(true)
            setCurrentReelIndex(prev => prev + 1)
            setTimeout(() => setIsScrolling(false), 500)
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (currentReelIndex > 0) {
            setIsScrolling(true)
            setCurrentReelIndex(prev => prev - 1)
            setTimeout(() => setIsScrolling(false), 500)
          }
          break
        case 'ArrowLeft':
        case 'ArrowRight':
          e.preventDefault()
          if (currentReel) {
            togglePlayPause(currentReel.id)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentReelIndex, reels.length, currentReel, isScrolling])

  const handleScroll = (e: any) => {
    e.preventDefault()
    
    if (isScrolling) return // Prevent multiple scrolls
    
    setIsScrolling(true)
    
    if (e.deltaY > 30 && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(prev => prev + 1)
    } else if (e.deltaY < -30 && currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1)
    }
    
    // Reset scroll lock after a delay
    setTimeout(() => setIsScrolling(false), 300)
  }

  const handleTouchStart = (e: any) => {
    const touch = e.touches[0]
    setTouchStart(touch.clientY)
  }

  const handleTouchEnd = (e: any) => {
    if (!touchStart || isScrolling) return
    
    const touch = e.changedTouches[0]
    const diff = touchStart - touch.clientY
    
    if (Math.abs(diff) > 50) { // Reduced swipe distance for easier navigation
      setIsScrolling(true)
      if (diff > 0 && currentReelIndex < reels.length - 1) {
        setCurrentReelIndex(prev => prev + 1)
      } else if (diff < 0 && currentReelIndex > 0) {
        setCurrentReelIndex(prev => prev - 1)
      }
      setTimeout(() => setIsScrolling(false), 300)
    }
    setTouchStart(null)
  }

  const toggleMute = (reelId: string) => {
    setMutedReels(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reelId)) {
        newSet.delete(reelId)
      } else {
        newSet.add(reelId)
      }
      return newSet
    })

    const video = videoRefs.current[reelId]
    if (video) {
      video.muted = !video.muted
    }
  }

  const togglePlayPause = (reelId: string) => {
    const video = videoRefs.current[reelId]
    if (video) {
      if (playingReels.has(reelId)) {
        video.pause()
        setPlayingReels(prev => {
          const newSet = new Set(prev)
          newSet.delete(reelId)
          return newSet
        })
        setShowPlayButton(prev => new Set([...prev, reelId]))
      } else {
        video.play().catch(error => {
          console.log('Video play failed:', error)
        })
        setPlayingReels(prev => new Set([...prev, reelId]))
        setShowPlayButton(prev => {
          const newSet = new Set(prev)
          newSet.delete(reelId)
          return newSet
        })
      }
    }
  }

  const handleVideoClick = (reelId: string) => {
    togglePlayPause(reelId)
  }

  if (!currentReel) return null

  return (
    <div className="relative h-screen bg-black overflow-hidden">
        {/* Main Reel Container */}
      <div 
        ref={containerRef}
        className="h-full w-full relative"
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Single Video Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={(el) => { videoRefs.current[currentReel.id] = el }}
            src={currentReel.videoUrl}
            className="h-full w-full object-cover cursor-pointer"
            loop
            muted={mutedReels.has(currentReel.id)}
            playsInline
            preload="auto"
            autoPlay
            controls={false}
            onClick={() => handleVideoClick(currentReel.id)}
            onError={(e) => console.log('Video error:', e)}
            onLoadStart={() => console.log('Video loading:', currentReel.title)}
            onCanPlay={() => console.log('Video can play:', currentReel.title)}
          />
          
          {/* Play/Pause Overlay */}
          {!playingReels.has(currentReel.id) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black bg-opacity-50 rounded-full p-4">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-xl font-bold">EduGram</h1>
            {/* Sound/Mute Button moved to top right like Instagram */}
            <button
              onClick={() => toggleMute(currentReel.id)}
              className="bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-black/40 transition-all duration-200"
            >
              {mutedReels.has(currentReel.id) ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-24 z-10 flex flex-col items-center space-y-6">
          {/* Like Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onLike(currentReel.id)}
              className="bg-black/20 backdrop-blur-sm rounded-full p-3 hover:bg-black/40 transition-all duration-200"
            >
              <Heart 
                className={`w-7 h-7 ${currentReel.isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
              />
            </button>
            <span className="text-white text-sm font-medium mt-1">
              {currentReel.likes > 0 ? currentReel.likes : ''}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowComments(currentReel.id)}
              className="bg-black/20 backdrop-blur-sm rounded-full p-3 hover:bg-black/40 transition-all duration-200"
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </button>
            <span className="text-white text-sm font-medium mt-1">
              {currentReel.comments && currentReel.comments > 0 ? currentReel.comments : ''}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onShare(currentReel)}
              className="bg-black/20 backdrop-blur-sm rounded-full p-3 hover:bg-black/40 transition-all duration-200"
            >
              <Send className="w-7 h-7 text-white" />
            </button>
            <span className="text-white text-sm font-medium mt-1">15</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onBookmark(currentReel.id)}
            className="bg-black/20 backdrop-blur-sm rounded-full p-3 hover:bg-black/40 transition-all duration-200"
          >
            <Bookmark 
              className={`w-7 h-7 ${currentReel.isBookmarked ? 'text-yellow-500 fill-current' : 'text-white'}`} 
            />
          </button>

          {/* More Options */}
          <button className="bg-black/20 backdrop-blur-sm rounded-full p-3 hover:bg-black/40 transition-all duration-200">
            <MoreHorizontal className="w-7 h-7 text-white" />
          </button>
        </div>


        {/* Bottom Content Info */}
        <div className="absolute bottom-24 left-4 right-20 z-10 text-white">
          <div className="mb-3">
            <h3 className="text-lg font-bold mb-1">{currentReel.title}</h3>
            <p className="text-sm opacity-90 mb-2">{currentReel.description}</p>
            
            {/* Category and Views */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                {currentReel.category}
              </span>
              <span className="text-xs opacity-75">1560 views</span>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-1">
              {currentReel.tags.map(tag => (
                <span key={tag} className="text-blue-300 text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 flex flex-col space-y-2">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${
                index === currentReelIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Comments Modal - Temporarily disabled */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full h-2/3 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              <button 
                onClick={() => setShowComments(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600">Comments feature coming soon...</p>
          </div>
        </div>
      )}
    </div>
  )
}
