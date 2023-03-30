<template>
  <div> hello {{ post }}</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
      post: posts.find(post => post.id === this.$route.params.postId)
    }
  },
  async created() {
    const response = await axios.get('/api/posts');
    const posts = response.data;
    this.posts = posts;
    console.log(posts);
  }
}
</script>