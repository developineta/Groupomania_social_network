<template>
  <div class="home">
    <Login v-if="!userLoggedIn"/>
    <Header v-if="userLoggedIn"/>
    <AllPosts v-if="userLoggedIn"/>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import Header from "../components/Header.vue";
import AllPosts from "../components/AllPosts.vue";

export default {
  name: "Home",
  components: {
    Login,
    Header,
    AllPosts
  },
  data() {
    return{
      loginSuccess: false     // False par défault et contiendra la validation si utilisateur sera authentifié
    };
  },

  created(){                        // Vérifie la session utilisateur
    this.userLoggedIn()
  },

  methods: {
    userLoggedIn(){                // Vérification si utilisateur est connecté et dans Local Storage
      if(localStorage.authorisedUser == undefined) {
        this.loginSuccess = false;
        console.log("Vous n'êtes pas connecté !");
      } else {
        this.loginSuccess = true;
        console.log("Vous êtes connecté !");
      }
    }
  }
}
</script>
