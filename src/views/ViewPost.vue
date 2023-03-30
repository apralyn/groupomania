<template>
  <div> hello {{ post }}</div>
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
    const response = await axios.get(`/api/posts/${this.$route.params.postId}`);
    const post = response.data;
    this.post = post;
    console.log(post);
  }
}
</script>