<template>
  <PageNav />
  <div v-if="read">Add userId to userRead array</div>
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
import PageNav from '@/components/PageNav.vue'
export default {
  name: 'ViewPost',
  data() {
    return {
      post: {
        title: '',
        description: '',
        imageUrl: '',
        usersRead: [],
        isUser: false
      },
      userRead: [],
      read: 'true',
      token: '',
      userId: '',
    }
  },
  components: {
    PageNav
  },
  async created() {
    //api
    //auth
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    this.token = user.token;
    console.log(this.token);
    //headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //get
    const response = await axios.get(`/api/posts/viewpost/${this.$route.params.id}`, { headers });
    const post = response.data;
    this.post = post;
  },
  async mounted() {
    this.usersRead = this.post.usersRead.push(this.userId);
    //api
    //auth
    this.userId;
    this.token;
    //headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //put
    //TODO use put request to add userId to the usersRead array on post.
    const response = await axios.put(`/api/posts/viewpost/${this.$route.params.id}/read`, {
      post: {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        usersRead: this.usersRead,
      }
    }, { headers })
      .then((response) => {
        response.data;
        response.status;
      })
      .catch((error) => {
        error.message;
      });
    console.log(response);
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