<template>
  <div class="home">
    <img class="logo" alt="Groupomania logo" src="../assets/icon-above-font.svg">
    <div class="btns">
      <button>Login</button>
      <button>Sign Up</button>
    </div>
    <PageHeader />
  </div>
</template>

<script>
// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'HomeView',
  components: {
    PageHeader
  }
}
</script>
<style>
.logo {
  width: 200px;
  margin-top: 100px;
}

.btns button {
  width: 200px;
  height: 60px;
  border: 4px solid;
  display: block;
  margin: auto;
  background-color: lightpink;
  color: white;
  cursor: pointer;
}
</style>
