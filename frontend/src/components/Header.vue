<template>
  <div>
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
    </h1>

    <v-card class="navbar d-flex col row-md" :color="'#4f545c'" min-height='50' tile>

      <router-link :to="{name:'AllPosts'}" id="allposts" class="navbar-brand nav-button" tag="button" title="Voir les publications">Les publications</router-link>

      <router-link :to="{name:'NewPost'}" id="newpost" class="navbar-brand nav-button" tag="button" title="Créez une publication">Créer une publication</router-link>

      <router-link :to="{name:'UserProfile', params: { id: sessionUserId }}" id="user-profile" class="navbar-brand nav-button" tag="button" title="Voir ou modifier mon compte">Mon compte</router-link>
      
      <button v-on:click="deconnecter()" class="navbar-brand nav-button" href="#" title="Déconnexion">Se déconnecter</button>

      <div class="text-right font-italic admin" v-if="adminUser === 1">moderateur</div>    
      
    </v-card>
  </div>
</template>

<script>

import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';
import authUser from "../services/auth";
import {mapState} from "vuex";

export default {
  name: "Header",
  
  data() {
    return {
      user: [],
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),

  mounted () {
    const token = localStorage.getItem('userToken');
    const decodedToken = jwt.decode(token, process.env.VUE_APP_SECRET_TOKEN);   
    const sessionUserId = decodedToken.userId;
    const adminAcces = decodedToken.admin;

    this.$store.dispatch('setAuthUser', sessionUserId);
    this.$store.dispatch('setAdminUser', adminAcces);

  },

  methods: {
    getOneUser(){
    let userId = this.sessionUserId;
    let adminAcces = adminAcces;
    authUser.getOneUser(userId)
      .then(res => {
        this.user = res.data[0];
      })
    },

    deconnecter() {    // Supprime utilisateur du Local Storage
        localStorage.removeItem('userToken');
        location.href = '/';
    }
  }
}
</script>

<style scoped>
.logo-main {
  width: 300px;
}
.d-flex {
  justify-content: space-around;
}
.nav-button, .admin {
  color: #ffffff;
}
.nav-button:hover, .nav-button:focus {
  color: #FFD7D7;
  text-decoration: underline;
}
</style>