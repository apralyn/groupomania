<template>
  <div>
    post here 
    {{ $route.params.id }}
  </div>
  <router-link to="/feed"><button>BACK</button></router-link>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return{
      post: ''
    }
  },
  methods: {
    async getPost() {
      let res = await axios.get(`/api/posts/viewpost/${id}`)
        .then(response => this.post = response.data);
      console.log(res);
    },
  },
  computed: {
    postId(){
      return parseInt(this.$route.params.id)
    }
  }
}
</script>