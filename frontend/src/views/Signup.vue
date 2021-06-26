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
          <div class="validity-msg">{{ messageValidity }}</div>
          <input class="form-control mb-4" v-model="firstName" v-on:change="firstNameValid" ref="firstName" type="text" placeholder="Prénom *" title="Saisissez votre prénom" required>
          <input class="form-control mb-4" v-model="lastName" v-on:change="lastNameValid" ref="lastName" type="text" placeholder="Nom *"  title="Saisissez votre nom de famille" required>
          <input class="form-control mb-4" v-model="email" v-on:change="emailValid" ref="email" type="email" placeholder="E-mail *" title="Saisissez votre adresse e-mail" required>
          <input class="form-control mb-4" v-model="password" v-on:change="passwordValid" ref="password" type="password" placeholder="Mot de passe *" title="Saisissez un mot de passe" required>
          <input class="form-control mb-4" v-model="confirmPassword" ref="confirmPassword" type="password" placeholder="Confirmer mot de passe *" title="Confirmez votre mot de passe" required>
        </div>
        <div class="error-msg">{{ message }}</div>
        <div class="btn-signup-page mx-auto mt-6 mb-6">
          <button class="btn btn-secondary mx-5" id="signup" @click="signup" type="submit" title="S'inscrire">S'inscrire</button>
        </div>
      </form>
      <div class="btn-signup-page">
        <router-link :to="{name:'Login'}" tag="button" class="connexion btn btn-secondary mx-5" title="Se connecter">Se Connecter</router-link>
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
      firstName: "",
      lastName: "",
      email: "",
      password : "",
      confirmPassword: "",
      messageValidity: "",
      message: "",
      validFirstName: false,
      validLastName: false,
      validEmail: false,
      validPassword: false
    }
  },

  methods: {
  
    signup() {
      const firstName = this.firstName;
      const lastName = this.lastName;
      const email = this.email;
      const password = this.password;
      const confirmPassword = this.confirmPassword;
      const validFirstName = this.validFirstName;
      const validLastName = this.validLastName;
      const validEmail = this.validEmail;
      const validPassword = this.validPassword;
      console.log(confirmPassword);

      if(validFirstName === true && validLastName === true && validEmail == true && validPassword == true && password === confirmPassword && password.length >= 8 && firstName.length >= 3 && lastName.length >= 3){
        axios.post("http://localhost:3000/api/user/signup", {
          firstName,
          lastName,
          email,
          password
        })
        .then((res) => {
          console.log(res.data.message);
          this.$router.push('/user/login');
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.message = "Veuillez corriger le formulaire !";
          }
          if (e.response.status === 500) {
            this.message = "E-mail d'utilisateur existe déjà !";
          }
        })
      } else {
        this.message = "Veuillez corriger les champs du formulaire !";
      }
    },

    firstNameValid() {
      const firstNameRe = /^[A-Za-zÀ-ÿ ]+$/;

      if (firstNameRe.test(this.firstName)) {
        this.validFirstName = true,
        this.messageValidity = ""
      } else {
        this.validFirstName = false;
        this.messageValidity = "Le prénom doit être au mons 3 caractères long et contenir que de lettres et espaces";
      }
    },

    lastNameValid() {
      const lastNameRe = /^[A-Za-zÀ-ÿ ]+$/;

      if (lastNameRe.test(this.lastName)) {
        this.validLastName = true,
        this.messageValidity = ""
      } else {
        this.validLastName = false;
        this.messageValidity = "Le nom doit être au mons 3 caractères long et contenir que de lettres et espaces";
      }
    },

      emailValid() {
      const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRe.test(this.email)) {
        this.validEmail = true,
        this.messageValidity = ""
      } else {
        this.validEmail = false;
        this.messageValidity = "Le format d'e-mail n'est pas valide, Ex: mail@mail.com";
      }
    },

    passwordValid() {
      const passwordRe = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      if (passwordRe.test(this.password)) {
        this.validPassword = true,
        this.messageValidity = ""
      } else {
        this.validPassword = false;
        this.messageValidity = "Le format de mot de passe n'est pas correct ! Le mot de passe doit contenir au moins 8 caractères, au moins 1 majuscule, au moins 1 minuscule, au moins 1 chiffre et doit être sans les espaces !";
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