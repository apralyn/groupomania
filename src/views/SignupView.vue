<template>
  <img class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
  <h1>Sign Up</h1>
  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" v-model="email" placeholder="email" />
    <input type="password" name="password" v-model="password" placeholder="password" />
    <button>Sign Up</button>
  </form>
</template>
<script>
import axios from 'axios'
export default {
  name: 'SignupView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/api/auth/signup', {
          email: this.email,
          password: this.password,
        });
        console.log(response);
        // this will redirect to login route after signing up.
        this.$router.push('/login');
      } catch (error) {
        error.message;
      }
    }
  }
}
</script>

