<template>
  <div class="one-post">
    <Header />

    <div class="d-flex flex-column container p-5">
      <div v-if="post == 0" class="mx-auto mt-5 mb-10" elevation="24" width="600">
          <div class="my-15 mx-auto h4 text-center">Oups.. cette publication n'est pas là..</div>
      </div>
      <v-card class="mx-auto mt-5" v-if="post" :key="post.postId" elevation="24" width="600">
        <v-list-item five-line class="p-0">
          <v-list-item-content class="p-0">

            <router-link :to="`/user/${ id }`" class="name-date px-5 py-3" tag="button">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{dateFormat(post.postDate)}}</router-link>
            <v-divider horizontal></v-divider>

            <div class="title px-2 py-1">{{post.postTitle}}</div>
            
            <v-img class="mx-auto mb-2" :src="post.postImageUrl" :alt="post.postTitle" max-width="600" height="auto"></v-img>

            <v-divider class="mb-2" horizontal></v-divider>

            <div class="content p-2">{{post.postContent}}</div>

            <v-divider v-if="sessionUserId === id || adminUser === 1" horizontal style="border: 1px solid #FEFEFE"></v-divider>

            <button class="delete btn btn-secondary mx-5" v-if="sessionUserId === id || adminUser === 1" v-on:click.prevent="deletePost(post.postId)">Supprimer la publication</button>
            
          </v-list-item-content>
        </v-list-item>
        <div class="message">{{ message }}</div>
      </v-card>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
import Header from "../components/Header.vue";

import { mapState } from "vuex"

export default {
  name: 'OnePost',
  components: {
    Header
  },

  data() {
    return{
      id: null,
      post: null,
      message: ""
    };
  },
  
  mounted() {                                    
    this.getOnePost();
  },
  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),
  methods: {
    getOnePost(){
        const postId = this.$route.params.id;
        postService.getOnePost(postId)
        .then(res => {
          console.log(res.data);
          this.post = res.data[0];
          this.id = res.data[0].postAuthorId;
          this.adminAcces = res.data[0].postAdmin;
        })
    },

    deletePost(){
      const postId = this.$route.params.id;
      postService.deletePost(postId)
      .then((res) => {
        this.post = res.data[0];
        console.log("L'article a été supprimé !");
        this.$router.push('/post');
      })
    },

    dateFormat(date){
      const event = new Date(date);
      const data = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', data);
    }
  }    
}
</script>

<style scoped>
.one-post {
  height: 100%;
}
</style>