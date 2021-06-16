<template>
    <div class="d-flex flex-column">
        <div v-if="publications.length === 0" class="empty-message mx-auto mt-5 mb-10" elevation="24" width="600">
            <div class="mt-15 mb-15 mx-auto text-h4 text-center">Oups.. il n'y a pas de publications..</div>
        </div>
        <v-card class="mx-auto mt-5" v-for = "post in posts" :key="post.postId" elevation="24" width="600">
            <v-list-item two-line class="p-0">
                <v-list-item-content class="p-0">
                    <div class="name-date px-5 py-3">Publié par {{post.postAuthorFirstName}} {{post.postAuthorLastName}} | le {{dateFormat(post.postDate)}}</div>
                    <v-divider horizontal style="border: 1px solid #FEFEFE"></v-divider>
                    <router-link class="router-link" :to="{ name : 'OnePost', params: { id: post.postId }}">
                        <div class="title px-5 py-3">{{post.postTitle}}</div>
                        <div class="post-image px-5 py-3">{{post.postImageUrl}}</div>
                    </router-link>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>

export default {
  name: "AllPosts",

    /*data(){
        return {
            posts: [],
        }
    },

    mounted() {
        this.getAllPosts()    // Récuperation de toutes les publications
    },

    methods: {
        getAllPosts()
    }*/
}
</script>

<style scoped>

</style>
