<template>
  <PageNav />
  <div class="display-post">
    <div class="media">
      <img v-if="isImage" class="post-media" :src="post.imageUrl">
      <video v-else-if="isVideo" class="post-media" controls :src="post.imageUrl"></video>
      <audio v-else-if="isAudio" class="post-media" controls :src="post.imageUrl"></audio>
    </div>
    <div class="post-info">
      <div class="post-title">
        <h2>{{ post.title }}</h2>
      </div>
      <div class="">{{ post.description }}</div>
    </div>
  </div>
  <router-link to="/feed"><button class="back-btn">back</button></router-link>
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
      isImage: false,
      isVideo: false,
      isAudio: false
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
  async created() {
    //api
    //auth
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    this.token = user.token;
    //headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //get
    const response = await axios.get(`/api/posts/viewpost/${this.$route.params.id}`, { headers });
    const post = response.data;
    this.post = post;
    // console.log(post.usersRead);
    // console.log(this.post.imageUrl.split(".").pop());
    if (this.post.imageUrl === null) {
      console.log('media is empty');
    } else {
      const media = this.post.imageUrl.split(".").pop();
      if (media === 'mp3') {
        console.log('this is audio');
        this.isAudio = true;
      } else if (media === 'mp4') {
        console.log('this is video');
        this.isVideo = true;
      } else if (media === 'jpg') {
        console.log('this is image');
        this.isImage = true;
      }
    }
  },
  async mounted() {
    //add to usersRead array
    this.usersRead = this.post.usersRead.push(this.userId);
    //update db through api
    //auth
    this.userId;
    this.token;
    //headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //put
    await axios.put(`/api/posts/viewpost/${this.$route.params.id}/read`, {
      "userId": this.userId
    }, { headers })
      .then((response) => {
        response.data;
        response.status;
      })
      .catch((error) => {
        error.message;
      });
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

.post-media {
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

.back-btn {
  text-align: center;
  width: 250px;
  height: 50px;
  margin: 10px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>