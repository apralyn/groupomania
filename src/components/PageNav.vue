<template>
  <div class="feed-nav">
    <img id="feed-logo" alt="Groupomania logo" src="../assets/icon.png">
    <div class="feed-sm-profile">
      <div class="feed-userName" @click="$router.push({ name: 'ProfileView', params: { id: userId } })">
        <strong>{{ getUser.username }}</strong>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      userId: '',
      getUser: ''
    }
  },
  async mounted() {
    //api
    //auth
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    this.token = user.token;

    //headers
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    //get username from the database
    await axios.get(`api/auth/${this.userId}`, { headers })
      .then((response) => {
        this.getUser = response.data;
        response.status;
      })
      .catch((error) => {
        error.message;
      });
  }
}
</script>
<style>
.feed-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100px;
  margin: auto;
  padding: 0 40px;
}

#feed-logo {
  width: 50px;
}

.feed-sm-profile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 150px;
  padding: 5px;
}

.feed-userName {
  cursor: pointer;
}
</style>