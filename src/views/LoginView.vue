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
        this.$router.push('/feed');
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
  width: 100%;
  height: 100%;
}

.login {
  width: 450px;
  height: 560px;
  margin: 80px auto;
  border-radius: 10px;
}

.logo {
  width: 200px;
  height: 200px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  padding: 20px;
  margin: auto;
}

input {
  width: 100%;
  height: 60px;
  text-align: center;
  margin: 10px;
  border: 1px solid #fd2d01;
  border-radius: 10px;
}
.input-field:focus-visible {
  outline: #fd2d01 auto 1px;
}
.login-btn {
  width: 60%;
  height: 50px;
  margin: 15px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
.signup-link {
  color: #fd2d01;
  cursor: pointer;
}


</style>