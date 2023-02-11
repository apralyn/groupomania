<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.png">
    <HelloWorld msg="Welcome to Groupomania"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
