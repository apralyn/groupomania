<template>
  <div class="full-screen">
    <div class="view-post">
      <div class="all-users">
        <p>Get all users</p>
        <button class="users-btn" @click="getUsers">Show all</button>
        <div v-for="user in users" :key="user.id">
          <h2> {{ user.email }}</h2>
          <p>{{ user.id }}</p>
        </div>
      </div>
      <div class="one-user">
        <p>Get one user</p>
        <button @click="getUser">A user</button>
        <button @click="getUserId">get userId</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      users: [],
      userId: ""
    };
  },
  methods: {
    async getUsers() {
      try {
        const users = await axios.get('/api/auth/');
        this.users = await users.data // to access the list of users
        console.log(this.users);
      }
      catch (error) {
        error.message;
      }
    },
    created() {
      this.getUsers();
    },
    async getUser(userId) {
      try {
        const user = await axios.get('/api/auth/' + userId);
        return user.data;
        // this.user = user.data;
        // console.log(this.user);
      }
      catch (error) { error.message }
    },
    async getUserId() {
      try {
        const token = JSON.parse(localStorage.getItem('token')) || [];
        const userId = token.userId;
        console.log(userId);


        const test = await axios.get('/api/auth/' + userId);
        console.log(test);

      }
      catch (error) {
        error.message;
      }
    }
  }
}
</script>