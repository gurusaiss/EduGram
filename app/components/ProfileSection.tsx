'use client'

import React, { useState } from 'react'
import { User } from '../types'

interface ProfileSectionProps {
  user: User
  totalScore: number
  studiedCards: number
  watchedReels: number
  joinedGroups: number
  onLogout: () => void
  onUpdateUser: (updatedUser: User) => void
}

export default function ProfileSection({ user, totalScore, studiedCards, watchedReels, joinedGroups, onLogout, onUpdateUser }: ProfileSectionProps) {
  const [profileActiveTab, setProfileActiveTab] = useState('overview')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedUser, setEditedUser] = useState<User>(user)
  const [showShareModal, setShowShareModal] = useState(false)

  // Dynamic user achievements based on actual progress
  const userAchievements = [
    { id: 1, title: 'Early Adopter', description: 'Joined EduGram in first month', icon: '⭐', date: '2024-01-15', unlocked: true },
    { id: 2, title: 'Study Streak', description: 'Used flashcards for 7 days straight', icon: '📚', date: studiedCards >= 7 ? '2024-01-20' : null, unlocked: studiedCards >= 7 },
    { id: 3, title: 'Content Consumer', description: `Watched ${watchedReels >= 50 ? '50+' : watchedReels} educational reels`, icon: '👁️', date: watchedReels >= 50 ? '2024-01-25' : null, unlocked: watchedReels >= 50 },
    { id: 4, title: 'Community Builder', description: `Joined ${joinedGroups} college groups`, icon: '👥', date: joinedGroups >= 3 ? '2024-02-01' : null, unlocked: joinedGroups >= 3 },
    { id: 5, title: 'Knowledge Seeker', description: `Completed ${studiedCards} flashcards`, icon: '🏆', date: studiedCards >= 100 ? '2024-02-10' : null, unlocked: studiedCards >= 100 }
  ]

  const userActivity = [
    { id: 1, type: 'flashcard', title: `Completed ${studiedCards} React flashcards`, time: '2 hours ago', score: studiedCards > 0 ? 85 : 0 },
    { id: 2, type: 'reel', title: `Watched ${watchedReels} educational reels`, time: '5 hours ago', engagement: 'liked' },
    { id: 3, type: 'group', title: 'Joined Andhra University group', time: '1 day ago', status: 'verified' },
    { id: 4, type: 'achievement', title: 'Completed profile setup', time: '2 days ago', badge: '+100 pts' },
    ...(studiedCards >= 7 ? [{ id: 5, type: 'achievement', title: 'Unlocked "Study Streak" badge', time: '3 days ago', badge: '📚' }] : [])
  ]

  const handleEditProfile = () => {
    setIsEditingProfile(true)
  }

  const handleSaveProfile = () => {
    onUpdateUser(editedUser)
    setIsEditingProfile(false)
  }

  const handleCancelEdit = () => {
    setEditedUser(user)
    setIsEditingProfile(false)
  }

  const handleShare = async () => {
    const shareData = {
      title: `${user.name}'s EduGram Profile`,
      text: `Check out ${user.name}'s learning journey on EduGram! 🎓\n\nCollege: ${user.college}\nBranch: ${user.branch}\nYear: ${user.year}\n\nTotal Score: ${totalScore} points\nCards Studied: ${studiedCards}\nReels Watched: ${watchedReels}\nGroups Joined: ${joinedGroups}`,
      url: window.location.href
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`)
        alert('Profile details copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Final fallback
      const textToShare = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
      try {
        await navigator.clipboard.writeText(textToShare)
        alert('Profile details copied to clipboard!')
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError)
        alert('Unable to share. Please copy the URL manually.')
      }
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return '📚'
      case 'reel': return '🎬'
      case 'group': return '👥'
      case 'achievement': return '🏆'
      default: return '📝'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'flashcard': return 'from-blue-500 to-blue-600'
      case 'reel': return 'from-purple-500 to-purple-600'
      case 'group': return 'from-green-500 to-green-600'
      case 'achievement': return 'from-yellow-500 to-yellow-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Profile Header - Instagram Style */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 lg:p-8 mb-8 border border-white/20">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl lg:text-4xl font-bold shadow-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Rank #5
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <div className="flex gap-2 mt-2 lg:mt-0">
                  <button
                    onClick={handleEditProfile}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
                  >
                    Share
                  </button>
                </div>
              </div>
              
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="text-lg">{user.college}</p>
                <p>{user.branch} • {user.year} Year</p>
                <p className="text-sm mt-2">{user.bio}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-3 lg:p-4 text-center shadow-lg">
              <div className="text-xl lg:text-2xl font-bold">{studiedCards}</div>
              <div className="text-xs opacity-90">Cards Studied</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-3 lg:p-4 text-center shadow-lg">
              <div className="text-xl lg:text-2xl font-bold">{watchedReels}</div>
              <div className="text-xs opacity-90">Reels Watched</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-3 lg:p-4 text-center shadow-lg">
              <div className="text-xl lg:text-2xl font-bold">{joinedGroups}</div>
              <div className="text-xs opacity-90">Groups Joined</div>
            </div>
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 lg:p-6 mb-6 border border-white/20">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Interests:</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium border border-green-200 dark:border-green-700"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-2 mb-6 border border-white/20">
          <div className="flex rounded-2xl overflow-hidden">
            <button 
              onClick={() => setProfileActiveTab('overview')}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-2xl transition-all duration-200 text-sm lg:text-base ${
                profileActiveTab === 'overview' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setProfileActiveTab('achievements')}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-2xl transition-all duration-200 text-sm lg:text-base ${
                profileActiveTab === 'achievements' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Achievements
            </button>
            <button 
              onClick={() => setProfileActiveTab('activity')}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-2xl transition-all duration-200 text-sm lg:text-base ${
                profileActiveTab === 'activity' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {profileActiveTab === 'overview' && (
          <div className="space-y-6">
            {/* Learning Progress */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 lg:p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Structures</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Machine Learning</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Web Development</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">93%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '93%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Goals */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 lg:p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                Current Goals
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">Complete React Advanced Course</span>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">Master Data Structures & Algorithms</span>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">Build Full-Stack Project</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {profileActiveTab === 'achievements' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏆 Your Achievements</h3>
            {userAchievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 lg:p-6 border border-white/20 ${
                  achievement.unlocked ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-2xl lg:text-3xl mr-4 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Unlocked on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                    {!achievement.unlocked && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        🔒 Not unlocked yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {profileActiveTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Recent Activity</h3>
            {userActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 lg:p-6 border border-white/20"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r ${getActivityColor(activity.type)} flex items-center justify-center text-lg lg:text-xl mr-4`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {activity.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>{activity.time}</span>
                      {activity.score && (
                        <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                          Score: {activity.score}%
                        </span>
                      )}
                      {activity.engagement && (
                        <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                          {activity.engagement}
                        </span>
                      )}
                      {activity.status && (
                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                          {activity.status}
                        </span>
                      )}
                      {activity.badge && (
                        <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-xs">
                          {activity.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
