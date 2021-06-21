<template>
    <div class="UserProfile">
      <Header />

      <div class="d-flex flex-column">
        <!-- ajouter aux p title <div v-if="sessionUserId === user.userId">-->
          <p class="h4 m-4 text-center">{{titleUser}}</p>
          <p class="h4 m-4 text-center">{{titleMy}}</p>

          <v-card class="mx-auto mt-5 mb-8 text-center" elevation="24" width="600">
            <v-list-item three-line class="px-0 py-0">
              <v-list-item-content class="px-0 py-0">
                <div class="name px-5 py-3"> {{user.firstName}} {{user.lastName}}</div>
                <v-divider horizontal></v-divider>
                <div class="profile-role px-2 py-1">{{user.role}}</div>
                <v-img class="user-picture mx-auto mb-2" :src="user.imageUrl" :alt="user.firstName" max-width="600" height="auto"></v-img>
              </v-list-item-content>
            </v-list-item>
            
            <router-link class="router-link" :to="`/user/${ id }/post`">
              <button class="btn btn-secondary btn-info my-4" type="submit">Voir toutes les publications de {{user.firstName}}</button>
            </router-link>
          </v-card>

        <!--<div v-if="sessionUserId === user.userId">-->  
          <form class="jumbotron py-6" @submit.prevent>

            <div class="mb-5 mt-8 mx-auto text-h6">
              <div class="success-message text-center">{{ infosMessage }}</div>
              <div class="error-message text-center">{{ infosErrorMessage }}</div>

              <span>Modifier les informations :</span>
              <input class="form-control mb-4" ref="firstName" type="text" title="Modifier votre prénom" :value="user.firstName" required>
              <input class="form-control mb-4" ref="lastName" type="text" title="Modifier votre nom" :value="user.lastName" required>
              <input class="form-control mb-4" ref="email" type="email" title="Modifier votre e-mail" placeholder="Resaisissez votre adresse e-mail" required>
              <input class="form-control mb-4" ref="role" title="Modifier votre rôle chez Groupomania" type="text" :value="user.role">

              <button class="btn btn-secondary mx-5" id="modify-infos" type="submit" v-on:click="modify()">Modifier le profil</button>
            </div>

            <div class="mb-5 mt-8 mx-auto text-h6">
              <div class="success-message text-center">{{ passwordMessage }}</div>
              <div class="error-message text-center">{{ passwordErrorMessage }}</div>
              <span>Modifier le mot de passe :</span>
              <input class="form-control mb-4" ref="newpassword" type="password" title="Saisissez le nouveau mot de passe" placeholder="Mon nouveau mot de passe">
              <input class="form-control mb-4" ref="confirmpassword" type="password" title="Confirmez le nouveau mot de passe" placeholder="Confirmer mon nouveau mot de passe">
              
              <button class="btn btn-secondary mx-5" id="modify-password" type="submit" v-on:click.prevent="update_password()">Modifier le mot de passe</button>
            </div>

            <div class="error-message text-center">{{ deleteErrorMessage }}</div>
            <div class="success-message text-center">{{ deleteSuccessMessage }}</div>
            <div class="mx-auto mt-15 button-delete text-right">
              <button class="btn btn-danger mx-5" id="delete-profile" type="button" v-on:click.prevent="deleteUser()">Supprimer le compte</button>
            </div>
          </form>
        <!--</div>-->
      </div>
    </div>
</template>

<script>
//import jwt from 'jsonwebtoken'
//import dotenv from 'dotenv'
//dotenv.config();

import authUser from "../services/auth";
import axios from "axios";

import Header from "../components/Header.vue";

export default {
  name: 'UserProfile',
  components: {
    Header
  },

  data() {
    return{
      titleMy: "Mon profil",
      titleUser: "Profil d'utilisateur",
      //sessionUserId: 0,
      user: [],
      id: null,
      infosMessage: "",
      infosErrorMessage: "",
      passwordMessage: "",
      passwordErrorMessage: "",
      deleteErrorMessage: "",
      deleteSuccessMessage: ""
    }
  },

  mounted(){
    this.getOneUser();
  },
  
  methods: {
    getOneUser(){
    const userId = this.$route.params.id;
    authUser.getOneUser(userId)
      .then(res => {
        console.log("user data", res.data[0]);
        this.user = res.data[0];
        this.id = userId;
      })
    },

    modify() {
      const userId = this.$route.params.id;
      const firstName = this.$refs.firstName.value;
      const lastName = this.$refs.lastName.value;
      const email = this.$refs.email.value;
      const role = this.$refs.role.value;

      axios.put("http://localhost:3000/api/user/" + userId, {
        firstName,
        lastName,
        email,
        role
      })
      .then((res) => {
        console.log("infos modifiés", res.config.data);
        this.infosMessage = "Votre compte a été modifié !";
      })
      .catch((error) => {
        console.log(error);
          this.infosErrorMessage = "La modification des informations a échoué !";
      })
    },
    update_password() {
      const userId = this.$route.params.id;
      const password = this.$refs.newpassword.value;
      const confirmpassword = this.$refs.confirmpassword.value;

      if(password == confirmpassword){
        axios.put("http://localhost:3000/api/user/" + userId + "/update_password", {
          password
        })
        .then((res) => {
          console.log("infos modifiés", res.config.data);
          this.passwordMessage = "Votre mot de passe a été modifié !";
        })
        .catch((error) => {
          console.log(error);
          this.passwordErrorMessage = "La modification de mot de passe a échoué !";
        })
      } else {
          this.passwordErrorMessage = "Veuillez confirmer le nouveau mot de passe !";
      }
    },
    

    deleteUser(){
      if(window.confirm("Attention !! Vous êtes au point de supprimer votre compte définitivement !")){
        const userId = this.$route.params.id;
        authUser.deleteUser(userId)
        .then((res) => {
          console.log("Utilisateur supprimé", res);
          setTimeout(function() {location.href = '/';}, 2000)
          this.deleteSuccessMessage = "Le compte est supprimé !";
          localStorage.removeItem('userToken');
        })
        .catch((error) => {
            console.log(error);
            setTimeout(function() {location.reload()}, 2000)
            this.deleteErrorMessage = "La suppression de compte a échoué ...";
        })
      }
    }
  }
}
</script>

<style>

</style>