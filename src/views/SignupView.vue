<template>
  <div class="full-screen">
    <div class="signup">
      <img @click="$router.push('/')" class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <input type="email" name="email" v-model="email" placeholder="email" required />
        <input type="password" name="password" v-model="password" placeholder="password" required />
        <button class="signup-btn">Sign Up</button>
      </form>
      <div class="login">
        <span>Already have an account? </span><span class="login-link" @click="$router.push('/login')">Log in</span>
      </div>
    </div>
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
.full-screen {
  top: 0;
  position: fixed;
  border: 10px solid black;
  width: 100%;
  height: 100%;
}

.signup {
  width: 450px;
  height: 560px;
  padding: 5px;
  margin: 80px auto;
  border: 1px solid #ffd7d7;
  border-radius: 10px;
}

.logo {
  width: 200px;
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
  border-radius: 10px;
}

.signup-btn {
  width: 60%;
  height: 50px;
  margin: 5px auto;
  border: 4px solid #ffd7d7;
  background-color: #ffd7d7;
  border-radius: 10px;
  color: white;
}

.login-link {
  color: #fd2d01;
  cursor: pointer;
}
</style>

