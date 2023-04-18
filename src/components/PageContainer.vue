<template>
  <div class="full-screen">
    <div class="box-container"></div>
  </div>
</template>
<style>
.full-screen {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -9999;
}

.box-container {
  width: 450px;
  height: 750px;
  padding: 5px;
  margin: 80px auto;
  /* border: 1px solid #ffd7d7; */
  border-radius: 10px;
}
</style>