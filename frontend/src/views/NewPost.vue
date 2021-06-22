<template>
  <div class="new-post">
    <Header />

    <div class="container p-5">
      <p class="h4 mb-4 text-center">{{pageTitle}}</p>
      
      <form class="jumbotron py-6" @submit.prevent enctype="multipart/form-data">
        <div class="sentence mb-2 text-center">Les champs requis *</div>

        <textarea name="title" v-model="title" class="form-control input" maxlength="60" placeholder="Le titre de votre publication *" title="Saisissez le titre de la publication" required></textarea>
        <textarea name="content" v-model="content" class="form-control input" maxlength="2000" placeholder="Le contenu de votre publication *" title="Saisissez le contenu de la publication" required></textarea>
        
        <div class="custom-file">
          <input name="image" type="file" ref="file" class="file-input" @change.prevent="chooseImage" />
          <label class="sentence file-label" for="image">Télécharger un fichier</label>
        </div>
        <div class="msg">{{ message }}</div>
        <button class="btn btn-secondary mx-5" v-on:click.prevent="createPost" type="submit">Publier</button>
      
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
      image: null,
      message: ""
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),

  methods: {
    createPost() {
      const title  = this.title
      const content = this.content
      const file = this.$refs.file.files[0];
      console.log(file);

      let formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('content', content);

      console.log("données formulaire", formData);


      if(title.length !== 0 && content.length !== 0 ){
        
        postService.create(formData,{
          headers :{
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(err => console.log(err))

      } else {
          this.message = "Veuillez remplir les champs";
        }
    },

    chooseImage() {
      const file = this.$refs.file.files[0];
      // console.log(file);
      this.image = file
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