'use client'

import { useState } from 'react'
import { Reel } from '../types'
import { Play, Pause, Heart, Bookmark, Share2, Volume2, VolumeX } from 'lucide-react'
import ReelModal from './ReelModal'

interface ReelsSectionProps {
  reels: Reel[]
  onLike: (reelId: string) => void
  onBookmark: (reelId: string) => void
  onShare: (reel: Reel) => void
}

export default function ReelsSection({ reels, onLike, onBookmark, onShare }: ReelsSectionProps) {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null)
  const [playingReels, setPlayingReels] = useState<Set<string>>(new Set())
  const [mutedReels, setMutedReels] = useState<Set<string>>(new Set())

  const togglePlay = (reelId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setPlayingReels(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reelId)) {
        newSet.delete(reelId)
      } else {
        newSet.add(reelId)
      }
      return newSet
    })
  }

  const toggleMute = (reelId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setMutedReels(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reelId)) {
        newSet.delete(reelId)
      } else {
        newSet.add(reelId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Educational Reels
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setSelectedReel(reel)}
          >
            <div className="aspect-[9/16] relative">
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => togglePlay(reel.id, e)}
                  className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-200"
                >
                  {playingReels.has(reel.id) ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Controls */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                  onClick={(e) => toggleMute(reel.id, e)}
                  className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  {mutedReels.has(reel.id) ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-3 right-3 flex flex-col space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onLike(reel.id)
                  }}
                  className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  <Heart 
                    className={`w-4 h-4 ${reel.isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
                  />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onBookmark(reel.id)
                  }}
                  className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  <Bookmark 
                    className={`w-4 h-4 ${reel.isBookmarked ? 'text-yellow-500 fill-current' : 'text-white'}`} 
                  />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onShare(reel)
                  }}
                  className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                {reel.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-2">
                {reel.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {reel.likes} likes
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  {reel.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReel && (
        <ReelModal
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
          onLike={onLike}
          onBookmark={onBookmark}
          onShare={onShare}
        />
      )}
    </div>
  )
}
