'use client'

import { useState, useRef, useEffect } from 'react'
import { Reel } from '../types'
import { X, Play, Pause, Heart, Bookmark, Share2, Volume2, VolumeX } from 'lucide-react'

interface ReelModalProps {
  reel: Reel
  onClose: () => void
  onLike: (reelId: string) => void
  onBookmark: (reelId: string) => void
  onShare: (reel: Reel) => void
}

export default function ReelModal({ reel, onClose, onLike, onBookmark, onShare }: ReelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-black rounded-2xl overflow-hidden max-w-md w-full max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Video Container */}
        <div className="relative aspect-[9/16]">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />

          {/* Play/Pause Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            {!isPlaying && (
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute top-4 left-4">
            <button
              onClick={toggleMute}
              className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-70 transition-all duration-200"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Side Actions */}
          <div className="absolute bottom-20 right-4 flex flex-col space-y-4">
            <button
              onClick={() => onLike(reel.id)}
              className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-70 transition-all duration-200 flex flex-col items-center"
            >
              <Heart 
                className={`w-6 h-6 ${reel.isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
              />
              <span className="text-white text-xs mt-1">{reel.likes}</span>
            </button>
            
            <button
              onClick={() => onBookmark(reel.id)}
              className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-70 transition-all duration-200"
            >
              <Bookmark 
                className={`w-6 h-6 ${reel.isBookmarked ? 'text-yellow-500 fill-current' : 'text-white'}`} 
              />
            </button>
            
            <button
              onClick={() => onShare(reel)}
              className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-70 transition-all duration-200"
            >
              <Share2 className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-6 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0">
          <h3 className="text-white font-bold text-lg mb-2">
            {reel.title}
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            {reel.description}
          </p>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {reel.category}
            </span>
            {reel.tags.map(tag => (
              <span key={tag} className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
