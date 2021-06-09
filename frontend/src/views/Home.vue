<template>
  <div class="home">
    <Header />
    <Login v-if="!loginSuccess" />
    <AllPosts v-if="loginSuccess" />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Login from "../components/Login.vue";
import AllPosts from "../components/AllPosts.vue";

export default {
  name: "Home",
  components: {
    Header,
    Login,
    AllPosts,
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