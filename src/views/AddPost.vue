<template>
  <div class="add-post-container">
    <div class="add-nav">
      <img class="add-logo" alt="Groupomania logo" src="../assets/icon.png">
      <button @click="$router.push('/feed')">Back</button>
    </div>
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
            <label for="image"><input type="file" @change="onFileChange"></label>
          </div>
          <button class="add-btn" type="submit">Submit</button>
        </form>

      </div>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AddPost',
  data() {
    return {
      title: '',
      description: '',
      image: null,
      token: '',
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
  },
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    submitForm() {
      // Create a new FormData object
      const formData = new FormData();

      // Append the form data to the FormData object
      formData.append('name', this.title);
      formData.append('description', this.description);

      // Check if an image file has been selected
      if (this.image) {
        formData.append('image', this.image);
      }

      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }

      // Submit the form data using an HTTP request
      axios.post('api/posts/addpost', formData, { config })
        .then(response => {
          console.log(response.data.files);
          response.status;
        })
        .catch(error => {
          error.message;
        });
    }
  }
}
</script>

<style scoped>
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
  margin-top: 2px;
  border: 1px solid red;
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
  width: 200px;
  height: 50px;
  margin: 15px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>