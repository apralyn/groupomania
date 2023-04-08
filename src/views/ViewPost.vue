<template>
  <div class="display-post">
    <label for="viewpost" class="view-post"></label>
    <div> {{ post }}</div>
  </div>
  <router-link to="/feed"><button>back</button></router-link>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ViewPost',
  data() {
    return {
      post: {
        title: '',
        description: '',
        isUser: false
      }
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  async created() {
    const response = await axios.get(`/api/posts/viewpost/${this.$route.params.id}`);
    const post = response.data;
    this.post = post;
    console.log(post);
  }
}
</script>
<style>
.edit-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.edit-form input {
  width: 200px;
}
</style>