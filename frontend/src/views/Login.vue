<template>
    <div class="login">
        <h1 class="text-center">
            <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
        </h1>
        <div class="container p-5">
            <p class="h4 mb-4 text-center">{{title}}</p>
            <!-- <p>Votre adresse mail : {{email}}</p> -->
            <!-- <a :href="link">Lien vers autre site</a> -->
            <form class="jumbotron py-6" @submit.prevent>
              <div class="sentence mb-2 text-center">Les champs sont requis</div>
              <input class="form-control mb-4" type="email" v-model="email" placeholder="E-mail" title="Renseignez votre e-mail" required>
              <input class="form-control mb-4" type="password" v-model="password" placeholder="Mot de passe" title="Renseignez votre mot de passe" required>

              <div class="error-msg">{{ message }}</div>
              <div class="btn-login-page mx-auto mt-6 mb-6">
                <button class="btn btn-secondary mx-5" @click="login" type="submit">Se Connecter</button>
              </div>

              <div class="text-center">
                <p class="sentence">Vous n'avez pas encore de compte ?
                  <router-link :to="{name:'Signup'}" id="signup" class="sentence font-weight-bold mx-5" tag="button">S'inscrire</router-link>
                </p>
              </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Login",

    data() {
        return {
            title: "Connexion",
            message : "",
            email : "haricot@haricot.com",
            password : "Haricot123",
            //link : "facebook.com"
        }
    },

    methods: {
        login() {
            const email = this.email;
            const password = this.password;

            axios.post("http://localhost:3000/api/user/login", {
                email,
                password
            })
            .then((res) => {
              localStorage.setItem('userToken', res.data.token);   // On garde dans le Local Storage
              this.$router.push('/post');
              location.reload();
            })
            .catch((error) => {
                this.message = error.response.data.error;                       // Le message d'erreur du backend
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
.h4, .sentence {
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
.btn-login-page {
  display: flex;
  justify-content: center;
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