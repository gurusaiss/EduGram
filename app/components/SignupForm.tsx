'use client'

import { useState } from 'react'
import { User } from '../types'
import { colleges, BRANCHES, YEARS, VIZAG_COLLEGES } from '../data/constants'
import Select from 'react-select'

interface SignupFormProps {
  onComplete: (user: User) => void
}

export default function SignupForm({ onComplete }: SignupFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '',
    year: ''
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 1 && formData.name && formData.college && formData.branch && formData.year) {
      setStep(2)
    }
  }

  const isStep1Valid = formData.name && formData.college && formData.branch && formData.year

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to EduW
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Let's set up your profile
          </p>
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                    '&:hover': { border: '1px solid #3b82f6' }
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
                    '&:hover': { border: '1px solid #3b82f6' }
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
                    '&:hover': { border: '1px solid #3b82f6' }
                  })
                }}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Next: Skills & Interests
            </button>
          </div>
        )}

        {step === 2 && (
          <SkillsInterestsStep 
            formData={formData}
            onComplete={onComplete}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  )
}

interface SkillsInterestsStepProps {
  formData: any
  onComplete: (user: User) => void
  onBack: () => void
}

function SkillsInterestsStep({ formData, onComplete, onBack }: SkillsInterestsStepProps) {
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])

  const { SKILLS, INTERESTS } = require('../data/constants')

  const skillOptions = SKILLS.map((skill: string) => ({
    value: skill,
    label: skill
  }))

  const interestOptions = INTERESTS.map((interest: string) => ({
    value: interest,
    label: interest
  }))

  const handleComplete = () => {
    if (skills.length > 0 && interests.length > 0) {
      const user: User = {
        id: Date.now().toString(),
        name: formData.name,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        skills,
        interests
      }
      onComplete(user)
    }
  }

  const isValid = skills.length > 0 && interests.length > 0

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills (Select multiple)
        </label>
        <Select
          isMulti
          options={skillOptions}
          value={skillOptions.filter(option => skills.includes(option.value))}
          onChange={(options) => setSkills(options ? options.map(opt => opt.value) : [])}
          placeholder="Select your skills"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '48px',
              border: '1px solid #d1d5db',
              '&:hover': { border: '1px solid #3b82f6' }
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
          value={interestOptions.filter(option => interests.includes(option.value))}
          onChange={(options) => setInterests(options ? options.map(opt => opt.value) : [])}
          placeholder="Select your interests"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '48px',
              border: '1px solid #d1d5db',
              '&:hover': { border: '1px solid #3b82f6' }
            })
          }}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Back
        </button>
        <button
          onClick={handleComplete}
          disabled={!isValid}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Complete Setup
        </button>
      </div>
    </div>
  )
}
