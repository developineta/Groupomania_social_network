<template>
    <div class="all-posts">
        <Header />
        <div class="d-flex flex-column">
            <div v-if="posts.length === 0" class="empty-message mx-auto mt-5 mb-10" elevation="24" width="600">
                <div class="mt-15 mb-15 mx-auto text-h4 text-center">Un instant, les publications arrivent..</div>
            </div>
            <v-card class="card mx-auto mt-5 text-center" v-for="post in posts" :key="post.postId" elevation="24" width="600">
                <v-list-item two-line class="p-0">
                    <v-list-item-content class="card-body p-0">
                        <div class="name-date px-5 py-3">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{dateFormat(post.postDate)}}</div>
                        <v-divider horizontal style="border: 1px solid #FEFEFE"></v-divider>
                        <router-link class="router-link" :to="{ name : 'OnePost', params: { id: post.postId }}">
                            <div class="card-title title px-5 py-3">{{post.postTitle}}</div>
                            <img v-if="post.postImageUrl !== ''" class="post-image card-img-bottom px-5 py-3" :src="post.postImageUrl" :alt="post.postTitle" max-width="100" height="auto" />
                        </router-link>
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

</style>