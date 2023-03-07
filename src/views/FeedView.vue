<template>
  <div class="feed-container">
    <img class="feed-logo" src="../assets/icon-above-font.png" alt="Groupomania-logo">
    <nav class="feed-nav">
      <div class="Home">Home</div>
      <div class="profile">Profile</div>
      <div class="add-post">Create a post</div>
    </nav>
    <div class="posts-cards-container">
      <div class="post-card">1</div>
      <div class="post-card">2</div>
      <div class="post-card">3</div>
      <div class="post-card">4</div>
      <div class="post-card">5</div>
      <div class="post-card">6</div>
      <div class="post-card">7</div>
      <div class="post-card">8</div>
    </div>
    <div class="bottom-nav">

    </div>
  </div>
</template>
<script>
</script>
<style scoped>
.feed-container {
  width: 100vh;
  margin: auto;
  padding: 10px;
}

.feed-logo {
  width: 250px;
  height: 250px;
  margin-top: 2px;
}

.feed-nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  ;
  margin: 20px;
}

.posts-cards-container {
  width: 90vh;
  height: 500px;
  margin: auto;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.post-card {
  width: 200px;
  height: 225px;
  border: 1px solid red;
}</style>