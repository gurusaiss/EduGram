'use client'

import { useState } from 'react'
import { X, Heart, Send } from 'lucide-react'

interface Comment {
  id: string
  user: string
  text: string
  likes: number
  isLiked: boolean
  timestamp: string
}

interface CommentsModalProps {
  reelId: string
  onClose: () => void
  onComment: (reelId: string, comment: string) => void
}

export default function CommentsModal({ reelId, onClose, onComment }: CommentsModalProps) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'sarah_learns',
      text: 'This is so helpful! Thanks for sharing 🙌',
      likes: 12,
      isLiked: false,
      timestamp: '2h'
    },
    {
      id: '2',
      user: 'study_buddy',
      text: 'Can you make more videos on this topic?',
      likes: 8,
      isLiked: true,
      timestamp: '1h'
    },
    {
      id: '3',
      user: 'tech_student',
      text: 'Amazing explanation! 💯',
      likes: 5,
      isLiked: false,
      timestamp: '30m'
    }
  ])

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'you',
        text: newComment,
        likes: 0,
        isLiked: false,
        timestamp: 'now'
      }
      setComments(prev => [comment, ...prev])
      onComment(reelId, newComment)
      setNewComment('')
    }
  }

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full md:w-96 md:max-w-md h-[70vh] md:h-[80vh] md:rounded-t-2xl rounded-t-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comments</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Be the first to comment!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {comment.user[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {comment.user}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 text-sm mb-2">
                    {comment.text}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart 
                        className={`w-4 h-4 ${comment.isLiked ? 'text-red-500 fill-current' : ''}`} 
                      />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                    <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Y</span>
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              />
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="p-2 text-purple-600 hover:text-purple-700 disabled:text-gray-400 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
