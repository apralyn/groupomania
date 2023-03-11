<template>
  <div class="full-screen">
    <div class="view-post">
      <div>
        <button class="users-btn" @click="getUsers">Show all</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  methods: {
    async getUsers() {
      try {
        const users = await axios.get('/api/auth/');
        this.users = users.data; // to access the list of users
        console.log(users);
      }
      catch (error) {
        error.message;
      }
    }
  }
}
</script>