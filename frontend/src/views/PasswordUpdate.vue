<template>
    <div class="user-profile">
      <Header />
  
        <p v-if="sessionUserId != id" class="h4 mt-5 mb-2 text-center text-uppercase">{{titlePassword}}</p>
        <form class="jumbotron py-6" @submit.prevent="update_password()">
          <div class="mb-5 mt-8 mx-auto text-h6">
                          
            <input class="form-control mb-4" id="newpassword" type="password" minLength="8" v-model.trim="password" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}" title="Saisissez le nouveau mot de passe" placeholder="Mon nouveau mot de passe">
            <div class="error" id="error" v-if="validation.hasError('password')">{{ passwordError }}</div>
            
            <input class="form-control mb-4" id="confirmpassword" type="password" v-model.trim="confirmPassword" :class="{error: validation.hasError('confirmPassword'), valid: validation.isTouched('confirmPassword') && !validation.hasError('confirmPassword')}" title="Confirmez le nouveau mot de passe" placeholder="Confirmer mon nouveau mot de passe">
            <div class="error" id="error-confirm" v-if="validation.hasError('confirmPassword')">{{ confirmPasswordError }}</div>

            <div class="btn-profile-page mx-auto mt-6 mb-6">
              <button class="btn btn-secondary" id="modify-password" type="submit" :disabled="validation.countErrors() > 0" title="Modifier le mot de passe">Modifier le mot de passe</button>
            </div>
            <div class="message h4 text-center mt-8">{{ message }}</div>

          </div>
        </form>

        <User v-if="Object.keys(user).length" :user="user"/>
    </div>
</template>

<script>
import authUser from "../services/auth";
import Header from "../components/Header.vue";
import {mapState} from "vuex";
import { Validator } from 'simple-vue-validator';           // Validation de mot de passe avec package Simple-vue-validator
import User from '../components/User';

export default {
  name: 'PasswordUpdate',
  components: {
    Header,
    User,
  },

  data() {
    return{
      titlePassword: "Modifier le mot de passe",
      id: "",
      password : "",
      confirmPassword: "",
      user: {},
      passwordError: "Le mot de passe doit contenir au moins 8 caractères, au moins 1 majuscule, au moins 1 minuscule, au moins 1 chiffre et doit être sans les espaces !",
      confirmPasswordError: "Veuillez confirmer le mot de passe !",
      message: ""
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),

  validators: {
    password(value) {
      return Validator.value(value).required().minLength(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
    },
    'confirmPassword, password': function (confirmPassword, password) {
      if (this.submitted || this.validation.isTouched('confirmPassword') || this.validation.isTouched('password')) {
        return Validator.value(confirmPassword).required().match(password);
      }
      return true;
    }
  },
 
  methods: {

    update_password() {
      this.$validate()                                                // Validation de modification de mot de passe avant la soumission
      .then((success) => {
        if (success) {
          this.user = {
            password: this.password,
          }
          let userId = this.$route.params.id;
          let password = this.user.password;

          authUser.update_password(userId, password)
          .then((res) => {
            this.message = res.data.message;
            setTimeout( () => this.$router.push({ path: '/user/' + userId}), 2500);
          })
          .catch((error) => {
            console.log(error);
              this.message = "La modification a échoué !";
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.user-profile {
  background-color: #36393f;
  height: 100%;
}
.h4 {
  color: #ffffff;
}
.jumbotron {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
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
.btn-secondary:focus {
  color: #FD2D01;
  background-color: #36393f;
  font-weight: bold;
  text-decoration: underline;
}
#newpassword:focus, #confirmpassword:focus {
  background-color: #ffffff;
}
#error, #error-confirm {
  background-color: #4f545c !important;
}
</style>