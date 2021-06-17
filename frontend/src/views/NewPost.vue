<template>
  <div class="new-post">
    <Header />
    <div class="container p-5">
      <p class="h4 mb-4 text-center">Ajoutez une publication</p>
      <form class="jumbotron py-6" name="newPost" @submit.prevent = createPost()>
        <div class="sentence mb-2 text-center">Les champs requis *</div>
        <textarea name="title" class="form-control input" maxlength="60" placeholder="Le titre de votre publication *" title="Saisissez le titre de la publication" required></textarea>
        <textarea name="content" class="form-control input" maxlength="2000" placeholder="Le contenu de votre publication *" title="Saisissez le contenu de la publication" required></textarea>
        <div class="custom-file">
          <input name="image" type="file" class="file-input" v-on:change="submitImage($event)" />
          <label class="sentence file-label" for="image">Télécharger un fichier</label>
        </div>
        <button class="btn btn-secondary mx-5" v-on:click.prevent="createPost()" type="submit">Publier</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "NewPost",
  components: {
    Header
  },
  data() {
    return {
      title: "",
      content: "",
      image: ""
    }
  },
  methods: {
    createPost() {
      const formValid = document.getElementsByName("newPost")[0].checkValidity(); // ?? checkValidity()
      if (formValid) {
        this.$emit("sent", this.$data);
      }
    },
    submitImage(event) {
      this.$data.image = event.target.files[0];
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