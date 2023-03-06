<template>
  <img class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
  <h1>Login</h1>
  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" v-model="email" placeholder="label">
    <input type="password" name="password" v-model="password" placeholder="password">
    <p>{{ errorMessage }}</p>
    <button @click="getLogin">Login</button>
  </form>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password
        });

        localStorage.setItem('token', JSON.stringify(response.data));
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
}
</script>
<style>
.form-field {
  width: 300px;
}
</style>