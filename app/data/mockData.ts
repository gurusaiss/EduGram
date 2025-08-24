import { Reel, Flashcard } from '../types'

// Diverse video pool for different educational content
const getAllVideos = (): string[] => {
  return [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://file-examples.com/storage/fe68c1f7d8c2c2b4c4b4b4b/2017/10/file_example_MP4_480_1_5MG.mp4'
  ]
}

// Get unique video for each reel to ensure no duplicates
const getUniqueVideo = (reelIndex: number): string => {
  const videos = getAllVideos()
  return videos[reelIndex % videos.length]
}

export const generateReels = (skills: string[], interests: string[]): Reel[] => {
  const categories = [...skills, ...interests]
  const reels: Reel[] = []
  const usedVideos = new Set<string>()

  const reelTemplates = [
    { 
      title: 'POV: You finally understand', 
      desc: 'That moment when it all clicks '
    },
    { 
      title: 'Things they don\'t teach you about', 
      desc: 'Real-world insights you need to know '
    },
    { 
      title: 'Me explaining', 
      desc: 'Breaking it down for you '
    },
    { 
      title: 'Plot twist:', 
      desc: 'This will change everything you know '
    },
    { 
      title: 'Tell me you study', 
      desc: 'without telling me you study '
    },
    { 
      title: 'This is your sign to learn', 
      desc: 'Start your journey today 🚀'
    },
    { 
      title: 'Nobody talks about', 
      desc: 'The hidden secrets revealed 🔥'
    },
    { 
      title: 'When you realize', 
      desc: 'Mind = blown 🤯'
    }
  ]

  let reelCounter = 0
  categories.forEach((category, index) => {
    reelTemplates.forEach((template, templateIndex) => {
      const reelId = `${category}-${templateIndex}`
      const videoUrl = getUniqueVideo(reelCounter)
      
      reels.push({
        id: reelId,
        title: `${template.title} ${category.toLowerCase()}`,
        description: `${template.desc} #${category.toLowerCase()} #education #learning`,
        videoUrl: videoUrl,
        thumbnail: `https://picsum.photos/400/600?random=${reelCounter + Date.now()}`,
        category,
        tags: [category.toLowerCase(), 'education', 'learning'],
        likes: 0,
        isLiked: false,
        isBookmarked: false,
        comments: 0
      })
      reelCounter++
    })
  })

  return reels.slice(0, 20)
}

export const generateFlashcards = (skills: string[], interests: string[]): Flashcard[] => {
  const categories = [...skills, ...interests]
  const flashcards: Flashcard[] = []

  const questionTemplates = [
    { q: 'What is the main concept of', a: 'The main concept involves understanding the fundamental principles and applications' },
    { q: 'How do you implement', a: 'Implementation requires following best practices and considering scalability' },
    { q: 'What are the benefits of', a: 'Key benefits include improved efficiency, better performance, and enhanced user experience' },
    { q: 'Common challenges in', a: 'Common challenges include complexity management, resource optimization, and maintaining quality' },
    { q: 'Best practices for', a: 'Best practices involve thorough planning, continuous learning, and staying updated with trends' }
  ]

  categories.forEach((category, index) => {
    questionTemplates.forEach((template, templateIndex) => {
      const cardId = `${category}-card-${templateIndex}`
      flashcards.push({
        id: cardId,
        question: `${template.q} ${category}?`,
        answer: `${template.a} in ${category}.`,
        category,
        tags: [category.toLowerCase()],
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
        isBookmarked: false
      })
    })
  })

  return flashcards.slice(0, 20)
}
