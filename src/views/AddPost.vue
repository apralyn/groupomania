<template>
  <div class="add-post-container">
    <PageNav />
    <div class="add-post-view">
      <h3>Add a post</h3>
      <div class="add-post-form">

        <form @submit.prevent="submitForm">
          <div class="form-title">
            <label for="title">Title </label>
            <input type="text" name="title" v-model="title" size="30" style="height: 25px;">
          </div>
          <div class="form-title">
            <label for="description">Description </label>
            <textarea name="description" v-model="description" rows="3"></textarea>
          </div>
          <div class="form-title">
            <label for="image"><input type="file" @change="onFileChange" ref="file"></label>
          </div>
          <button class="add-btn" type="submit">Submit</button>
        </form>
        <button @click="$router.push('/feed')">Back</button>


      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import PageNav from '@/components/PageNav.vue';

export default {
  name: 'AddPost',
  data() {
    return {
      title: '',
      description: '',
      image: null,
      token: '',
      userId: ''
    }
  },
  components: {
    PageNav
  },
  methods: {
    onFileChange() {
      this.image = this.$refs.file.files[0];
    },
    async submitForm() {
      //TODO add condition that handles with and without media
      if (this.image === null) {
        //auth
        const user = JSON.parse(localStorage.getItem('token'));
        this.userId = user.userId;
        this.token = user.token;

        const post = JSON.stringify({ title: this.title, description: this.description, userId: this.userId });
        const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
        const addPost = await axios.post('api/posts/addpost', post, { headers })
          .then(response => {
            response.data;
            response.status
          })
          .catch(error => {
            error.message;
          })
        console.log("no media has been posted", addPost);
      } else {
        const user = JSON.parse(localStorage.getItem('token'));
        this.userId = user.userId;
        this.token = user.token;

        const formData = new FormData();
        // Append the form data to the FormData object
        formData.append('image', this.image);
        const post = { title: this.title, description: this.description, userId: this.userId }
        formData.append('post', JSON.stringify(post));
        const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
        // Submit the form data using an HTTP request
        const addPost = await axios.post('api/posts/addpost', formData, { headers })
          .then(response => {
            response.data.files;
            response.status;
          })
          .catch(error => {
            error.message;
          });
        console.log("Post successfully added ", addPost);
      }
      //TODO when post is successfully created redirect the page back to FeedView
      this.$router.push('/feed');
    }
  }
}
</script>

<style scoped>
.add-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 100px;
  margin: 80px auto;
  padding: 0 15px;
}

.add-post-container {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

.add-post-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 560px;
  margin: 80px auto;
  border-radius: 10px;
}

.add-logo {
  width: 50px;
}

h3 {
  position: relative;
  top: -10px;
}

.add-post-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
}

.form-title {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

input[type=text],
textarea {
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #fd2d01;
}

textarea {
  resize: none;
}

.add-btn {
  width: 250px;
  height: 50px;
  margin: 15px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>