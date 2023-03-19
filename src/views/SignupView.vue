<template>
  <div class="full-overlay" v-if="false"></div>
  <div class="full-screen">
    <div class="signup">
      <img @click="$router.push('/')" class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <input class="input-field" type="email" name="email" v-model="email" placeholder="email" required />
        <input class="input-field" type="password" name="password" v-model="password" placeholder="password" required />
        <div v-if="errorMessage" class="error"> {{ errorMessage }} </div>
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
      password: '',
      errorMessage: ''
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
        //validate password
        this.errorMessage = this.password.length > 5 ? '' : 'Password  must be 6 characters long';

        this.$router.push('/login');
      } catch (error) {
        error.message;
      }
    }
  }
}
</script>
<style scoped>
.full-overlay {
  /* top: 0;
  position: fixed; */
  z-index: 1000;
  background-color: #FF000077;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  /* border: 10px solid black; */
  width: 100vw;
  height: 100vh;
}

.signup {
  width: 450px;
  height: 560px;
  margin: 80px auto;
  border: 1px solid #ffd7d7;
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

.signup-btn {
  width: 60%;
  height: 50px;
  margin: 15px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}

.login-link {
  color: #fd2d01;
  cursor: pointer;
}
</style>

