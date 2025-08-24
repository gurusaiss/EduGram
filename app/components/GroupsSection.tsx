'use client'

import React, { useState } from 'react'
import { Search, Users, Shield, Clock, X, Upload, CheckCircle, AlertCircle, Building2, UserCheck, Globe } from 'lucide-react'
import { User } from '../types'

interface GroupsSectionProps {
  user: User
}

export default function GroupsSection({ user }: GroupsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [verificationData, setVerificationData] = useState({
    fullName: '',
    studentId: '',
    collegeName: '',
    idCard: null as File | null
  })
  const [joinedGroups, setJoinedGroups] = useState<string[]>(['global-community'])

  // Comprehensive college list - Visakhapatnam, IITs, NITs
  const allColleges = [
    // Visakhapatnam Colleges
    { id: 'andhra-university', name: 'Andhra University', location: 'Visakhapatnam', members: 2847, type: 'University' },
    { id: 'gitam-university', name: 'GITAM University', location: 'Visakhapatnam', members: 3241, type: 'University' },
    { id: 'gvpce', name: 'GVPCE(A)', location: 'Visakhapatnam', members: 1523, type: 'Engineering' },
    { id: 'mvgr-college', name: 'MVGR College of Engineering', location: 'Visakhapatnam', members: 1876, type: 'Engineering' },
    { id: 'vignan-university', name: 'Vignan University', location: 'Visakhapatnam', members: 2134, type: 'University' },
    { id: 'dadi-institute', name: 'Dadi Institute of Engineering', location: 'Visakhapatnam', members: 987, type: 'Engineering' },
    { id: 'anil-neerukonda', name: 'Anil Neerukonda Institute', location: 'Visakhapatnam', members: 1456, type: 'Engineering' },
    { id: 'raghu-engineering', name: 'Raghu Engineering College', location: 'Visakhapatnam', members: 1234, type: 'Engineering' },
    
    // IITs
    { id: 'iit-bombay', name: 'IIT Bombay', location: 'Mumbai', members: 4521, type: 'IIT' },
    { id: 'iit-delhi', name: 'IIT Delhi', location: 'New Delhi', members: 4234, type: 'IIT' },
    { id: 'iit-madras', name: 'IIT Madras', location: 'Chennai', members: 4156, type: 'IIT' },
    { id: 'iit-kanpur', name: 'IIT Kanpur', location: 'Kanpur', members: 3987, type: 'IIT' },
    { id: 'iit-kharagpur', name: 'IIT Kharagpur', location: 'Kharagpur', members: 4087, type: 'IIT' },
    { id: 'iit-roorkee', name: 'IIT Roorkee', location: 'Roorkee', members: 3654, type: 'IIT' },
    { id: 'iit-guwahati', name: 'IIT Guwahati', location: 'Guwahati', members: 3456, type: 'IIT' },
    { id: 'iit-hyderabad', name: 'IIT Hyderabad', location: 'Hyderabad', members: 3234, type: 'IIT' },
    { id: 'iit-indore', name: 'IIT Indore', location: 'Indore', members: 2987, type: 'IIT' },
    { id: 'iit-bhubaneswar', name: 'IIT Bhubaneswar', location: 'Bhubaneswar', members: 2876, type: 'IIT' },
    
    // NITs
    { id: 'nit-trichy', name: 'NIT Tiruchirappalli', location: 'Tiruchirappalli', members: 3876, type: 'NIT' },
    { id: 'nit-warangal', name: 'NIT Warangal', location: 'Warangal', members: 3654, type: 'NIT' },
    { id: 'nit-surathkal', name: 'NIT Karnataka', location: 'Surathkal', members: 3456, type: 'NIT' },
    { id: 'nit-rourkela', name: 'NIT Rourkela', location: 'Rourkela', members: 3234, type: 'NIT' },
    { id: 'nit-calicut', name: 'NIT Calicut', location: 'Calicut', members: 3123, type: 'NIT' },
    { id: 'nit-durgapur', name: 'NIT Durgapur', location: 'Durgapur', members: 2987, type: 'NIT' },
    { id: 'nit-jamshedpur', name: 'NIT Jamshedpur', location: 'Jamshedpur', members: 2876, type: 'NIT' },
    { id: 'nit-kurukshetra', name: 'NIT Kurukshetra', location: 'Kurukshetra', members: 2765, type: 'NIT' },
    { id: 'nit-allahabad', name: 'NIT Allahabad', location: 'Prayagraj', members: 2654, type: 'NIT' },
    { id: 'nit-bhopal', name: 'NIT Bhopal', location: 'Bhopal', members: 2543, type: 'NIT' }
  ]

  // Top 5 featured colleges for default display
  const topColleges = allColleges.slice(0, 5)

  const globalGroup = {
    id: 'global-community',
    name: 'Global Student Community',
    description: 'Connect with students worldwide',
    members: 15847,
    isPrivate: false
  }

  const handleJoinGroup = (group: any) => {
    if (group.id === 'global-community') {
      setJoinedGroups(prev => [...prev, group.id])
      return
    }
    setSelectedGroup(group)
    setShowVerificationModal(true)
  }

  const handleVerificationSubmit = () => {
    if (!selectedGroup) return
    
    const { fullName, studentId, collegeName, idCard } = verificationData
    const nameMatch = fullName.toLowerCase().includes(user.name.toLowerCase())
    const collegeMatch = collegeName.toLowerCase().includes(selectedGroup.name.toLowerCase())
    
    if (nameMatch && collegeMatch && idCard && studentId) {
      setJoinedGroups(prev => [...prev, selectedGroup.id])
      setShowVerificationModal(false)
      setVerificationData({ fullName: '', studentId: '', collegeName: '', idCard: null })
      alert(`✅ Verification successful! Welcome to ${selectedGroup.name} group.`)
    } else {
      alert('❌ Verification failed. Please check your details.')
    }
  }

  const isGroupJoined = (groupId: string) => joinedGroups.includes(groupId)

  const filteredGroups = searchTerm 
    ? allColleges.filter(group => 
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : topColleges

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto pb-20">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Communities</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with your college peers and join the global student community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">College Groups</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{joinedGroups.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Joined Groups</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Globe className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Global Community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your college or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Global Community */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-1 rounded-xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Globe className="w-6 h-6 text-purple-500 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{globalGroup.name}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{globalGroup.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    {globalGroup.members.toLocaleString()} members
                  </div>
                </div>
                <button
                  onClick={() => handleJoinGroup(globalGroup)}
                  disabled={isGroupJoined(globalGroup.id)}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                    isGroupJoined(globalGroup.id)
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {isGroupJoined(globalGroup.id) ? 'Joined' : 'Join Group'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* College Groups */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-blue-500" />
            College Groups
            {!searchTerm && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(Top 5 - Search for more)</span>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mr-2">{group.name}</h3>
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{group.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.members.toLocaleString()}
                    </span>
                    <span className="flex items-center text-orange-600 dark:text-orange-400">
                      <Shield className="w-4 h-4 mr-1" />
                      Private
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Rules:</span> Verify with college ID
                  </div>
                  <button
                    onClick={() => handleJoinGroup(group)}
                    disabled={isGroupJoined(group.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                      isGroupJoined(group.id)
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {isGroupJoined(group.id) ? 'Joined' : 'Join Group'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Modal */}
        {showVerificationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-6 pt-12">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Join {selectedGroup?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Verification required for college groups
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name (as on ID card)
                    </label>
                    <input
                      type="text"
                      value={verificationData.fullName}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={verificationData.studentId}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, studentId: e.target.value }))}
                      placeholder="Enter your student ID"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      College Name (as on ID card)
                    </label>
                    <input
                      type="text"
                      value={verificationData.collegeName}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, collegeName: e.target.value }))}
                      placeholder="Enter college name exactly as on ID"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload College ID Card
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          setVerificationData(prev => ({ ...prev, idCard: file }))
                        }}
                        className="hidden"
                        id="id-card-upload"
                      />
                      <label htmlFor="id-card-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {verificationData.idCard ? verificationData.idCard.name : 'Click to upload ID card (JPG, PNG)'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Max size: 5MB</p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerificationSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify & Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
