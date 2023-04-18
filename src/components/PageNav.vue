<template>
  <div class="feed-nav">
    <img id="feed-logo" alt="Groupomania logo" src="../assets/icon.png">
    <div class="feed-sm-profile">
      <div class="feed-userName" @click="$router.push({ name: 'ProfileView', params: { id: userId } })">User {{ userId }}
      </div>
      <!-- <div class="small-profile-pic">Pic</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: ''
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('token'));
    this.userId = user.userId;
    console.log(this.userId);
  },
}
</script>
<style>
.feed-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 100px;
  margin: auto;
  padding: 0 15px;
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

.small-profile-pic {
  border: 1px solid red;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* center the text */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>