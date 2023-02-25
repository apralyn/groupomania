<template>
  <form @submit.prevent="handleSubmit">
    <div class="login">
      <h1>Login</h1>
    </div>
    <input type="email" name="email" v-model="email" placeholder="email" />
    <br>
    <input type="password" name="password" v-model="password" placeholder="password" />
    <p>{{ errorMessage }}</p>
    <br>
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
      errorMessage:''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password
        });
        console.log(response); 
        //TODO put response.data into localStorage
        //TODO redirect user to homepage using vue way. 
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
}
</script>
<style></style>