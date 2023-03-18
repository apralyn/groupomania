<template>
  <div class="full-screen">
    <div class="login">
      <img @click="$router.push('/')" class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <input type="email" name="email" v-model="email" placeholder="email" required>
        <input type="password" name="password" v-model="password" placeholder="password" required>
        <p>{{ errorMessage }}</p>
        <button class="login-btn" type="submit">Login</button>
      </form>
      <div class="sign-up">
        <p><span class="signup-link" @click="$router.push('/signup')">Sign up</span> to create an account.</p>
      </div>
    </div>
  </div>
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
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.data));
        //this.$router.push('/feed');
      } catch (error) {
        this.errorMessage = error.message;
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

.login {
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

.sign-up {
  padding-bottom: 5px;
}

.signup-link {
  color: #fd2d01;
  cursor: pointer;
}

.login-btn {
  width: 60%;
  height: 50px;
  margin: 5px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>