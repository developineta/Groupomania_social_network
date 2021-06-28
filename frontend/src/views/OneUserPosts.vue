<template>
  <div class="user-posts">
    <Header />

    <div class="container d-flex flex-column">
      <v-card class="user-card mx-auto mt-5" elevation="24" width="600">
        <v-list-item two-line class="px-0 py-0">
            <v-list-item-content class="card-content px-0 py-0">
              <v-divider horizontal style="border: 1px solid #36393f"></v-divider>

              <div v-if="user.imageUrl == '/images/imageDefault.png'" class="mt-1 text-center">
                <img class="user-picture mx-auto mb-2 card-img" :src="'http://localhost:3000/images/imageDefault.png'" :alt="user.firstName" title="L'image d'utilisateur" />
              </div>

              <div v-else class="mt-1 text-center">
                <img class="user-picture mx-auto mb-2 card-img" :src="user.imageUrl" :alt="user.firstName" title="L'image d'utilisateur" />
              </div>
              
              <div class="user-title h5 px-5 py-3 text-center"> Toutes les publications de {{user.firstName}} {{user.lastName}}</div>
            
            </v-list-item-content>
        </v-list-item>
      </v-card>
      <div v-if="posts.length === 0" class="mx-auto mt-5 mb-10" elevation="24" width="600">
        <div class="my-15 mx-auto text-h4 text-center">Oups.. il n'y a pas de publications...</div>
      </div>
      
      <v-card class="card mx-auto my-5" v-for = "post in posts" :key="post.postId" elevation="24" width="600">
        <v-list-item five-line class="p-0">
          <v-list-item-content class="card-content p-0">

            <v-divider horizontal></v-divider>

            <router-link class="router-link pb-6" :to="{ name : 'OnePost', params: { id: post.postId }}" title="Voir la publication">
              
              <div class="title text-center text-uppercase px-2 py-4">{{post.postTitle}}</div>
              
              <v-img class="post-image mx-auto" :src="post.postImageUrl" :alt="post.postTitle" title="L'image de la publication"></v-img>
              
              <div class="content p-4 mb-4">{{post.postContent}}</div>

              <small class="font-italic date pl-6">Publié le {{dateFormat(post.postDate)}}</small>
            
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
        this.user = res.data[0]
      })
      authService.oneUserPosts(userId)
      .then(res => {
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

<style scoped>
.user-posts {
  background-color: #36393f;
  height: 100%;
}
.container {
  border-top: 1px solid #FD2D01;
}
.user-card {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
  border-bottom: 1px solid #FD2D01;
}
.user-picture {
  max-width: 100px;
  border: 5px solid #D4D4D4;
  box-shadow: 5px 5px 5px #36393f;
}
.user-title {
  color: #ffffff;
  background-color: #36393f;
}
.card {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
  border-bottom: 1px solid #FD2D01;
}
.title, .content, .date {
  color: #ffffff;
  background-color: #36393f;
}
.content {
  border: 2px solid #FFD7D7;
}
.post-image {
  max-width: 600px;
  border-top: 6px solid #D4D4D4;
  border-bottom: 5px solid #D4D4D4;
}
.router-link:hover, .router-link:focus {
    text-decoration: none
}
.title:hover,
.title:focus {
    color: #FFD7D7;
    text-decoration: underline;
}
.date {
  background-color: #4f545c;
}
</style>