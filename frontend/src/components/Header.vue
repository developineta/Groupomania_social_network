<template>
  <div>
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
    </h1>
    <v-card class="navbar d-flex col row-md" :color="'#4f545c'" min-height='50' tile>
      <router-link :to="{name:'AllPosts'}" id="allposts" class="navbar-brand nav-button" tag="button">Les publications</router-link>
      <router-link :to="{name:'NewPost'}" id="newpost" class="navbar-brand nav-button" tag="button">Créer une publication</router-link>
      <router-link :to="{name:'UserProfile', params: { id: user.userId }}" id="user-profile" class="navbar-brand nav-button" tag="button">Mon compte</router-link>
      <button v-on:click="deconnecter()" class="navbar-brand nav-button" href="#">Se déconnecter</button>
      <!--<div class="small-text">
        <span>{{user.firstName}} {{user.lastName}}</span>
      </div>-->
    </v-card>
  </div>
</template>

<script>

import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';
import authUser from "../services/auth";

export default {
  name: "Header",
  
  data() {
    return{
      sessionUserId: 0,
      adminAcces: 0,
      user: []
    }
  },

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
    const userId = sessionUserId;
    const adminAcces = adminAcces;
    console.log("userId getOneUser", userId);
    authUser.getOneUser(userId)
      .then(res => {
        console.log("user data", res.data[0]);
        this.user = res.data[0];
        this.sessionUserId = userId;
        this.adminAcces = adminAcces;
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
.nav-button {
  color: #ffffff;
}
</style>