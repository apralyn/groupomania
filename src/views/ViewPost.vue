<template>
  <div class="display-post">
    <div> hello {{ post }}</div>
    <router-link to="/feed"><button>back</button></router-link>
  </div>
  <div class="edit-post">
    <!-- user can edit or delete -->
    <!-- show buttons -->
    <div class="edit-post" v-on="false">
      <button>Edit Post</button>
      <div>
        <form class="edit-form" action="">
          <input class="post-edit" type="title" name="title" v-model="post.title" placeholder="title" required />
          <input class="post-edit" type="description" name="description" v-model="post.description"
            placeholder="description" required />
          <input class="post-edit" type="file" name="image">

        </form>
    </div>
  </div>
    <button>Delete Post</button>
  </div>
  <div>
    <!-- do not show buttons if not user(else part) -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      post: {
        title: '',
        description: '',
        
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