<template>
  <div>
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
    </h1>
    <v-card class="navbar d-flex col row-md" :color="'#4f545c'" min-height='50' tile>
      <router-link :to="{name:'AllPosts'}" id="allposts" class="navbar-brand nav-button" tag="button">Les publications</router-link>
      <router-link :to="{name:'NewPost'}" id="newpost" class="navbar-brand nav-button" tag="button">Créer une publication</router-link>
      <router-link :to="{name:'UserProfile'}" id="user-profile" class="navbar-brand nav-button" tag="button">Mon compte</router-link>
      <button v-on:click="deconnecter()" class="navbar-brand nav-button" href="#">Se déconnecter</button>
    </v-card>
  </div>
</template>

<script>

import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';
//import authUser from "../services/auth";

export default {
  name: "Header",
  
  data() {
    return{
      sessionUserId: 0,
    }
  },

  mounted () {
    
      /*const token = localStorage.getItem('userToken');
      console.log("header get token", token);
      const decodedToken = jwt.verify(token, process.env.VUE_APP_SECRET_TOKEN);   
      const userId = decodedToken.userId;
      console.log(userId);*/
    /*const token = localStorage.getItem('userToken');
    console.log(token);
    function getToken(req) {
      token = req.headers.authorization.split(' ')[1];
      let decodedToken = jwt.verify(token, process.env.VUE_APP_SECRET_TOKEN);
      console.log(decodedToken);
      this.decodedToken = decodedToken.userId;
    }
    getToken();*/
    
  },

  methods: {
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