<template>
  <div class="home">
    <img @click="$router.push('/')" class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
    <div class="btns">
      <button @click="$router.push('/login')">Login</button>
      <button @click="$router.push('/signup')">Sign Up</button>
    </div>
    <PageHeader />
  </div>
</template>

<script>
</script>
<style>
img {
  cursor: pointer;
}

.logo {
  width: 200px;
  margin-top: 100px;
}

button {
  width: 60%;
  height: 60px;
  display: block;
  margin: auto;
  background-color: lightpink;
  border: 4px solid;
  color: white;
  cursor: pointer;
}
</style>
