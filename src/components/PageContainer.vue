<template>
  <div class="full-screen">
    <div class="box-container"></div>
  </div>
</template>
<style>
.full-screen {
  top: 0;
  position: fixed;
  border: 10px solid black;
  width: 100%;
  height: 100%;
}

.box-container {
  width: 450px;
  height: 550px;
  padding: 5px;
  margin: 80px auto;
  background: rgb(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>