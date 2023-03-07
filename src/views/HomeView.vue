<template>
  <div class="home">
    <img class="home-logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
    <div class="btns">
      <button @click="$router.push('/login')">Login</button>
      <button @click="$router.push('/signup')">Sign Up</button>
    </div>
    <PageHeader />
  </div>
</template>

<script>
</script>
<style scoped>
.home-logo {
  max-width: 500px;
  margin-top: 20px;
}

button {
  width: 50%;
  height: 80px;
  display: block;
  margin: auto;
  border: 4px solid white;
}
</style>
