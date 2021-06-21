<template>
  <div class="OneUserPosts">
    <Header />

    <div class="d-flex flex-column">
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
            <div class="name-date px-5 py-3">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{dateFormat(post.postDate)}}</div>
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
import authService from "../services/auth";
import Header from "../components/Header.vue";

export default {
  name: 'OneUserPosts',

  components: {
    Header,
  },

  data() {
    return {
      user: [],
      posts: []
    };
  },

  mounted() {
      this.oneUserPosts();
  },

  methods: {
    oneUserPosts(){
      const userId = this.$route.params.id;
      authService.getOneUser(userId)
      .then(res => {
        console.log("user data", res.data[0]);
        this.user = res.data[0]
      })
      authService.oneUserPosts(userId)
      .then(res => {
        console.log(res.data)
        this.posts = res.data;
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

<style>

</style>