<template>
  <div class="signup">
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
    </h1>
    <div class="container p-5">
      <p class="h4 mb-4 text-center">{{title}}</p>
      <form class="jumbotron py-6" @submit.prevent>
        <div class="required mb-2 text-center">Les champs requis *</div>
        <div class="signup-inputs">
          <input class="form-control mb-4" v-model="firstName" ref="firstName" type="text" placeholder="Prénom *" title="Saisissez votre prénom" required>
          <input class="form-control mb-4" v-model="lastName" ref="lastName" type="text" placeholder="Nom *"  title="Saisissez votre nom de famille" required>
          <input class="form-control mb-4" v-model="email" ref="email" type="email" placeholder="E-mail *" title="Saisissez votre adresse e-mail" required>
          <input class="form-control mb-4" v-model="password" ref="password" type="password" placeholder="Mot de passe *" title="Saisissez un mot de passe" required>
          <input class="form-control mb-4" v-model="confirmPassword" ref="confirmPassword" type="password" placeholder="Confirmer mot de passe *" title="Confirmez votre mot de passe" required>
        </div>
        <div class="error-msg">{{ message }}</div>
        <div class="btn-signup-page mx-auto mt-6 mb-6">
          <button class="btn btn-secondary mx-5" id="signup" @click="signup" type="submit">S'inscrire</button>
        </div>
      </form>
      <div class="btn-signup-page">
        <router-link :to="{name:'Login'}" tag="button" class="connexion btn btn-secondary mx-5">Se Connecter</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Signup',

  data() {
    return {
      title: "Inscription",
      firstName: "Arthur",
      lastName: "Haricot",
      email: "haricot@haricot.com",
      password : "Haricot123",
      confirmPassword: "Haricot123",
      message: "",
    }
  },

  methods: {
    signup() {
      const firstName = this.firstName;
      const lastName = this.lastName;
      const email = this.email;
      const password = this.password;
      const confirmPassword = this.confirmPassword;
      console.log(confirmPassword);

      if(password === confirmPassword){
        axios.post("http://localhost:3000/api/user/signup", {
          firstName,
          lastName,
          email,
          password
        })
        .then((res) => {
          console.log("Message backend :", res.data.message);
          this.$router.push('/user/login');
        })
        .catch((error) => {
            this.message = error.res.data.error;
        })
      } else {
        this.message = "Veuillez confirmer le mot de passe !";
      }
    }
  }
}
</script>

<style scoped>
.logo-main {
  width: 300px;
}
.signup {
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
input {
  max-width: 900px;
  background-color: #36393f;
  color: #ffffff;
}
.signup-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-signup-page {
  display: flex;
  justify-content: center;
}
.btn-secondary {
  background-color: #36393f;
  color: #ffffff;
}
.btn-secondary:hover,
.btn-secondary:focus {
  background-color: #36393f;
  color: #FD2D01;
  font-weight: bold;
}
.connexion {
  background-color: #4f545c;
}
</style>