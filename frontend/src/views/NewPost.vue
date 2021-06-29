<template>
  <div class="new-post">
    <Header />

    <div class="container p-5">
      <p class="h4 mb-4 text-center">{{pageTitle}}</p>
      
      <form class="jumbotron py-6 formCreate" @submit.prevent="createPost">
        <div class="required mb-2 text-center">Les champs requis *</div>
        
        <div class="post-inputs">
          <textarea name="title" v-model="title" class="input form-control mb-4 pt-5 pb-0" placeholder="Le titre de votre publication *" title="Saisissez le titre de votre publication" required></textarea>
        
          <textarea name="content" v-model="content" class="input form-control mb-4 pt-5 pb-0" placeholder="Le contenu de votre publication *" title="Saisissez le contenu de votre publication" required></textarea>

          <div class="col">
            <input class="image-post row mt-2" type="file" name="image" ref="file" v-on:change="setImage">
            <div class="font-italic text-p row py-2">Les fichiers acceptés: JPG, JPEG, PNG, GIF</div>

            <div id="preview">
              <img class="img-preview mt-1" v-if="url" :src="url" />
            </div>
          </div>

        </div>

        <div class="btn-newpost mx-auto mt-6 mb-6">
          <button type="submit" class="btn btn-secondary mx-5 px-5" title="Publier">Publier</button>
        </div>
        <div class="message h4 text-center mt-8">{{ message }}</div>

      </form>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
import Header from "../components/Header.vue";

import {mapState} from "vuex";                      // Importation données de Vuex store

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
      url: null,
      message: ""
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,     // Récupération de user Id et Admin de Vuex store
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
          this.message = res.data.message;
          setTimeout( () => this.$router.go(), 2500);
        }
      })
      .catch(e => {
          console.log(e);
      })
    },

    setImage() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);        // Création de l'apperçu de l'image avant publication
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
.h4, .required, .text-p {
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
.image-post {
  border-radius: 10px;
}
.btn-newpost {
  display: flex;
  justify-content: center;
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
.img-preview {
  max-width: 150px;
  border: 2px solid #D4D4D4;
}
</style>