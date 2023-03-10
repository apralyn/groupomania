<template>
  <div class="full-screen">
    <div class="home">
      <img class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
      <div class="btns">
        <button @click="$router.push('/login')">Login</button>
        <button @click="$router.push('/signup')">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
.full-screen {
  top: 0;
  position: fixed;
  border: 10px solid black;
  width: 100%;
  height: 100%;
}

.home {
  width: 450px;
  height: 550px;
  padding: 5px;
  margin: 80px auto;
  border: 1px solid #ffd7d7;
  border-radius: 10px;
}

.logo {
  width: 200px;
  margin-bottom: 80px;
}

.btns button {
  width: 50%;
  height: 80px;
  display: block;
  margin: 10px auto;
  border: 2px solid #ffd7d7;
  background-color: white;
  color: #fd2d01;
  border-radius: 10px;
}
</style>
