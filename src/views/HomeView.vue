<template>
  <div class="home-view">
    <img class="home-logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
    <div class="home-btns">
      <button @click="$router.push('/login')">Login</button>
      <button @click="$router.push('/signup')">Sign Up</button>
    </div>
  </div>
  <PageContainer />
</template>

<script>
import PageContainer from '@/components/PageContainer.vue'
export default {
  data() {
    return {
      container: "PageContainer"
    }
  },
  components: { PageContainer }
}
</script>
<style scoped>
.home-logo {
  width: 200px;
  height: 200px;
  margin-top: 100px;
}

.home-btns {
  display: flex;
  flex-direction: column;
  margin: 50px auto;
}

button {
  width: 250px;
  text-align: center;
  padding: 25px;
  margin: 10px auto;
  border: 1px solid #fd2d01;
  background-color: #ffd7d79a;
  color:#fd2d01;
}
button:hover {
  background-color: #fd2d01;
  color: #fff;
}
</style>
