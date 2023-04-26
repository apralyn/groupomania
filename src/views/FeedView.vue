<template>
  <PageNav />
  <div class="media-query"></div>
  <div class="desktop-view">
    <div class="profile-card">
      <div class="circle-initials" @click="$router.push({ name: 'ProfileView', params: { id: userId } })">
        <p class="initials">{{ user.initials }}</p>
      </div>
      <div class="profile-username">
        <h3>{{ user.username }}</h3>
      </div>
      <router-link to="/addpost"><button class="desktop-add-btn">Add a post</button></router-link>
    </div>

    <router-link to="/addpost"><button class="add-btn">Add a post</button></router-link>
    <div class="posts-container">
      <div class="all-posts" v-for="post of      posts     " :key="post.id">
        <div v-if="isRead(post)">new</div>
        <router-link style="text-decoration: none; color: inherit;" :to="/viewpost/ + post.id" @click="this.read = !this.read;">
          <div class="each-post">
            <p><strong>{{ post.title }}</strong></p>
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
      user: {},
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
  async mounted() {
    //api auth
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    this.token = user.token;

    //headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //get username from the database
    await axios.get(`api/auth/${this.userId}`, { headers })
      .then((response) => {
        this.user = response.data;
        response.status;
      })
      .catch((error) => {
        error.message;
      });
  }
}
</script>
<style scoped>
/* mobile and tablet */
@media screen and (max-width: 768px) {
  .media-query {
    border: 1px solid #ffd7d7;
    margin-bottom: 50px;
  }

  .profile-card {
    display: none;
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

  .desktop-add-btn {
    width: 125px;
    height: 50px;
    margin: 50px auto 10px auto;
    border: 4px solid #fd2d01;
    background-color: #fd2d01;
    border-radius: 10px;
    color: white;
  }

  .profile-card {
    border: 1px solid #ffd7d7;
    border-radius: 10px;
    width: 169px;
    height: 300px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;
  }

  .profile-username {
    margin: 10px auto;
  }

  .circle-initials {
    background-color: #ffd7d7;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  .initials {
    font-size: 70px;
    font-style: oblique;
    color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5%;
  }

  .posts-container {
    width: 60vw;
    height: 50vh;
    margin: 0 50px;
  }

  .all-posts {
    width: 60vw;
    border: 1px solid #ffd7d7;
    border-radius: 10px;
    padding: 15px 0;
    margin-top: 0;
    margin-bottom: 5px;
  }
}</style>