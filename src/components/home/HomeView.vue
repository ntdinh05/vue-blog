<template>
  <div class="min-h-screen bg-gray-100 font-mono">
    <!-- Welcome Section -->
    <div class="bg-white border-b-2 border-black p-4">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold">Welcome back to OnlyBlogs! 👋</h1>
        <p class="text-gray-600">Share your thoughts and connect with the community</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto py-8 px-4">
      <!-- Create Post Section (Enhanced for logged-in users) -->
      <div class="bg-white rounded-lg border-2 border-black mb-6 p-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-black flex items-center justify-center text-white font-bold">
            U
          </div>
          <input 
            type="text" 
            placeholder="What's on your mind?" 
            class="flex-1 border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <!-- Enhanced posting options -->
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <button class="text-sm px-3 py-1 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
              📸 Photo
            </button>
            <button class="text-sm px-3 py-1 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
              📝 Article
            </button>
            <button class="text-sm px-3 py-1 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
              🎵 Music
            </button>
            <button class="text-sm px-3 py-1 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
              📍 Location
            </button>
          </div>
          <button class="bg-purple-600 text-white px-6 py-2 rounded-full border-2 border-black hover:bg-purple-700 transition-colors font-semibold">
            Publish
          </button>
        </div>
      </div>

      <!-- Your Recent Posts Section -->
      <div class="bg-white rounded-lg border-2 border-black mb-6 p-4">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          📝 Your Recent Posts
        </h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <h3 class="font-semibold">My Vue.js Journey</h3>
              <p class="text-sm text-gray-600">Published 2 days ago • 45 likes • 12 comments</p>
            </div>
            <button class="text-sm px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100">
              Edit
            </button>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <h3 class="font-semibold">Tips for Better Code</h3>
              <p class="text-sm text-gray-600">Published 1 week ago • 128 likes • 34 comments</p>
            </div>
            <button class="text-sm px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100">
              Edit
            </button>
          </div>
        </div>
      </div>

      <!-- Following Feed -->
      <div class="space-y-6">
        <h2 class="text-xl font-bold flex items-center gap-2">
          📰 Latest from your network
        </h2>

        <!-- Using Universal Post Component -->
        <Post 
          v-for="post in feedPosts" 
          :key="post.id"
          :post="post"
          :show-engagement="true"
          :show-actions="true"
          :comment-placeholder="'Write a comment...'"
          @author-click="handleAuthorClick"
          @post-click="handlePostClick"
          @image-click="handleImageClick"
          @like="handleLike"
          @comment="handleComment"
          @share="handleShare"
          @new-comment="handleNewComment"
          @read-more="handleReadMore"
        />
      </div>

      <!-- Load More Button -->
      <div class="text-center mt-8">
        <button class="bg-purple-600 text-white px-8 py-3 rounded-full border-2 border-black hover:bg-purple-700 transition-colors font-bold">
          Load more posts
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Post from '../posts/Post.vue'

// Sample feed data
const feedPosts = ref([
  {
    id: 1,
    author: 'alice_codes',
    title: 'Just deployed my first full-stack app! 🚀',
    content: 'After months of learning, I finally launched my portfolio website! Built with Vue.js, Node.js, and MongoDB. Thanks to everyone who helped me along the way! Check it out and let me know what you think.',
    image: 'https://via.placeholder.com/600x300/4F46E5/ffffff?text=🚀+Full+Stack+App',
    date: '2025-07-23T15:00:00Z',
    likes: 432,
    comments: 12,
    isLiked: false,
    tags: ['vuejs', 'nodejs', 'mongodb', 'fullstack'],
    commentsList: [
      { id: 1, author: 'devmaster', text: 'Congratulations! The design looks amazing 🎉' },
      { id: 2, author: 'webdev_guru', text: 'Great work! Love the tech stack choice' },
      { id: 3, author: 'codingpro', text: 'This is inspiring! How long did it take you?' }
    ]
  },
  {
    id: 2,
    author: 'mike_designer',
    title: 'UI/UX Design Principles for 2025',
    content: 'Here are 5 essential design principles that every developer should know. Clean interfaces, accessibility, and user experience are more important than ever! Minimalism, dark mode support, micro-interactions, inclusive design, and performance optimization are key trends this year.',
    image: null,
    date: '2025-07-23T09:00:00Z',
    likes: 789,
    comments: 45,
    isLiked: true,
    tags: ['design', 'ux', 'ui', 'principles'],
    commentsList: [
      { id: 1, author: 'designer_jane', text: 'Love these tips! Especially the accessibility focus' },
      { id: 2, author: 'frontend_dev', text: 'Great points about dark mode implementation' }
    ]
  },
  {
    id: 3,
    author: 'tech_blogger',
    title: 'The Future of JavaScript Frameworks',
    content: 'Vue 4, React 19, and the evolution of web development. What should we expect in the coming years? Performance improvements, better developer experience, and more powerful tooling are on the horizon.',
    image: 'https://via.placeholder.com/600x300/F59E0B/ffffff?text=JS+Frameworks+2025',
    date: '2025-07-22T14:30:00Z',
    likes: 156,
    comments: 28,
    isLiked: false,
    tags: ['javascript', 'frameworks', 'vue', 'react'],
    commentsList: [
      { id: 1, author: 'js_expert', text: 'Excited for Vue 4! The composition API improvements look promising' }
    ]
  }
])

// Event handlers
const handleAuthorClick = (author) => {
  console.log('Navigate to profile:', author)
  // router.push(`/profile/${author}`)
}

const handlePostClick = (post) => {
  console.log('Navigate to post:', post.id)
  // router.push(`/post/${post.id}`)
}

const handleImageClick = (image) => {
  console.log('Open image modal:', image)
  // Open image in modal/lightbox
}

const handleLike = (post) => {
  console.log('Toggle like for post:', post.id)
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? 1 : -1
}

const handleComment = (post) => {
  console.log('Focus comment input for post:', post.id)
  // Focus comment input or scroll to comments
}

const handleShare = (post) => {
  console.log('Share post:', post.id)
  // Open share dialog or copy link
}

const handleNewComment = ({ post, comment }) => {
  console.log('New comment on post:', post.id, 'Comment:', comment)
  // Add comment to post.commentsList
  const newComment = {
    id: Date.now(),
    author: 'current_user', // Replace with actual current user
    text: comment
  }
  post.commentsList.push(newComment)
  post.comments = post.commentsList.length
}

const handleReadMore = (post) => {
  console.log('Read more for post:', post.id)
  // Navigate to full post view
}
</script>

<style scoped>
/* Additional custom styles */
</style>