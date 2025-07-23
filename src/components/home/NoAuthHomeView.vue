<template>
  <div class="min-h-screen bg-gray-100 font-mono">
    <!-- Main Content -->
    <div class="max-w-2xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6">
      <!-- Blog Posts Feed -->
      <div class="space-y-6">
        <!-- Post 1 -->
        <div class="bg-white rounded-lg border-2 border-blog-primary overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <!-- Post Header -->
          <div class="p-4 border-b-2 border-blog-primary bg-gradient-to-r from-white to-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-blog-primary flex items-center justify-center text-white font-bold shadow-md">
                  N
                </div>
                <div>
                  <h3 class="font-bold hover:text-blog-accent cursor-pointer transition-colors">ntdinh2005</h3>
                  <p class="text-sm text-blog-secondary">2025-07-17</p>
                </div>
              </div>
              <button class="text-xl hover:bg-gray-100 p-2 rounded-full transition-colors">⋯</button>
            </div>
          </div>

          <!-- Post Content -->
          <div class="p-4">
            <h2 class="text-lg font-bold mb-3">Anh Huy nhà tao bù lão cực căng</h2>
            
            <!-- Post Image -->
            <div class="relative mb-4 group">
              <!-- Image Display (when image exists) -->
              <div v-if="post1Image" class="relative">
                <img 
                  :src="post1Image" 
                  alt="Post image"
                  class="w-full h-64 object-cover rounded-lg border-2 border-black transition-transform duration-300 cursor-pointer"
                  @click="openImageModal(post1Image)"
                />
                <!-- Remove image button -->
                <button 
                  @click="removePost1Image"
                  class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-md z-10"
                >
                  ×
                </button>
                <!-- Hover overlay -->
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all duration-300 pointer-events-none"></div>
              </div>
              
              <!-- Image Upload Placeholder (when no image) -->
              <div v-else>
                <input 
                  ref="post1FileInput"
                  type="file" 
                  accept="image/*" 
                  @change="handlePost1ImageUpload"
                  class="hidden"
                />
                <div 
                  @click="triggerPost1Upload"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handlePost1Drop"
                  class="w-full h-64 bg-gradient-to-br from-green-400 via-green-500 to-green-700 rounded-lg border-2 border-black flex items-center justify-center transition-transform duration-300 cursor-pointer hover:scale-105"
                  :class="{ 'border-blue-500 bg-blue-50': isDragging }"
                >
                  <div class="text-center text-white">
                    <div class="text-4xl mb-2">📷</div>
                    <p class="font-semibold">Click to add image</p>
                    <p class="text-sm opacity-75">or drag & drop here</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <img src="/images/26609381-FCB2-4329-8D8F-0315CAB29E4E.png"
                />
              </div>
            </div>

            <!-- Post Text -->
            <p class="text-gray-700 mb-4 leading-relaxed">
              Hôm đây điện vài lôn chung máy a! Ông bù hết khối, xong ngoi không yên phải đưa ra sau cái ghê. Tình dây ông bảo thày sao trên trời sáng trung như trăng ram. Đêm anh em tụi t được 1 trăng cuoi hút hết cả hơi. 
              <span class="text-blue-600 cursor-pointer">See more...</span>
            </p>
          </div>

          <!-- Post Engagement -->
          <div class="px-4 pb-4">
            <div class="bg-gray-100 rounded-lg border-2 border-black p-3">
              <!-- Likes -->
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-black text-white px-2 py-1 rounded-full text-sm font-bold">1.2K Likes</span>
              </div>

              <!-- Comments -->
              <div class="space-y-2 mb-3">
                <div class="flex gap-2">
                  <span class="font-bold text-sm">thuly2k9</span>
                  <span class="text-sm">clm phê vcl</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-bold text-sm">lmhbuoi</span>
                  <span class="text-sm">các cậu đi mà không rủ tớ?</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-bold text-sm">minhtendi</span>
                  <span class="text-sm">nào m cho anh thử 1 bí nhé Nhật?</span>
                </div>
                <button class="text-gray-500 text-sm">See more...</button>
              </div>

              <!-- Comment Input -->
              <input 
                type="text" 
                placeholder="Sign in to leave a comment..." 
                class="w-full border-2 border-black rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        <!-- Post 2 -->
        <div class="bg-white rounded-lg border-2 border-blog-primary overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <!-- Post Header -->
          <div class="p-4 border-b-2 border-blog-primary bg-gradient-to-r from-white to-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-blog-primary flex items-center justify-center text-white font-bold shadow-md">
                  <span class="text-lg">M</span>
                </div>
                <div>
                  <h3 class="font-bold hover:text-blog-accent cursor-pointer transition-colors">minhtendi</h3>
                  <p class="text-sm text-blog-secondary">2025-07-17</p>
                </div>
              </div>
              <button class="text-xl hover:bg-gray-100 p-2 rounded-full transition-colors">⋯</button>
            </div>
          </div>

          <!-- Post Content -->
          <div class="p-4">
            <h2 class="text-lg font-bold mb-3">Hai nam thanh niên say gex trong can ho o Buffalo</h2>
            
            <!-- Post Image -->
            <div class="relative mb-4 group">
              <!-- Image Display (when image exists) -->
              <div v-if="post2Image" class="relative">
                <img 
                  :src="post2Image" 
                  alt="Post image"
                  class="w-full h-64 object-cover rounded-lg border-2 border-black transition-transform duration-300 cursor-pointer"
                  @click="openImageModal(post2Image)"
                />
                <!-- Remove image button -->
                <button 
                  @click="removePost2Image"
                  class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-md z-10"
                >
                  ×
                </button>
                <!-- Hover overlay -->
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all duration-300 pointer-events-none"></div>
              </div>
              
              <!-- Image Upload Placeholder (when no image) -->
              <div v-else>
                <img src="/images/2861660C-D9D6-4882-8634-9876354E5108.png"
                />
              </div>
            </div>

            <!-- Post Text -->
            <p class="text-gray-700 mb-4 leading-relaxed">
              Nam thanh nien Nhat, 20 tuoi, dot nhap vao phong cua nam thanh nien Minh, 22 tuoi, va thuc hien nhung hanh dong doi truy. 
              <span class="text-blue-600 cursor-pointer">See more...</span>
            </p>
          </div>

          <!-- Post Engagement -->
          <div class="px-4 pb-4">
            <div class="bg-gray-100 rounded-lg border-2 border-black p-3">
              <!-- Likes -->
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-black text-white px-2 py-1 rounded-full text-sm font-bold">1.2K Likes</span>
              </div>

              <!-- Comments -->
              <div class="space-y-2 mb-3">
                <div class="flex gap-2">
                  <span class="font-bold text-sm">lmhbuoi</span>
                  <span class="text-sm">Nhat oi la Nhat</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-bold text-sm">minhtendi</span>
                  <span class="text-sm">Personal Space cua tao</span>
                </div>
                <button class="text-gray-500 text-sm">See more...</button>
              </div>

              <!-- Comment Input -->
              <input 
                type="text" 
                placeholder="Sign in to leave a comment..." 
                class="w-full border-2 border-black rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </div>
           
      <!-- Load More Button -->
      <div class="text-center mt-8">
        <button class="bg-black text-white px-8 py-3 rounded-full border-2 border-black hover:bg-white hover:text-black transition-colors font-bold">
          See more
        </button>
      </div>
    </div>

    <!-- Advanced Tailwind Component -->
    <CreatePost />

    <!-- Image Modal -->
    <div 
      v-if="showImageModal" 
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" 
      @click="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full">
        <img 
          :src="modalImage" 
          alt="Full size image"
          class="max-w-full max-h-full object-contain rounded-lg"
        />
        <button 
          @click="closeImageModal"
          class="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CreatePost from '../posts/CreatePost.vue'
import { ref } from 'vue'

// Image upload states
const post1Image = ref(null)
const post2Image = ref(null)
const post1FileInput = ref(null)
const post2FileInput = ref(null)
const isDragging = ref(false)
const showImageModal = ref(false)
const modalImage = ref('')

// Post 1 Image Functions
const triggerPost1Upload = () => {
  post1FileInput.value?.click()
}

const handlePost1ImageUpload = (event) => {
  const file = event.target.files[0]
  console.log('Post1 File selected:', file)
  if (file && file.type.startsWith('image/')) {
    console.log('Post1 File is valid image:', file.type, file.size)
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('Post1 FileReader loaded, result length:', e.target.result.length)
      post1Image.value = e.target.result
      console.log('post1Image updated:', post1Image.value ? 'YES' : 'NO')
    }
    reader.onerror = (e) => {
      console.error('Post1 FileReader error:', e)
    }
    reader.readAsDataURL(file)
  } else {
    console.log('Post1 File is not valid:', file ? file.type : 'No file')
  }
}

const handlePost1Drop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      post1Image.value = e.target.result
    }
    reader.readAsDataURL(files[0])
  }
}

const removePost1Image = () => {
  post1Image.value = null
  if (post1FileInput.value) {
    post1FileInput.value.value = ''
  }
}

// Post 2 Image Functions
const triggerPost2Upload = () => {
  post2FileInput.value?.click()
}

const handlePost2ImageUpload = (event) => {
  const file = event.target.files[0]
  console.log('Post2 File selected:', file)
  if (file && file.type.startsWith('image/')) {
    console.log('Post2 File is valid image:', file.type, file.size)
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('Post2 FileReader loaded, result length:', e.target.result.length)
      post2Image.value = e.target.result
      console.log('post2Image updated:', post2Image.value ? 'YES' : 'NO')
    }
    reader.onerror = (e) => {
      console.error('Post2 FileReader error:', e)
    }
    reader.readAsDataURL(file)
  } else {
    console.log('Post2 File is not valid:', file ? file.type : 'No file')
  }
}

const handlePost2Drop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      post2Image.value = e.target.result
    }
    reader.readAsDataURL(files[0])
  }
}

const removePost2Image = () => {
  post2Image.value = null
  if (post2FileInput.value) {
    post2FileInput.value.value = ''
  }
}

// Drag and Drop Handlers
const handleDragOver = (event) => {
  isDragging.value = true
}

const handleDragLeave = (event) => {
  isDragging.value = false
}

// Image Modal Functions
const openImageModal = (imageSrc) => {
  modalImage.value = imageSrc
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  modalImage.value = ''
}
</script>

<style scoped>
/* Additional custom styles can go here */
</style>