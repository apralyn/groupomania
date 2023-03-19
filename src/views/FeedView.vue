<template>
  <div class="feed-container">
    <div class="feed-view">
      <img class="feed-logo" src="../assets/icon-above-font.png" alt="Groupomania-logo">
      <div class="feed-nav">
        <div @click="$router.push({ name: 'ProfileView', params: { id: userId } })">Profile</div>
        <router-link to="/addpost">Create a post</router-link>
      </div>
      <div class="posts-container">Hello</div>
      <button class="next-btn"> -- next -- </button>
      <div class="bottom-nav-container">
        <div class="bottom-nav-left">Left</div>
        <div class="bottom-nav-right">Right</div>
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

export default {
  data() {
    return {
      id: null,
      posts: [],
      token: '',
      userId: '',
      container: 'PageContainer'
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.userId = this.token.userId;
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
  position:relative;
  top: -40px;
}

.posts-container {
  border: 2px solid black;
  width: 400px;
  height: 300px;
  position: relative;
  top: -30px;
}

.next-btn{
  position: relative;
  top: -20px;
}

.bottom-nav-container {
  display: flex;
  justify-content: space-between;
  width: 400px;
  position: relative;
  top: -15px;
}

</style>