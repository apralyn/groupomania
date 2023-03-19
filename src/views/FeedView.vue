<template>
  <div class="feed-container">
    <div class="feed-view">
      <img class="feed-logo" src="../assets/icon-above-font.png" alt="Groupomania-logo">
      <div class="feed-nav">
        <div @click="$router.push({ name: 'ProfileView', params: { id: userId } })">Profile</div>
        <router-link to="/addpost">Create a post</router-link>
      </div>
      <div class="posts-container">
        <button @click="getAllPost()">View Posts</button>
        <div class="all-posts" v-for="post of posts" :key="post"> 
          {{ post.id }} {{ post.title }} {{ post.description }}
        </div>
      </div>
      <button class="next-btn"> -- next -- </button>
      <div class="bottom-nav-container">
        <div class="bottom-nav-left">Link</div>
        <div class="bottom-nav-right">Link</div>
      </div>
    </div>
  </div>
  <PageContainer />
</template>
<script>
//TODO 
//make sure that only current user can access the feed. 
//if the url is hard coded must show an errorMsg('you are not logged in').
// paste this inside the post container
//v-for="post in posts" :key="post.id"
import PageContainer from '@/components/PageContainer.vue'
import axios from 'axios'
//import { ref } from 'vue'

export default {
  data() {
    return {
      id: null,
      token: '',
      userId: '',
      container: 'PageContainer',
      posts: []
    }
  },
  methods:{
    async getAllPost() {
      let res = await axios.get('/api/posts/feed')
        .then(response => this.posts = response.data);
      console.log(res);
    },
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
  components: { PageContainer },

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
  top: -30px;
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