<template>
  <div class="min-h-screen bg-gray-100 font-mono">
    
    <!-- Profile Header -->
    <div class="bg-white border-b-2 border-black">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <!-- Cover Photo -->
        <div class="relative mb-6">
          <div 
            class="w-full h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg border-2 border-black flex items-center justify-center cursor-pointer group"
            @click="uploadCoverPhoto"
          >
            <div v-if="!coverPhoto" class="text-center text-white">
              <div class="text-3xl mb-2">📷</div>
              <p class="font-semibold">Add Cover Photo</p>
            </div>
            <img 
              v-else
              :src="coverPhoto" 
              alt="Cover photo"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <!-- Profile Picture -->
          <div class="absolute -bottom-12 left-6">
            <div class="relative">
              <div 
                class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer group"
                @click="uploadProfilePhoto"
              >
                <div v-if="!profilePhoto" class="text-white text-2xl font-bold">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <img 
                  v-else
                  :src="profilePhoto" 
                  alt="Profile photo"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
              <!-- Camera icon overlay -->
              <div class="absolute bottom-0 right-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs border-2 border-white">
                📷
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="pt-16 pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold mb-2">{{ user.name }}</h1>
              <p class="text-gray-600 mb-2">@{{ user.username }}</p>
              <p class="text-gray-700 max-w-md">{{ user.bio }}</p>
              
              <!-- Profile Stats -->
              <div class="flex gap-6 mt-4">
                <div class="text-center">
                  <div class="font-bold text-xl">{{ user.posts }}</div>
                  <div class="text-sm text-gray-600">Posts</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-xl">{{ user.followers }}</div>
                  <div class="text-sm text-gray-600">Followers</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-xl">{{ user.following }}</div>
                  <div class="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button 
                v-if="isOwnProfile"
                @click="editProfile"
                class="px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200 font-semibold"
              >
                Edit Profile
              </button>
              <button 
                v-else
                @click="toggleFollow"
                class="px-6 py-2 rounded-full font-semibold transition-all duration-200"
                :class="isFollowing ? 
                  'bg-gray-200 border-2 border-gray-300 hover:bg-gray-300' : 
                  'bg-black text-white border-2 border-black hover:bg-white hover:text-black'"
              >
                {{ isFollowing ? 'Following' : 'Follow' }}
              </button>
              <button class="p-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200">
                💬
              </button>
              <button class="p-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200">
                ⋯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Navigation Tabs -->
      <div class="flex gap-8 mb-8 border-b-2 border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="pb-4 px-2 font-semibold transition-all duration-200"
          :class="activeTab === tab.id ? 
            'border-b-2 border-black text-black' : 
            'text-gray-600 hover:text-black'"
        >
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>

      <!-- Posts Grid -->
      <div v-if="activeTab === 'posts'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="post in userPosts" 
          :key="post.id"
          class="bg-white rounded-lg border-2 border-black overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
          @click="openPost(post)"
        >
          <!-- Post Image -->
          <div v-if="post.image" class="aspect-square bg-gray-200">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div v-else class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div class="text-4xl">📝</div>
          </div>
          
          <!-- Post Info -->
          <div class="p-4">
            <h3 class="font-bold mb-2 line-clamp-2">{{ post.title }}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ post.excerpt }}</p>
            
            <!-- Post Stats -->
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ formatDate(post.date) }}</span>
              <div class="flex gap-3">
                <span>❤️ {{ post.likes }}</span>
                <span>💬 {{ post.comments }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="userPosts.length === 0" class="col-span-full text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-bold mb-2">No posts yet</h3>
          <p class="text-gray-600 mb-4">
            {{ isOwnProfile ? "Share your first post!" : "This user hasn't posted anything yet." }}
          </p>
          <button 
            v-if="isOwnProfile"
            @click="createPost"
            class="bg-black text-white px-6 py-2 rounded-full border-2 border-black hover:bg-white hover:text-black transition-all duration-200 font-semibold"
          >
            Create Post
          </button>
        </div>
      </div>

      <!-- Likes Tab -->
      <div v-else-if="activeTab === 'likes'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="post in likedPosts" 
          :key="post.id"
          class="bg-white rounded-lg border-2 border-black overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
          @click="openPost(post)"
        >
          <div class="flex">
            <div v-if="post.image" class="w-20 h-20 bg-gray-200">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 p-4">
              <h3 class="font-bold mb-1 line-clamp-1">{{ post.title }}</h3>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ post.excerpt }}</p>
              <div class="text-xs text-gray-500">
                by {{ post.author }} • {{ formatDate(post.date) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State for Likes -->
        <div v-if="likedPosts.length === 0" class="col-span-full text-center py-12">
          <div class="text-6xl mb-4">❤️</div>
          <h3 class="text-xl font-bold mb-2">No liked posts yet</h3>
          <p class="text-gray-600 mb-4">
            {{ isOwnProfile ? "Posts you like will appear here!" : "This user hasn't liked any posts yet." }}
          </p>
        </div>
      </div>

      <!-- About Tab -->
      <div v-else-if="activeTab === 'about'" class="max-w-2xl">
        <div class="bg-white rounded-lg border-2 border-black p-6">
          <h2 class="text-xl font-bold mb-4">About {{ user.name }}</h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold mb-2">Bio</h3>
              <p class="text-gray-700">{{ user.bio || 'No bio available.' }}</p>
            </div>
            
            <div>
              <h3 class="font-semibold mb-2">Joined</h3>
              <p class="text-gray-700">{{ formatDate(user.joinDate) }}</p>
            </div>
            
            <div v-if="user.location">
              <h3 class="font-semibold mb-2">Location</h3>
              <p class="text-gray-700">📍 {{ user.location }}</p>
            </div>
            
            <div v-if="user.website">
              <h3 class="font-semibold mb-2">Website</h3>
              <a :href="user.website" class="text-blue-600 hover:underline">🔗 {{ user.website }}</a>
            </div>
            
            <div>
              <h3 class="font-semibold mb-2">Interests</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="interest in user.interests" 
                  :key="interest"
                  class="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm"
                >
                  {{ interest }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden File Inputs -->
    <input 
      ref="coverPhotoInput"
      type="file" 
      accept="image/*" 
      @change="handleCoverPhotoUpload"
      class="hidden"
    />
    <input 
      ref="profilePhotoInput"
      type="file" 
      accept="image/*" 
      @change="handleProfilePhotoUpload"
      class="hidden"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../auth/Navbar.vue'

// Route and router
const route = useRoute()
const router = useRouter()

// Reactive data
const activeTab = ref('posts')
const coverPhoto = ref(null)
const profilePhoto = ref(null)
const coverPhotoInput = ref(null)
const profilePhotoInput = ref(null)
const isFollowing = ref(false)

// Tabs configuration
const tabs = [
  { id: 'posts', name: 'Posts', icon: '📝' },
  { id: 'likes', name: 'Likes', icon: '❤️' },
  { id: 'about', name: 'About', icon: 'ℹ️' }
]

// Sample user data (in real app, this would come from API)
const user = ref({
  id: 1,
  name: 'ntdinh2005',
  username: 'ntdinh2005',
  bio: 'Passionate developer and blogger. Love coding, gaming, and sharing knowledge with the community. Always learning something new! 🚀',
  posts: 0,
  followers: 1247,
  following: 189,
  joinDate: '2023-01-15',
  location: 'Vietnam',
  website: 'https://ntdinh.dev',
  interests: ['Vue.js', 'JavaScript', 'Gaming', 'Photography', 'Travel']
})

// Sample posts data
const userPosts = ref([])

// Sample liked posts
const likedPosts = ref([])

// Computed properties
const isOwnProfile = computed(() => {
  // In real app, compare with current user ID
  return route.params.username === 'ntdinh2005' || !route.params.username
})

// Methods
const uploadCoverPhoto = () => {
  coverPhotoInput.value?.click()
}

const uploadProfilePhoto = () => {
  profilePhotoInput.value?.click()
}

const handleCoverPhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      coverPhoto.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleProfilePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePhoto.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const editProfile = () => {
  router.push('/profile/edit')
}

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  // In real app, make API call to follow/unfollow
}

const createPost = () => {
  router.push('/create')
}

const openPost = (post) => {
  router.push(`/post/${post.id}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  // In real app, fetch user data based on route.params.username
  console.log('Profile page loaded for:', route.params.username || 'current user')
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
