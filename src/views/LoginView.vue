<template>
  <img @click="$router.push('/')" class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
  <h1>Login</h1>
  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" v-model="email" placeholder="email" required>
    <input type="password" name="password" v-model="password" placeholder="password" required>
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
<style scoped>
form {
  max-width: 420px;
  background: white;
  padding: 40px;
  margin: auto;
}

input {
  display: block;
  width: 100%;
  height: 60px;
  text-align: center;
  margin: 5px;
  border: 1px solid #ffd7d7;
}

button {
  width: 60%;
  height: 40px;
  margin: auto;
  border: 4px solid #ffd7d7;
}
</style>