<template>
  <div class="new-post">
    <Header />

    <div class="container p-5">
      <p class="h4 mb-4 text-center">{{pageTitle}}</p>
      
      <form class="formCreate" @submit.prevent="createPost">

        <div class="form-area">
          <label for="title"></label>
          <textarea name="title" class="title-post" placeholder="Le titre de votre publication" required v-model="title"></textarea> <br>
        </div>
        
        <div class="form-area">
          <label for="content"></label>
          <textarea name="content" class="content-post" placeholder="Le contenu de votre publication" required v-model="content"></textarea> <br>
        </div>

        <div class="form-area">
          <label for="image">
            <input class="image-post" type="file" name="image" ref="file" v-on:change="setImage"> <br>
          </label>
        </div>

        <button type="submit">Publier</button>

      </form>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
import Header from "../components/Header.vue";

import {mapState} from "vuex";

export default {
  name: "NewPost",
  components: {
    Header
  },

  data() {
    return {
      pageTitle: "Ajoutez une publication",
      title: "",
      content: "",
      file: "",
      message: ""
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),

  methods: {

    createPost() {
      let authorId = this.sessionUserId;
      const formCreate = document.getElementsByClassName("formCreate")[0];
      let data = new FormData(formCreate);
      let postData = (authorId, data);
          
      postService.createPost(postData)
      .then(res => {
        if (res) {
            window.location.reload()
        }
      })
      .catch(error => {
          console.log( error )
      });
    },

    setImage() {
      this.file = this.$refs.file.files[0];
      console.log(this.file)
    }
  }
}
</script>

<style scoped>
.new-post {
  background-color: #36393f;
  height: 100%;
}
.container {
  border-top: 1px solid #FD2D01;
}
.h4, .sentence {
  color: #ffffff;
}
.jumbotron {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
  border-bottom: 1px solid #FD2D01;
}
.input {
  max-width: 900px;
  background-color: #36393f;
  color: #ffffff;
}
.btn-secondary {
  background-color: #36393f;
  color: #ffffff;
}
.btn-secondary:hover,
.btn-secondary:focus {
  background-color: #36393f;
  color: #FD2D01;
  font-weight: bold;
}
</style>