<template>
  <div class="profile-container">
  <nav id="nav-menu">
    <div>
      <img id="profile-icon" alt="Groupomania logo" src="../assets/icon.png">
    </div>
    <ul class="nav-items">
      <li class="feed" @click="$router.push('/feed')">Feed</li>
      <li>Edit Profile</li>
    </ul>
  </nav>
  <div id="profile-image">
    <img src="image.jpg" alt="img">
  </div>
  <div class="profile-bio">
    <p>Name</p>
    <p>Bio</p>
    <p>Posts:</p>
  </div>
  <button onclick="handleSubmit">Delete</button>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ProfileView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/api/auth/:id', {
          email: this.email,
          password: this.password,
        });
        console.log(response);
        // this will redirect to login route after signing up.
      } catch (error) {
        error.message;
      }
    }
  }
}
</script>
<style>
.profile-container{
  border: 2px solid red;
  margin: auto;
  padding: 15px;
}
#profile-icon {
  width: 50px;
}

#nav-menu {
  display: flex;
  margin-right: auto;
  justify-content: space-between;
  align-items: center;
}

.nav-items {
  display: flex;
  list-style-type: none;


}

li {
  padding: 5px;
}

#profile-image {
  width: 250px;
  height: 250px;
  padding: 25px;
  margin: auto;
  border: 1px solid black;
  background-color: lightpink;
}

.profile-bio {
  text-align: left;
  padding-right: auto;

}
</style>