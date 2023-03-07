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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 5px;
}

nav a.router-link-exact-active {
  color: #fd2d01;
}

button {
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  background-color: #ffd7d7;
}

.logo {
  cursor: pointer;
}
</style>
