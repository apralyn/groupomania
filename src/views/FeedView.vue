<template>
  <FeedNav />
  <router-link to="/addpost"><button class="add-btn">Add a post</button></router-link>
  <div class="posts-container">
    <div class="all-posts" v-for="post of posts" :key="post.id">
      <router-link :to="/viewpost/ + post.id">
        <div class="each-post">
          <div> {{ post.title }} </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FeedNav from '@/components/FeedNav.vue'
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
  components:{
    FeedNav
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.userId = this.token.userId;
  },
  async created() {
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

.add-btn {
  width: 200px;
  height: 30px;
}

.posts-container {
  margin: auto;
  width: 450px;
}

.all-posts {
  width: 440px;
  border: 1px solid #ffd7d7;
  padding: 15px 0;
  margin: 5px auto;
  border-radius: 10px;
}

.each-post {
  display: flex;
  justify-content: space-evenly;
}

.add-btn{
  width: 250px;
  height: 50px;
  margin: 10px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>