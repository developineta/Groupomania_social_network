<template>
    <div class="all-posts">
        <Header />
        <div class="container d-flex flex-column">
            <div v-if="posts.length === 0" class="empty-message mx-auto mt-5 mb-10" elevation="24" width="600">
                <div class="mt-15 mb-15 mx-auto text-h4 text-center">Un instant, les publications arrivent..</div>
            </div>
            <v-card class="jumbotron card mx-auto mt-5 text-center" v-for="post in posts" :key="post.postId" elevation="24" width="600">
                <v-list-item two-line class="p-0">
                    <v-list-item-content class="card-body p-0">
                        <router-link class="router-link" :to="{ name : 'OnePost', params: { id: post.postId }} " title="Voir la publication">
                            <div class="card-title title px-5 py-3 text-uppercase">{{post.postTitle}}</div>
                            <img v-if="post.postImageUrl !== ''" class="post-image card-img" :src="post.postImageUrl" :alt="post.postTitle" max-width="100" height="auto" />
                        </router-link>
                        <v-divider horizontal style="border: 1px solid #FEFEFE"></v-divider>
                        <div class="name-date px-5 py-3 mt-2">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{dateFormat(post.postDate)}}</div>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </div>
    </div>
</template>

<script>
import postService from "../services/postService";
import Header from "../components/Header.vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat)

export default {
    name: "AllPosts",
    components: {
        Header
    },
    data(){
        return {
            posts : []                        
        }
    },

    mounted() { 
        this.getAllPosts();
    },
    methods: {
        getAllPosts(){ 
            postService.getAllPosts()
            .then(res => {
                console.log(res.data)
                this.posts = res.data;
            })
            .catch(err => console.log(err))
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
.all-posts {
  background-color: #36393f;
  height: 100%;
}
.container {
  border-top: 1px solid #FD2D01;
}
.h4, .required {
  color: #ffffff;
}
.jumbotron {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
  border-bottom: 1px solid #FD2D01;
}
.post-image {
    max-width: 500px;
    border: 20px solid #D4D4D4;
    box-shadow: 3px 5px 5px #36393f;
}
.router-link:hover, .router-link:focus {
    text-decoration: none
}
.post-image:hover, .post-image:focus {
    box-shadow: 10px 10px 10px #3d3d3d;
}
.card-title, .name-date {
    color: #ffffff;
    background-color: #36393f;
    border-radius: 10px;
}
.card-title:hover,
.card-title:focus {
    color: #FFD7D7;
    text-decoration: underline;
}
</style>