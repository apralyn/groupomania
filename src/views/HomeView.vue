<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.png">
    <PageHeader />
    <button>Login</button>
    <br>
    <button>Sign Up</button>
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
