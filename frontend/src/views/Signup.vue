<template>
  <div class="signup">
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
    </h1>
    <div class="container p-5">
      <p class="h4 mb-4 text-center">{{title}}</p>
      <form class="jumbotron py-6" @submit.prevent="signup()">
        <div class="required mb-2 text-center">Les champs requis *</div>
        <div class="signup-inputs">

          <input id="firstName" class="form-control mb-4" v-model.trim="firstName" :class="{error: validation.hasError('firstName'), valid: validation.isTouched('firstName') && !validation.hasError('firstName')}" placeholder="Prénom *" title="Saisissez votre prénom" />
          <div class="error" v-if="validation.hasError('firstName')">{{ nameError }}</div>
          
          <input id="lastName" class="form-control mb-4" v-model.trim="lastName" :class="{error: validation.hasError('lastName'), valid: validation.isTouched('lastName') && !validation.hasError('lastName')}" placeholder="Nom *"  title="Saisissez votre nom de famille" />
          <div class="error" v-if="validation.hasError('lastName')">{{ nameError }}</div>

          <input id="email" class="form-control mb-4" v-model.trim="email" :class="{error: validation.hasError('email'), valid: validation.isTouched('email') && !validation.hasError('email')}" placeholder="E-mail *" title="Saisissez votre adresse e-mail" />
          <div class="error" v-if="validation.hasError('email')">{{ emailError }}</div>

          <input id="password" class="form-control mb-4" type="password" minLength="8" v-model.trim="password" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}" placeholder="Mot de passe *" title="Saisissez un mot de passe" />
          <div class="error" v-if="validation.hasError('password')">{{ passwordError }}</div>

          <input id="confirmPassword" class="form-control mb-4" type="password" v-model.trim="confirmPassword" :class="{error: validation.hasError('confirmPassword'), valid: validation.isTouched('confirmPassword') && !validation.hasError('confirmPassword')}" placeholder="Confirmer mot de passe *" title="Confirmez votre mot de passe" />
          <div class="error" v-if="validation.hasError('confirmPassword')">{{ confirmPasswordError }}</div>
        
        </div>
        <div class="error-msg">{{ message }}</div>
        <div class="btn-signup-page mx-auto mt-6 mb-6">
          <button class="btn btn-secondary mx-5" id="signup" :disabled="validation.countErrors() > 0" type="submit" title="S'inscrire">S'inscrire</button>
        </div>
      </form>
      <User v-if="Object.keys(user).length" :user="user"/>
      <div class="btn-signup-page">
        <router-link :to="{name:'Login'}" tag="button" class="connexion btn btn-secondary mx-5" title="Se connecter">Se Connecter</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Validator } from 'simple-vue-validator';   // Validation de format de données du formulaire
import User from '../components/User';

export default {
  name: 'Signup',
  components: {
    User,
  },

  data() {
    return {
      title: "Inscription",
      firstName: "",
      lastName: "",
      email: "",
      password : "",
      confirmPassword: "",
      user: {},
      message: "",
      nameError: "Le nom et prénom doivent contenir au mons 3 caractères et contenir que de lettres et les espaces",
      emailError: "Le format d'e-mail n'est pas valide, Ex: mail@mail.com",
      passwordError: "Le mot de passe doit contenir au moins 8 caractères, au moins 1 majuscule, au moins 1 minuscule, au moins 1 chiffre et doit être sans les espaces !",
      confirmPasswordError: "Veuillez confirmer le mot de passe !"
    }
  },
  validators: {
    firstName(value) {
      return Validator.value(value).required().minLength(3).regex('^[A-Za-z]*$');
    },
    lastName(value) {
      return Validator.value(value).required().minLength(3).regex('^[A-Za-z]*$');
    },
    email(value) {
      return Validator.value(value).required().email();
    },
    password(value) {
      return Validator.value(value).required().minLength(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
    },
    'confirmPassword, password': function (confirmPassword, password) {
      if (this.submitted || this.validation.isTouched('confirmPassword') || this.validation.isTouched('password')) {
        return Validator.value(confirmPassword).required().match(password);
      }
      return true;
    },
  },

  methods: {
    signup() {
      
      this.$validate()
      .then((success) => {
        if (success) {
          this.user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          }
        
          axios.post("http://localhost:3000/api/user/signup", { 
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: this.user.password
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
      })
      .catch((e) => {
        console.log(e);
      })    
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