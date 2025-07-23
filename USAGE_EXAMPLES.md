# Universal Post Component Usage Guide

## Overview
The `Post.vue` component is a flexible, reusable component for displaying blog posts throughout your application. It can be customized with various props and handles all common post interactions through events.

## Basic Usage

### 1. Import the Component
```vue
<script setup>
import Post from '../posts/Post.vue'
</script>
```

### 2. Basic Post Display
```vue
<template>
  <Post 
    :post="postData"
    @post-click="handlePostClick"
    @like="handleLike"
  />
</template>

<script setup>
import { ref } from 'vue'
import Post from '../posts/Post.vue'

const postData = ref({
  id: 1,
  author: 'john_doe',
  title: 'My First Post',
  content: 'This is the content of my first post...',
  date: '2025-07-23T10:00:00Z',
  likes: 42,
  comments: 5,
  isLiked: false
})

const handlePostClick = (post) => {
  // Navigate to full post view
  console.log('Clicked post:', post.id)
}

const handleLike = (post) => {
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? 1 : -1
}
</script>
```

## Advanced Usage Examples

### 1. Feed View (Full Featured)
```vue
<template>
  <div class="space-y-6">
    <Post 
      v-for="post in feedPosts" 
      :key="post.id"
      :post="post"
      :show-engagement="true"
      :show-actions="true"
      :show-comment-input="true"
      @author-click="goToProfile"
      @post-click="goToPost"
      @image-click="openImageModal"
      @like="toggleLike"
      @comment="focusComment"
      @share="sharePost"
      @new-comment="addComment"
      @read-more="expandPost"
      @tag-click="searchByTag"
    />
  </div>
</template>
```

### 2. Profile View (Minimal)
```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <Post 
      v-for="post in userPosts" 
      :key="post.id"
      :post="post"
      :show-engagement="false"
      :show-actions="false"
      :show-menu="false"
      :max-content-length="100"
      @post-click="goToPost"
    />
  </div>
</template>
```

### 3. Preview Mode (No Interactions)
```vue
<template>
  <Post 
    :post="previewPost"
    :show-engagement="false"
    :show-actions="false"
    :show-menu="false"
    :show-comment-input="false"
    :comment-placeholder="'Sign in to comment...'"
  />
</template>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `post` | Object | required | Post data object (see structure below) |
| `showEngagement` | Boolean | true | Show likes/comments section |
| `showActions` | Boolean | true | Show like/comment/share buttons |
| `showMenu` | Boolean | true | Show three-dot menu button |
| `showImageActions` | Boolean | true | Show image hover overlay |
| `showCommentInput` | Boolean | true | Show comment input field |
| `maxContentLength` | Number | 200 | Content truncation length |
| `maxCommentsToShow` | Number | 3 | Number of comments to display |
| `commentPlaceholder` | String | 'Write a comment...' | Comment input placeholder |
| `avatarColorClass` | String | 'bg-gradient-to-br from-green-400 to-green-600' | Avatar background class |

## Post Data Structure

```javascript
const postData = {
  id: 1,                          // Required: Unique identifier
  author: 'username',             // Required: Author username
  title: 'Post Title',            // Required: Post title
  content: 'Post content...',     // Optional: Full post content
  date: '2025-07-23T10:00:00Z',  // Optional: ISO date string
  image: 'https://...',           // Optional: Post image URL
  likes: 42,                      // Optional: Number of likes
  comments: 5,                    // Optional: Number of comments
  isLiked: false,                 // Optional: Current user liked status
  tags: ['vue', 'javascript'],    // Optional: Array of tags
  commentsList: [                 // Optional: Array of comment objects
    {
      id: 1,
      author: 'commenter',
      text: 'Great post!'
    }
  ]
}
```

## Events Reference

| Event | Payload | Description |
|-------|---------|-------------|
| `author-click` | author (string) | User clicked on author name |
| `post-click` | post (object) | User clicked on post title |
| `image-click` | image (string) | User clicked on post image |
| `menu-click` | post (object) | User clicked menu button |
| `like` | post (object) | User clicked like button |
| `comment` | post (object) | User clicked comment button |
| `share` | post (object) | User clicked share button |
| `read-more` | post (object) | User clicked "read more" |
| `tag-click` | tag (string) | User clicked on a tag |
| `show-all-comments` | post (object) | User wants to see all comments |
| `new-comment` | {post, comment} | User submitted new comment |

## Styling Customization

The component uses Tailwind CSS classes and can be customized by:

1. **Avatar Colors**: Use the `avatarColorClass` prop
```vue
<Post 
  :post="post"
  avatar-color-class="bg-gradient-to-br from-purple-400 to-purple-600"
/>
```

2. **Custom CSS**: Override component styles
```vue
<style scoped>
.post-custom {
  /* Your custom styles */
}
</style>
```

## Integration Examples

### In NoAuthHomeView.vue
```vue
<template>
  <!-- Replace hardcoded posts with Post components -->
  <div class="space-y-6">
    <Post 
      v-for="post in samplePosts" 
      :key="post.id"
      :post="post"
      :show-comment-input="false"
      :comment-placeholder="'Sign in to leave a comment...'"
      @author-click="showLoginPrompt"
      @like="showLoginPrompt"
      @comment="showLoginPrompt"
    />
  </div>
</template>

<script setup>
import Post from '../posts/Post.vue'

const showLoginPrompt = () => {
  alert('Please sign in to interact with posts!')
}
</script>
```

### In ProfileView.vue
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Post 
      v-for="post in userPosts" 
      :key="post.id"
      :post="post"
      :show-engagement="false"
      :show-actions="false"
      :max-content-length="100"
      @post-click="openPost"
    />
  </div>
</template>
```

## Benefits of This Approach

1. **Consistency**: Same post appearance across all pages
2. **Maintainability**: Update post design in one place
3. **Flexibility**: Customize behavior with props
4. **Reusability**: Use in feeds, profiles, search results, etc.
5. **Event Handling**: Centralized post interaction logic
6. **Performance**: Single component with computed properties

## Migration Guide

To migrate existing hardcoded posts:

1. Replace post HTML with `<Post />` component
2. Move post data to reactive variables
3. Implement event handlers for interactions
4. Customize props based on context (feed vs profile vs preview)
5. Remove duplicated post-related code

This universal approach makes your codebase cleaner, more maintainable, and provides a consistent user experience across your entire blog application.
