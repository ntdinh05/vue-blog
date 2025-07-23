<template>
  <div class="bg-white rounded-lg border-2 border-black overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <!-- Post Header -->
    <div class="p-4 border-b-2 border-black bg-gradient-to-r from-white to-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div 
            class="w-12 h-12 rounded-full border-2 border-blog-primary flex items-center justify-center text-white font-bold shadow-md"
            :class="authorAvatarClass"
          >
            {{ authorInitial }}
          </div>
          <div>
            <h3 
              class="font-bold hover:text-blog-accent cursor-pointer transition-colors"
              @click="$emit('authorClick', post.author)"
            >
              {{ post.author }}
            </h3>
            <p class="text-sm text-blog-secondary">{{ formattedDate }}</p>
          </div>
        </div>
        <button 
          v-if="showMenu"
          @click="$emit('menuClick', post)"
          class="text-xl hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          ⋯
        </button>
      </div>
    </div>

    <!-- Post Content -->
    <div class="p-4">
      <h2 
        class="text-lg font-bold mb-3 cursor-pointer hover:text-blog-accent transition-colors"
        @click="$emit('postClick', post)"
      >
        {{ post.title }}
      </h2>
      
      <!-- Post Image -->
      <div v-if="post.image" class="relative mb-4 group">
        <img 
          :src="post.image" 
          :alt="post.title"
          class="w-full h-64 object-cover rounded-lg border-2 border-black transition-transform duration-300 cursor-pointer"
          @click="$emit('imageClick', post.image)"
        />
        <!-- Image overlay for additional actions -->
        <div 
          v-if="showImageActions"
          class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all duration-300 pointer-events-none"
        ></div>
      </div>

      <!-- Post Text -->
      <p class="text-gray-700 mb-4 leading-relaxed">
        {{ truncatedContent }}
        <span 
          v-if="post.content && post.content.length > maxContentLength"
          @click="$emit('readMore', post)"
          class="text-blue-600 cursor-pointer hover:underline"
        >
          See more...
        </span>
      </p>

      <!-- Post Tags (if any) -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in post.tags" 
          :key="tag"
          class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300 hover:bg-gray-200 cursor-pointer"
          @click="$emit('tagClick', tag)"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Post Engagement -->
    <div v-if="showEngagement" class="px-4 pb-4">
      <div class="bg-gray-100 rounded-lg border-2 border-black p-3">
        <!-- Likes and Stats -->
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-black text-white px-2 py-1 rounded-full text-sm font-bold">
            {{ post.likes || 0 }} Likes
          </span>
          <span v-if="post.comments" class="text-sm text-gray-600">
            {{ post.comments }} comments
          </span>
        </div>

        <!-- Action Buttons -->
        <div v-if="showActions" class="flex items-center gap-4 mb-3">
          <button 
            @click="$emit('like', post)"
            class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors"
            :class="post.isLiked ? 
              'bg-red-100 border border-red-300 hover:bg-red-200 text-red-700' : 
              'bg-gray-100 border border-gray-300 hover:bg-gray-200'"
          >
            {{ post.isLiked ? '❤️' : '🤍' }} 
            <span class="text-sm font-semibold">Like</span>
          </button>
          <button 
            @click="$emit('comment', post)"
            class="flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-300 rounded-full hover:bg-blue-200 transition-colors"
          >
            💬 <span class="text-sm font-semibold">Comment</span>
          </button>
          <button 
            @click="$emit('share', post)"
            class="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-300 rounded-full hover:bg-green-200 transition-colors"
          >
            🔄 <span class="text-sm font-semibold">Share</span>
          </button>
        </div>

        <!-- Comments Preview -->
        <div v-if="post.commentsList && post.commentsList.length > 0" class="space-y-2 mb-3">
          <div 
            v-for="comment in displayedComments" 
            :key="comment.id"
            class="flex gap-2"
          >
            <span class="font-bold text-sm">{{ comment.author }}</span>
            <span class="text-sm">{{ comment.text }}</span>
          </div>
          <button 
            v-if="post.commentsList.length > maxCommentsToShow"
            @click="$emit('showAllComments', post)"
            class="text-gray-500 text-sm hover:underline"
          >
            See {{ post.commentsList.length - maxCommentsToShow }} more comments...
          </button>
        </div>

        <!-- Comment Input -->
        <div v-if="showCommentInput" class="flex gap-2">
          <input 
            v-model="newComment"
            type="text" 
            :placeholder="commentPlaceholder"
            class="flex-1 border-2 border-black rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blog-accent"
            @keyup.enter="submitComment"
          />
          <button 
            v-if="newComment.trim()"
            @click="submitComment"
            class="px-4 py-2 bg-blog-accent text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Props
const props = defineProps({
  post: {
    type: Object,
    required: true,
    validator: (post) => {
      return post && typeof post === 'object' && post.author && post.title
    }
  },
  showEngagement: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showMenu: {
    type: Boolean,
    default: true
  },
  showImageActions: {
    type: Boolean,
    default: true
  },
  showCommentInput: {
    type: Boolean,
    default: true
  },
  maxContentLength: {
    type: Number,
    default: 200
  },
  maxCommentsToShow: {
    type: Number,
    default: 3
  },
  commentPlaceholder: {
    type: String,
    default: 'Write a comment...'
  },
  avatarColorClass: {
    type: String,
    default: 'bg-gradient-to-br from-green-400 to-green-600'
  }
})

// Emits
const emit = defineEmits([
  'authorClick',
  'postClick', 
  'imageClick',
  'menuClick',
  'like',
  'comment',
  'share',
  'readMore',
  'tagClick',
  'showAllComments',
  'newComment'
])

// Reactive data
const newComment = ref('')

// Computed properties
const authorInitial = computed(() => {
  return props.post.author ? props.post.author.charAt(0).toUpperCase() : 'U'
})

const authorAvatarClass = computed(() => {
  return props.avatarColorClass || 'bg-gradient-to-br from-green-400 to-green-600'
})

const formattedDate = computed(() => {
  if (!props.post.date) return ''
  
  const date = new Date(props.post.date)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return 'Yesterday'
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})

const truncatedContent = computed(() => {
  if (!props.post.content) return ''
  
  if (props.post.content.length <= props.maxContentLength) {
    return props.post.content
  }
  
  return props.post.content.substring(0, props.maxContentLength) + '...'
})

const displayedComments = computed(() => {
  if (!props.post.commentsList) return []
  return props.post.commentsList.slice(0, props.maxCommentsToShow)
})

// Methods
const submitComment = () => {
  if (newComment.value.trim()) {
    emit('newComment', {
      post: props.post,
      comment: newComment.value.trim()
    })
    newComment.value = ''
  }
}
</script>

<style scoped>
/* Component-specific styles */
.blog-primary {
  color: #000000;
}

.blog-secondary {
  color: #6B7280;
}

.blog-accent {
  color: #3B82F6;
}
</style>