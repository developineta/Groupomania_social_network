<template>
    <div class="user-profile">
      <Header />
  
        <p v-if="sessionUserId != id" class="h4 mt-5 mb-2 text-center text-uppercase">{{titlePassword}}</p>
        <form class="jumbotron py-6" @submit.prevent="update_password()">
          <div class="mb-5 mt-8 mx-auto text-h6">
                          
            <input class="form-control mb-4" ref="newpassword" type="password" minLength="8" v-model.trim="password" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}" title="Saisissez le nouveau mot de passe" placeholder="Mon nouveau mot de passe">
            <div class="error" v-if="validation.hasError('password')">{{ passwordError }}</div>
            
            <input class="form-control mb-4" ref="confirmpassword" type="password" v-model.trim="confirmPassword" :class="{error: validation.hasError('confirmPassword'), valid: validation.isTouched('confirmPassword') && !validation.hasError('confirmPassword')}" title="Confirmez le nouveau mot de passe" placeholder="Confirmer mon nouveau mot de passe">
            <div class="error" v-if="validation.hasError('confirmPassword')">{{ confirmPasswordError }}</div>

            <div class="btn-profile-page mx-auto mt-6 mb-6">
              <button class="btn btn-secondary" id="modify-password" type="submit" :disabled="validation.countErrors() > 0" title="Modifier le mot de passe">Modifier le mot de passe</button>
            </div>

          </div>
        </form>

        <User v-if="Object.keys(user).length" :user="user"/>
    </div>
</template>

<script>
import authUser from "../services/auth";
import Header from "../components/Header.vue";
import {mapState} from "vuex";
import { Validator } from 'simple-vue-validator';
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

  mounted(){
    
  },
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

    /*getOneUser(){
    const userId = this.$route.params.id;
    authUser.getOneUser(userId)
      .then(res => {
        console.log("user data", res.data[0]);
        this.user = res.data[0];
        this.id = userId;
      })
      .catch((error) => {
        console.log(error);
      })
    },*/

    update_password() {
      this.$validate()
      .then((success) => {
        if (success) {
          this.user = {
            password: this.password,
          }
          let userId = this.$route.params.id;
          let password = this.user.password;

          authUser.update_password(userId, password)
          .then((res) => {
            console.log("infos modifiés", res.config.data);
            this.message = "Votre mot de passe a été modifié !";
            this.$router.push('/user/' + userId);
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
.container {
  border-top: 1px solid #FD2D01;
}
.h4, .required {
  color: #ffffff;
}
.jumbotron {
  background-color: #4f545c;
  border-top: 1px solid #FD2D01;
}
.card-content, .h5 {
  color: #ffffff;
}
.user-picture {
  max-width: 300px;
  border: 15px solid #D4D4D4;
  box-shadow: 5px 5px 5px #36393f;
}
.card-title, .profile-role {
  background-color: #36393f;
  border-radius: 10px;
}
.btn-posts {
  color: #ffffff;
  border: 1px solid #36393f;
  box-shadow: 5px 5px 5px #36393f;
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
.btn-posts:hover {
  color: #D4D4D4;
}
.imageForm {
  background-color: #4f545c;
  border-bottom: 1px solid #FD2D01;
}
.image-profile {
  border-radius: 10px;
  color: #000000;
  background-color: #FFFFFF;
}
.btn-danger {
background-color: #FD2D01;
font-weight: bold;

}
</style>