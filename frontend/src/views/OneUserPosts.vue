<template>
  <div class="OneUserPosts">
    <Header v-if="userLoggedIn"/>

    <div v-if="userLoggedIn" class="d-flex flex-column">
      <v-card class="mx-auto mt-5" elevation="24" width="600">
        <v-list-item two-line class="px-0 py-0">
            <v-list-item-content class="px-0 py-0">
              <v-img class="user-picture mx-auto mb-2 text-center" :src="user.imageUrl" :alt="user.firstName" max-width="600" height="auto"></v-img>
              <div class="name px-5 py-3"> Toutes les publications de {{user.firstName}} {{user.lastName}}</div>
            </v-list-item-content>
        </v-list-item>
      </v-card>
      <div v-if="posts.length === 0" class="mx-auto mt-5 mb-10" elevation="24" width="600">
        <div class="my-15 mx-auto text-h4 text-center">Oups.. il n'y a pas de publications...</div>
      </div>
      <v-card class="mx-auto mt-5" v-for = "post in posts" :key="post.postId" elevation="24" width="600">
        <v-list-item five-line class="p-0">
          <v-list-item-content class="p-0">
            <div class="name-date px-5 py-3">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{post.postDate}}</div>
            <v-divider horizontal></v-divider>
            <router-link class="router-link" :to="{ name : 'OnePost', params: { id: post.postId }}">
              <div class="title px-2 py-1">{{post.postTitle}}</div>
              <v-img class="mx-auto mb-2" :src="post.postImageUrl" :alt="post.postTitle" max-width="600" height="auto"></v-img>
              <v-divider class="mb-2" horizontal></v-divider>
              <div class="content p-2">{{post.postContent}}</div>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

  </div>
</template>

<script>

import Header from '@/components/Header.vue';

export default {
  name: 'OneUserPosts',

  components: {
    Header,
  },

  data() {
    return{
      userLoggedIn: false,
      posts: []
    };
  },

  created(){
    this.userLoggedIn()
  },

  mounted() {
    if(this.userLoggedIn === true) {
      this.allUserPosts();
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

    allUserPosts(){
      connectedUser.get("/posts/oneuser")
      .then(res => {
          this.posts = res.data;
      })
    },
  }
}
</script>

<style>

</style>