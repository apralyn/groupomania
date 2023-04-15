<template>
  <div class="feed-nav">
    <img id="feed-logo" alt="Groupomania logo" src="../assets/icon.png">
    <div class="feed-sm-profile">
      <div class="feed-userName" @click="$router.push({ name: 'ProfileView', params: { id: userId } })">User Profile
      </div>
      <div class="small-profile-pic">Pic</div>
    </div>
  </div>
  <router-link to="/addpost"><button>Add a post</button></router-link>
  <div class="posts-container">
    <div class="all-posts" v-for="post of posts" :key="post.id">
      <div class="each-post">
        <router-link :to="/viewpost/ + post.id">
          <div> {{ post.title }} </div>
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
.feed-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 100px;
  margin: 80px auto;
  padding: 0 15px;
}

#feed-logo {
  width: 50px;
  border: 1px solid red;
}

.feed-sm-profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ffd7d7;
  width: 150px;
  padding: 5px;
}

.small-profile-pic {
  border: 1px solid red;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* center the text */
  display: flex;
  align-items: center;
  justify-content: center;
}


.posts-container {
  margin: auto;
  width: 300px;
}

.all-posts {
  width: 400px;
  border: 1px solid #ffd7d7;
  padding: 15px 0;
  margin: 5px;
}

.each-post {
  display: flex;
  justify-content: space-evenly;
}
</style>