<template>
  <nav class="bg-white border-b-2 border-black flex justify-center items-center p-2 font-mono">
    <div 
      class="text-2xl font-bold cursor-pointer pl-5"
      @click="goToHome"
    >
      OnlyBlogs
    </div>
    <div class="flex-grow">
      <input 
        type="text" 
        placeholder="Search Profiles"
        class="w-full max-w-md mx-auto block border-2 border-black rounded-full py-1 px-5"
      />
    </div>
    <div class="flex items-center gap-4 pr-5">
      <button @click="goToProfile" class="bg-gray-100 text-black rounded-full py-1 px-2 font-semibold border-black border-2 hover:bg-black hover:text-white transition-colors w-25">
        Profile
      </button>
      <button @click="goToLogin" class="bg-black text-white rounded-full py-1 px-2 font-semibold border-black border-2 hover:bg-white hover:text-black hover:border-black transition-color w-25">
        Login
      </button>
      <button @click="goToSignup" class="bg-black text-white rounded-full py-1 px-2 font-semibold border-black border-2 hover:bg-white hover:text-black hover:border-black transition-colors w-25">
        Sign Up
      </button>
    </div>
  </nav>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToHome = () => {
    router.push('/')
  }

  const goToProfile = () => {
    router.push('/profile')
  }

  const goToLogin = () => {
    router.push('/login')
  }

  const goToSignup = () => {
    router.push('/signup')
  }
</script>

