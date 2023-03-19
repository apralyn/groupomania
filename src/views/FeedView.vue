<template>
  <div class="feed-container">
    <img class="feed-logo" src="../assets/icon-above-font.png" alt="Groupomania-logo">
    <div class="feed-nav">
      <div @click="$router.push({ name: 'ProfileView', params: { id: userId } })">Profile</div>
      <router-link to="/addpost">Create a post</router-link>
    </div>
    <div class="posts-cards-container" v-for="post in posts" :key="post.id">
      <div class="post-card post-preview" @click="$router.push('/viewpost')">
        <div class="post-thumb">thumb</div>
        <div class="post-description">
          <div class="post-title">title</div>
          <div class="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. dolor sit amet consectetur
            adipisicing elit.</div>
        </div>
        <div class="post-arrow-access">arrow</div>
      </div>
      <div class="post-card post-preview">
        <div class="post-thumb">thumb</div>
        <div class="post-description">
          <div class="post-title">title</div>
          <div class="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. dolor sit amet consectetur
            adipisicing elit.</div>
        </div>
        <div class="post-arrow-access">arrow</div>
      </div>
      <div class="post-card post-preview">
        <div class="post-thumb">thumb</div>
        <div class="post-description">
          <div class="post-title">title</div>
          <div class="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. dolor sit amet consectetur
            adipisicing elit.</div>
        </div>
        <div class="post-arrow-access">arrow</div>
      </div>
    </div>
    <div class="next-page"> -- next -- </div>
    <div class="bottom-nav-container">
      <div class="bottom-nav-left">
        <div>Links</div>
        <div>Links</div>
      </div>
      <div class="bottom-nav-right">
        <div>Links</div>
        <div>Links</div>
      </div>
    </div>
  </div>
</template>
<script>
//TODO 
  //make sure that only current user can access the feed. 
  //if the url is hard coded must show an errorMsg('you are not logged in').
export default {
  data() {
    return {
      id: null,
      posts: [],
      token: '',
      userId: ''
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.userId = this.token.userId;
  },
}
</script>
<style scoped>
.feed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 100vh;
}

.feed-logo {
  width: 250px;
  height: 250px;
  margin-top: 2px;
}

.feed-nav {
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 5px;
}

.posts-cards-container {
  width: 90vh;
  margin: auto;
  padding: 10px 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.post-card {
  width: 500px;
  height: 80px;
  margin: 3px;
  text-align: start;
  border: 1px solid red;
  list-style-type: none;
}

.next-page {
  width: 500px;
  height: 50px;
  margin-top: 0;
}

.bottom-nav-container {
  border: 1px solid yellow;
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 50px;
  margin-top: 5px;
}

.post-preview {
  display: flex;
  padding: 3px;
}

.post-thumb {
  width: 100px;
  text-align: center;
  border: 1px solid blue;
  margin: 0;
}

.post-description {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 0 5px;
}

.post-arrow-access {
  border: 1px solid blue;
  padding-top: 20px;
}

.post-content {
  font-size: 12px;
}
</style>