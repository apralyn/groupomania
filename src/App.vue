<template>
  <router-link to="/"></router-link>
  <router-view />
</template>

<style>
/*found inside public folder under index.html*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  font-size: 14px;
  cursor: pointer;
}

.logo {
  cursor: pointer;
}
</style>
