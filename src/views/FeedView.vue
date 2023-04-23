<template>
  <PageNav />
  <router-link to="/addpost"><button class="add-btn">Add a post</button></router-link>
  <div class="posts-container">
    <div class="all-posts" v-for="post of posts" :key="post.id">
      <router-link :to="/viewpost/ + post.id">
        <div class="each-post">
          <div>{{ post.title }}</div>
          <div v-if="read">new</div>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PageNav from '@/components/PageNav.vue'
export default {
  name: "FeedView",
  data() {
    return {
      id: null,
      token: '',
      userId: '',
      posts: [],
      read: true
    }
  },
  components: {
    PageNav
  },
  methods: {
    viewPost() {
      console.log("clicked", this.id);
    }
  },
  async created() {
    //api auth
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    this.token = user.token;
    //api headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //api    
    await axios.get('/api/posts/feed', { headers })
      .then((response) => {
        const posts = response.data;
        this.posts = posts;
      })
      .catch((error) => {
        error.message;
      });

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
  flex-direction: column;
  justify-content: space-evenly;
}

.add-btn {
  width: 250px;
  height: 50px;
  margin: 10px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>