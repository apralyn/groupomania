<template>
  <PageNav />
  <div class="media-query"></div>
  <div class="desktop-view">
    <div class="profile-card">
      <div class="circle-initials"></div>
      <div class="profile-username">username</div>
    </div>
    <router-link to="/addpost"><button class="add-btn">Add a post</button></router-link>
    <div class="posts-container">
      <div class="all-posts" v-for="post of          posts         " :key="post.id">
        <div v-if="isRead(post)">new</div>
        <router-link :to="/viewpost/ + post.id" @click="this.read = !this.read;">
          <div class="each-post">
            <div>{{ post.title }}</div>
          </div>
        </router-link>
      </div>
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
      read: true,
    }
  },
  components: {
    PageNav
  },
  beforeCreate() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login');
    }
  },
  methods: {
    isRead(post) {
      return !post.usersRead.includes(this.userId);
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
/* mobile and tablet */
@media screen and (max-width: 768px) {
  .media-query {
    border: 1px solid #ffd7d7;
    margin-bottom: 50px;
  }

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
}

/* for tablet and desktop */
@media screen and (min-width: 769px) {
  .media-query {
    border: 1px solid #ffd7d7;
    margin-bottom: 50px;
  }

  .desktop-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto;
  }

  .add-btn {
    display: none;
  }

  .profile-card {
    border: 1px solid #ffd7d7;
    border-radius: 10px;
    width: 200px;
    height: 300px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;
  }
  .circle-initials {
    border: 1px solid #ffd7d7;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .posts-container {
    width: 500px;
    height: 50vh;
    margin: 0 50px;
  }

  .all-posts {
    width: 450px;
    border: 1px solid #ffd7d7;
    border-radius: 10px;
    padding: 15px 0;
    margin: 5px auto;

  }
}
</style>