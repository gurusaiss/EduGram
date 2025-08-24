export interface User {
  id: string
  name: string
  college: string
  branch: string
  year: string
  skills: string[]
  interests: string[]
}

export interface Reel {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  category: string
  tags: string[]
  likes: number
  isLiked: boolean
  isBookmarked: boolean
  comments?: number
}

export interface Flashcard {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  isBookmarked: boolean
}

export interface College {
  id: string
  name: string
  location: string
}

export interface Branch {
  code: string
  name: string
}
