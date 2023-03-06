<template>
  <form @submit.prevent="handleSubmit">
    <div class="signup">
      <h1>Sign Up</h1>
    </div>
    <input type="email" name="email" v-model="email" placeholder="email" />
    <br>
    <input type="password" name="password" v-model="password" placeholder="password" />
    <br>
    <p></p>
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
