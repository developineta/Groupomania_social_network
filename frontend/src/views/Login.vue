<template>
    <div class="login">
        <h1 class="text-center">
            <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
        </h1>
        <div class="container p-5">
          
            <h2 class="h4 mb-4 text-center">{{title}}</h2>
            <form class="jumbotron py-6" @submit.prevent>

              <div class="sentence mb-2 text-center">Les champs sont requis</div>

              <label for="email">E-mail</label>
              <input class="form-control mb-4" type="email" id="email" v-model="email" placeholder="E-mail" title="Renseignez votre e-mail" required>

              <label for="password">Mot de passe</label>
              <input class="form-control mb-4" type="password" id="password" v-model="password" placeholder="Mot de passe" title="Renseignez votre mot de passe" required>

              <div class="error-msg">{{ message }}</div>

              <div class="btn-login-page mx-auto mt-6 mb-6 text-center">
                <button class="btn btn-secondary mx-5" @click="login" type="submit" title="Connexion">Se Connecter</button>
              </div>

              <div class="text-center">
                <p class="sentence">Vous n'avez pas encore de compte ?
                  <router-link :to="{name:'Signup'}" id="signup" class="sentence font-weight-bold mx-5 p-2" tag="button" title="Créer le compte">S'inscrire</router-link>
                </p>
              </div>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";                          // Bibliothèque JavaScript en tant que client HTTP. Permet de communiquer avec API en utilisant des requêtes

export default {
    name: "Login",

    data() {
        return {
          title: "Connexion",
          message : "",
          email : "",
          password : ""
        }
    },

    mounted() {                                       
      localStorage.removeItem('userToken');                   // Le token est supprimé dés qu'on se rend sur la page de connexion
    },

  methods: {
    login() {
      const email = this.email;
      const password = this.password;

      axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem('userToken', res.data.token),   // On garde le token dans le Local Storage
        this.$router.push('/post');                          // On accède à la page de publications
        location.reload();
      })
      .catch((e) => {
        if (e.response.status === 401) {
        this.message = "E-mail ou mot de passe incorrect";
        }
      })
    }
  }
}
</script>

<style scoped>
.logo-main {
  width: 300px;
}
.login {
  background-color: #36393f;
  height: 100%;
}
.container {
  border-top: 1px solid #FD2D01;
}
.h4, .sentence, label {
  color: #ffffff;
}
.jumbotron {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
  border-bottom: 1px solid #FD2D01;
}
input {
  max-width: 900px;
  background-color: #36393f;
  color: #ffffff;
}
.btn-secondary {
  background-color: #36393f;
  color: #ffffff;
}
.btn-secondary:hover,
.btn-secondary:focus,
#signup:hover,
#signup:focus {
  background-color: #36393f;
  color: #FD2D01;
  font-weight: bold;
}
</style>