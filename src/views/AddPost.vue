<template>
    <PageNav />
    <div class="media-query"></div>
    <div class="add-post-view">
      <h3>Add a post</h3>
      <div class="add-post-form">
        <form @submit.prevent="submitForm">
          <div class="form-title">
            <label for="title">Title</label>
            <input type="text" name="title" v-model="title" size="30" style="height: 25px;">
          </div>
          <div class="form-title">
            <label for="description">Description</label>
            <textarea name="description" v-model="description" rows="3"></textarea>
          </div>
          <div class="form-title">
            <label for="image"><input type="file" @change="onFileSelected" ref="file"></label>
          </div>
          <button class="submit-btn" type="submit">Submit</button>
        </form>
      </div>
      <button class="back-btn" @click="$router.push('/feed')">Back</button>
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
  beforeCreate() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login');
    }
  },
  methods: {
    onFileSelected(event) {
      this.image = event.target.files[0];
    },
    // onFileChange() {
    //   this.image = this.$refs.file.files[0];
    // },
    async submitForm() {
      //api auth
      const user = JSON.parse(localStorage.getItem('token'));
      this.userId = user.userId;
      this.token = user.token;

      if (this.image === null) {
        //add post
        const post = JSON.stringify({ title: this.title, description: this.description, userId: this.userId });
        //auth
        this.userId;
        this.token;
        //headers
        const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
        //post
        await axios.post('api/posts/addpost', post, { headers })
          .then((response) => {
            response.data;
            response.status;
          })
          .catch((error) => {
            error.message;
          })
      } else {
        // Append the form data to the FormData object
        const formData = new FormData();
        formData.append('image', this.image);
        const post = { title: this.title, description: this.description, userId: this.userId }
        formData.append('post', JSON.stringify(post));
        //auth
        this.userId;
        this.token;
        //headers
        const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
        //post 
        await axios.post('api/posts/addpost', formData, { headers })
          .then(response => {
            response.data.files;
            response.status;
          })
          .catch(error => {
            error.message;
          });
      }
      //redirect to feed after creating a post
      this.$router.push('/feed');
    }
  }
}
</script>

<style scoped>

.add-post-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 560px;
  margin: 80px auto;
}

h3 {
  position: relative;
  top: -10px;
}

.add-post-form {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  resize: none;
}

.submit-btn,
.back-btn {
  width: 250px;
  height: 50px;
  margin: 15px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}

/* for desktop */
@media screen and (min-width: 900px) {
  .media-query {
    border: 4px solid #fd2d01;
  }
}

/* for mobile the max viewing is 480px */
@media screen and (max-width: 480px) {
  .media-query {
    border: 4px solid black;
  }
}
</style>