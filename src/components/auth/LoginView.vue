<template>
  <div class="flex justify-center font-mono mt-10">
    <div class="flex flex-col items-center gap-6 w-full max-w-sm">
      <h2 class="text-4xl font-bold">Sign In</h2>
      <div class="w-full">
        <label for="email" class="block text-center mb-2">Email</label>
        <input type="email" id="email" placeholder="youremail@gmail.com" class="w-full border-2 border-black rounded-full py-2 px-5 text-center" />
      </div>
      <div class="w-full">
        <label for="password-signup" class="block text-center mb-2">Password</label>
        <input type="password" id="password-signup" placeholder="Something no one knows..." class="w-full border-2 border-black rounded-full py-2 px-5 text-center" />
      </div>
      <button class="bg-black text-white rounded-full py-2 px-10 font-semibold border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer">Sign up</button>
    </div>
  </div>
</template>

<script>
</script>