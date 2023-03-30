<template>
  <div> hello {{ post.title }}</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      post: {}
    }
  },
  async created() {
    const response = await axios.get(`/api/posts/viewpost/${this.$route.params.id}`);
    const post = response.data;
    this.post = post;
    console.log(post);
  }
}
</script>