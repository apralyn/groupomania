<template>
  <div v-show="read">Add userId to userRead array</div>
  <div class="display-post">
    <img class="post-img" :src="post.imageUrl" />
    <div class="post-info">
      <div class="post-title">
        <h2>{{ post.title }}</h2>
      </div>
      <div class="">{{ post.description }}</div>
    </div>
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
        imageUrl: '',
        isUser: false
      },
      userRead: [],
      read: 'true',
      token: '',
      userId: '',
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    this.token = user.token;
    console.log(this.token);

    const response = await axios.get(`/api/posts/viewpost/${this.$route.params.id}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
    const post = response.data;
    this.post = post;
    console.log(post);
  },
  method: {
  }
}
</script>
<style>
.display-post {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 450px;
  margin: 80px auto;
  padding: 0 15px;

}

.post-img {
  width: 400px;
  height: 300px;
  border: 1px solid black;
  margin: 10px auto;
  padding: 10px;
}

.post-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.post-title {
  margin: 5px auto;
  padding: 10px;
}
</style>