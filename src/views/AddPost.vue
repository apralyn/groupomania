<template>
  <div class="add-post-container">
    <div class="add-post-view">
      <img class="add-logo" src="../assets/icon-above-font.png" alt="Groupomania-logo">

      <h1>Add a post</h1>
      <div class="add-post-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-title">
            <label>Title </label>
            <input type="text" name="title" v-model="addPost.title" size="30" style="height: 25px;">
          </div>
          <div class="form-title">
            <label>Description </label>
            <input type="textarea" name="description" v-model="addPost.description" size="30" row="3"
             style="height: 50px;">
          </div>
          <div class="form-title">
            <label class="post-image">Add photo </label>
            <input type="file" src="" alt="">
          </div>
        </form>
        <button class="add-btn">Submit</button>
      </div>
      <button class="add-btn" @click="$router.push('/feed')">Back</button>
    </div>
  </div>
</template>
<script>
//TODO add axios to create a post with or without media
//NOTE if there is media use the formData object
export default {
  data() {
    return {
      posts: [],
      addPost: {
        title: '',
        description: '',
        imageUrl: ''
      }
    }
  }
}
</script>
<style scoped>
.add-post-container {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

.add-post-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 560px;
  margin: 80px auto;
  border-radius: 10px;
}

.add-logo {
  width: 200px;
  height: 200px;
  margin-top: 2px;
}

h1 {
  position: relative;
  top: -20px;
}

.add-post-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
}

.form-title {
  margin: 10px;
}

input[type=text] {
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #fd2d01;
}

.add-btn {
  width: 200px;
  height: 50px;
  margin: 15px auto;
  border: 4px solid #fd2d01;
  background-color: #fd2d01;
  border-radius: 10px;
  color: white;
}
</style>