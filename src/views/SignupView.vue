<template>
  <div class="container">
    <img @click="$router.push('/')" class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" name="email" v-model="email" placeholder="email" required />
      <input type="password" name="password" v-model="password" placeholder="password" required />
      <button>Sign Up</button>
    </form>
    <span>Already have an account? </span><span class="login-link" @click="$router.push('/login')">Log in</span>
  </div>
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
        console.log(response)
        this.$router.push('/login');
      } catch (error) {
        error.message;
      }
    }
  }
}
</script>
<style scoped>
.logo {
  max-width: 500px;
  margin-top: 20px;
}

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
  height: 50px;
  margin: auto;
  border: 4px solid #ffd7d7;

}

.login-link {
  color: #fd2d01;
  cursor: pointer;
}
</style>

