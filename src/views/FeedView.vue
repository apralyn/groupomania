<template>
  <img id="feed-logo" alt="Groupomania logo" src="../assets/icon.png">
  <div class="feed-view">
    <div class="profile-container">
      <div class="small-profile-pic">Pic</div>
      <div class="feed-userName" @click="$router.push({ name: 'ProfileView', params: { id: userId } })">User Profile</div>
      <br>
      <router-link to="/addpost">Add a post</router-link>
    </div>
    <div class="posts-container">
      <div class="all-posts" v-for="post of posts" :key="post.id">
        <h3> {{ post.title }}</h3>
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
  mounted() {
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.userId = this.token.userId;
  },
  async created() {
    console.log(this.token.token);
    const response = await axios.get('/api/posts/feed', {
      headers: {
        'Authorization': `Bearer ${this.token.token}`,
        'Content-Type': 'application/json'
      }
    });
    const posts = response.data;
    this.posts = posts;
  },

}
</script>
<style scoped>
#feed-logo {
  margin-top: 100px;
  width: 50px;
}

.feed-view {
  display: flex;
  width: 450px;
  height: 480px;
  margin: auto;
  justify-content: space-between;
}

.posts-container,
.profile-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #ffd7d7;
  padding: 10px 20px;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
}

.posts-container {
  width: 310px;
}

.all-posts {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.profile-container {
  height: 200px;
}

.small-profile-pic {
  border: 1px solid red;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  /* center the text */
  display: flex;
  align-items: center;
  justify-content: center;
}


.addPostFeed {
  display: flex;
  flex-direction: column;
  align-items: start;
}

/* .next-btn {
  position: relative;
  top: -20px;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
  padding: 3px;
} */

/* .bottom-nav-container {
  display: flex;
  justify-content: space-between;
  width: 400px;
  position: relative;
  top: -15px;
  color: #fd2d01;
} */
</style>