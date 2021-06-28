<template>
  <div class="one-post">
    <Header />

    <div class="d-flex flex-column container p-5">
      <div v-if="post == 0" class="mx-auto mt-5 mb-10" elevation="24" width="600">
          <div class="my-15 mx-auto h4 text-center">Un instant...</div>
      </div>
      <div class="message h4 text-center">{{ message }}</div>
      <router-link v-if="post == 0" :to="{name:'AllPosts'}" id="posts-btn" class="btn btn-secondary m-auto" tag="button" title="Voir les publications">Rétour aux publications</router-link>

      <v-card v-if="post" class="card mx-auto mt-5" :key="post.postId" elevation="24" width="600">
        <v-list-item five-line class="p-0">
          <v-list-item-content class="card-content p-0">

            <router-link :to="`/user/${ id }`" class="user-link pl-2 mb-0" tag="button" title="Voir le profil">
              <div class="row user-link-container p-2">
                
                <div v-if="post.postAuthorImageUrl == '/images/imageDefault.png'">
                    <img class="user-picture mx-auto m-auto card-img" :src="'http://localhost:3000/images/imageDefault.png'" :alt="post.postAuthorFirstName" title="L'image d'utilisateur" />
                </div>
                
                <div v-else>
                  <img class="user-picture mx-auto m-auto card-img" :src="post.postAuthorImageUrl" :alt="post.postAuthorFirstName" title="L'image d'utilisateur"/>
                </div>
                
                <div class="h6 m-auto">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}}</div>
              </div>
            
            </router-link>
            <v-divider horizontal></v-divider>

            <div class="title text-center text-uppercase px-2 py-4">{{post.postTitle}}</div>
            
            <v-img class="post-image mx-auto" :src="post.postImageUrl" :alt="post.postTitle" title="L'image de la publication"></v-img>
            
            <div class="content p-4">{{post.postContent}}</div>

            <small class="font-italic date pl-2 my-6">Publié le {{dateFormat(post.postDate)}}</small>

            <v-divider v-if="sessionUserId === id || adminUser === 1" horizontal style="border: 1px solid #FEFEFE"></v-divider>

            <button v-if="sessionUserId === id || adminUser === 1" v-on:click="deletePost()" class="delete btn btn-secondary m-auto" title="Supprimer la publication">Supprimer la publication</button>
            
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
import Header from "../components/Header.vue";

import { mapState } from "vuex";

export default {
  name: 'OnePost',
  components: {
    Header
  },

  data() {
    return{
      id: null,
      post: [],
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
          this.post = res.data[0];
          this.id = res.data[0].postAuthorId;
          this.adminAcces = res.data[0].postAdmin;
        })
        .catch(error => {
          console.log( error )
        })
    },

    deletePost(){
      let postId = this.$route.params.id;
      let postImageUrl = this.postImageUrl;
      postService.deletePost(postId, postImageUrl)
      .then((res) => {
        this.post = res.data[0];
        this.message = "La publication a été supprimé !";
        setTimeout( () => this.$router.push({ path: '/post'}), 2500);
      })
      .catch(error => {
          console.log( error )
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
#posts-btn {
  max-width: 200px;
}
.one-post {
  background-color: #36393f;
  height: 100%;
}
.container {
  border-top: 1px solid #FD2D01;
}
.user-link {
  border: 6px solid #FFD7D7;
}
.user-link:hover, .user-link:focus {
  color: #FFD7D7;
  text-decoration: underline;
}
.user-link-container:hover, .user-link-container:focus {
  background-color: #36393f;
  border-radius: 5px;
}
.card {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
  border-bottom: 1px solid #FD2D01;
}
.card-content, .h4 {
  color: #ffffff;
}
.title, .content {
  background-color: #36393f
}
.content {
  border: 2px solid #FFD7D7;
}
.post-image {
  max-width: 600px;
  border-top: 6px solid #D4D4D4;
  border-bottom: 5px solid #D4D4D4;
}
.user-picture {
  max-width: 50px;
  border: 3px solid #D4D4D4;
}
.delete:hover, .delete:focus {
  color: #FD2D01;
  background-color: #36393f;
  text-decoration: underline;
  font-weight: bold;
}
</style>