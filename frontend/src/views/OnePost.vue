<template>
  <div class="OnePublication">
    <Header />

    <div class="d-flex flex-column">
      <div v-if="post == 0" class="mx-auto mt-5 mb-10" elevation="24" width="600">
          <div class="my-15 mx-auto text-h4 text-center">Oups.. cette publication n'est pas là..</div>
      </div>
      <v-card class="mx-auto mt-5" v-if="post !== 0" :key="post.postId" elevation="24" width="600">
        <v-list-item five-line class="p-0">
          <v-list-item-content class="p-0">
            <div class="name-date px-5 py-3">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{post.postDate}}</div>
            <v-divider horizontal></v-divider>
            <div class="title px-2 py-1">{{post.postTitle}}</div>
            <v-img class="mx-auto mb-2" :src="post.postImageUrl" :alt="post.postTitle" max-width="600" height="auto"></v-img>
            <v-divider class="mb-2" horizontal></v-divider>
            <div class="content p-2">{{post.postContent}}</div>
            <v-divider v-if="sessionUserId === post.postAuthorId || adminAcces === 1" horizontal style="border: 1px solid #FEFEFE"></v-divider>
            <button v-if="sessionUserId === post.postAuthorId || adminAcces === 1" v-on:click="deletePost(post.postId)" class="delete">Supprimer la publication</button>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
// v-if="userLoggedIn" add to line 3, 5
//import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

import Header from "../components/Header.vue";

export default {
  name: 'OnePost',
  components: {
    Header
  },
  /*data() {
    return{
      userLoggedIn: false,
      sessionUserId: 0,
      adminAcces: 0
    };
  },

  created(){
    this.userLoggedIn()
  },

  mounted() {
    if(this.userLoggedIn === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                           
      let decodedToken = jwt.verify(token, process.env.VUE_APP_SECRET_TOKEN); // N'est pas fait le token in front
      this.sessionUserId = decodedToken.userId                                            
      this.adminAcces = decodedToken.admin                                       
      this.getOnePost();
    }
  },

  methods: {
    userLoggedIn(){                                    // Item dans Local Storage
      if(localStorage.groupomaniaUser == undefined){
        this.userLoggedIn = false;
        console.log("Utilisateur n'est pas connecté !");
        this.$router.push({ name:'Home' })
      } else {
        this.userLoggedIn = true;
        console.log('Utilisateur est connecté !');
      }
    },

    getOnePost(){
        const postId = this.$route.params.id;
        connectedUser.get(`/posts/${postId}`) // a définer connectedUser
        .then(res => {
            if(res.data.post[0] === undefined) {
                this.post = 0;
            } else {
                this.post = res.data.post[0];
            }
        })
    },

    deletePost(id){
      /*const PostId = id;
      connectedUser.delete(`/posts/${postId}`)
      .then((res) => {
        if(res.status === 200) {
            location.href = '/';
        }
      })
    } 
  }*/
}
</script>

<style scoped>

</style>