'use client'

import React, { useState } from 'react'
import { User } from '../types'
import { VIZAG_COLLEGES, BRANCHES, YEARS, SKILLS, INTERESTS } from '../data/constants'
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ProfileSetupProps {
  onComplete: (user: User) => void
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '',
    year: '',
    skills: [] as string[],
    interests: [] as string[]
  })

  const collegeOptions = VIZAG_COLLEGES.map(college => ({
    value: college.name,
    label: `${college.name} - ${college.location}`
  }))

  const branchOptions = BRANCHES.map(branch => ({
    value: branch.code,
    label: `${branch.code} - ${branch.name}`
  }))

  const yearOptions = YEARS.map(year => ({
    value: year,
    label: year
  }))

  const skillOptions = SKILLS.map(skill => ({
    value: skill,
    label: skill
  }))

  const interestOptions = INTERESTS.map(interest => ({
    value: interest,
    label: interest
  }))

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 1 && formData.name && formData.college && formData.branch && formData.year) {
      setStep(2)
    }
  }

  const handleComplete = () => {
    if (formData.skills.length > 0 && formData.interests.length > 0) {
      const user: User = {
        id: Date.now().toString(),
        name: formData.name,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        skills: formData.skills,
        interests: formData.interests,
        bio: `${formData.year} year ${formData.branch} student at ${formData.college}. Passionate about ${formData.interests.slice(0, 2).join(' and ')}.`
      }
      onComplete(user)
    }
  }

  const isStep1Valid = formData.name && formData.college && formData.branch && formData.year
  const isStep2Valid = formData.skills.length > 0 && formData.interests.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Step {step} of 2
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                College
              </label>
              <Select
                options={collegeOptions}
                value={collegeOptions.find(option => option.value === formData.college)}
                onChange={(option) => handleInputChange('college', option?.value || '')}
                placeholder="Select your college"
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    '&:hover': { border: '1px solid #8b5cf6' }
                  })
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Branch
              </label>
              <Select
                options={branchOptions}
                value={branchOptions.find(option => option.value === formData.branch)}
                onChange={(option) => handleInputChange('branch', option?.value || '')}
                placeholder="Select your branch"
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    '&:hover': { border: '1px solid #8b5cf6' }
                  })
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <Select
                options={yearOptions}
                value={yearOptions.find(option => option.value === formData.year)}
                onChange={(option) => handleInputChange('year', option?.value || '')}
                placeholder="Select your year"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    '&:hover': { border: '1px solid #8b5cf6' }
                  })
                }}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Next: Skills & Interests</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills (Select multiple)
              </label>
              <Select
                isMulti
                options={skillOptions}
                value={skillOptions.filter(option => formData.skills.includes(option.value))}
                onChange={(options) => handleInputChange('skills', options ? options.map(opt => opt.value) : [])}
                placeholder="Select your skills"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    '&:hover': { border: '1px solid #8b5cf6' }
                  })
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interests (Select multiple)
              </label>
              <Select
                isMulti
                options={interestOptions}
                value={interestOptions.filter(option => formData.interests.includes(option.value))}
                onChange={(options) => handleInputChange('interests', options ? options.map(opt => opt.value) : [])}
                placeholder="Select your interests"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    '&:hover': { border: '1px solid #8b5cf6' }
                  })
                }}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleComplete}
                disabled={!isStep2Valid}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
