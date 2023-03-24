<template>
  <form @submit.prevent="handleSubmit">
    <input class="display-name" type="name" name="name" v-model="name" placeholder="Change your display name" required>
    {{ name }}

    <span v-for:="post of posts" class="user-posts">Posts: {{ posts }}</span>
    <div class="up-img">
      <input type="file">
    </div>
    <button class="submit-btn">Save</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      posts: []
    }
  },
  methods: {
    handleSubmit() {
      //change name is half working
      this.name = '';
      this.posts.push(['1']);
      //TODO when user clicks on submit
      //where do I save the data that the user changed?
      //update the image on Profile Pic
      // POSTS
      //posts needs to be attached to the userId, 
      //userId will pull from the db total count? -- extra not needed.

    },
    onFileChange(e) {
      const file = e.target.files[0]
      console.log(file);
    },
  },
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
}

.display-name,
.submit-btn {
  width: 250px;
  align-self: center;
  margin: 30px;
}
</style>