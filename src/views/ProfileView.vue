<template>
  <div class="profile">
    <h1>Profile</h1>
    <div>Feed</div>
    <div>Update</div>
    <img src="image.jpg" alt="image">
    <br>
    <button onclick="handleSubmit">Delete</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ProfileView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/api/auth/:id', {
          email: this.email,
          password: this.password,
        });
        console.log(response);
        // this will redirect to login route after signing up.
      } catch (error) {
        error.message;
      }
    }
  }
}
</script>
