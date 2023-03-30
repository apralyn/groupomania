<template>
  <div class="feed-container">
    <div class="feed-view">
      <img class="feed-logo" src="../assets/icon-above-font.png" alt="Groupomania-logo">
      <div class="feed-nav">
        <div @click="$router.push({ name: 'ProfileView', params: { id: userId } })">Profile</div>
        <router-link to="/addpost">Create a post</router-link>
      </div>
    </div>
    <div class="posts-container">
      <div class="all-posts" v-for="post of posts" :key="post.id">
        <h3> {{ post.title }}</h3>
        <!-- <img :src="post.imageUrl" /> -->
        <router-link :to="/viewpost/ + post.id">
          <button>View Post</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'


export default {
  name: "FeedView",
  data() {
    return {
      id: null,
      token: '',
      userId: '',
      posts: [],
    }
  },
  async created() {
    const response = await axios.get('/api/posts/feed');
    const posts = response.data;
    this.posts = posts;
  },
  mounted() {
    //working
    // if user login success get userId from localstorage and declare on userId.
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.userId = this.token.userId;
    //console.log(this.userId);
  },

}
</script>
<style scoped>
.feed-container {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

.feed-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 560px;
  margin: 80px auto;
  border-radius: 10px;
}

.feed-logo {
  width: 200px;
  height: 200px;
  margin-top: 2px;
}

.feed-nav {
  display: flex;
  justify-content: space-between;
  width: 400px;
  z-index: 9999;
  position: relative;
  top: -40px;
  color: #fd2d01;
}

.posts-container {
  border: 2px solid black;
  width: 400px;
  height: 300px;
  position: relative;
  top: -450px;
  left: 50px;
}
.all-posts {
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items: center;
}

.next-btn {
  position: relative;
  top: -20px;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
  padding: 3px;
}

.bottom-nav-container {
  display: flex;
  justify-content: space-between;
  width: 400px;
  position: relative;
  top: -15px;
  color: #fd2d01;
}
</style>