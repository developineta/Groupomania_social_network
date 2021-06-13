<template>
    <div class="UserProfile">
        <Header v-if="userLoggedIn"/>

        <div v-if="userLoggedIn" class="d-flex flex-column">
            <div v-if="sessionUserId === user.userId || adminAcces === 1">
                <form id="profile" @submit.prevent = modifyProfile()>
                    <div class="mb-5 mt-15 mx-auto text-h6">Profil d'utilisateur :</div>
                    <input id="firstName" ref="firstName" type="text" title="Modifier votre prénom" placeholder="firstName" :value="userProfile.firstName" required>
                    <input id="lastName" ref="lastName" type="text" title="Modifier votre nom" placeholder="lastName" :value="userProfile.lastName" required>
                    <input id="email" ref="email" type="email" title="Modifier votre e-mail" placeholder="E-mail (*)" :value="userProfile.email" required>
                    <input id="role" ref="role" title="Modifier votre rôle chez Groupomania" type="text" placeholder="role" :value="userProfile.role">
                    <div class="mb-5 mt-8 mx-auto text-h6">Modifier le mot de passe :</div>
                    <input id="password" ref="password" type="password" title="Saisissez votre mot de passe actuel" placeholder="Mon mot de passe actuel">
                    <input id="newpassword" ref="newpassword" type="password" title="Saisissez un nouveau mot de passe" placeholder="Mon nouveau mot de passe">
                    <div class="error-message mt-10">{{ errorMessage }}</div>
                    <div class="success-message">{{ successMessage }}</div>
                    <div class="mx-auto mb-15 buttons-profile">
                        <button id="modify-profile" type="submit" v-on:click="modifyProfile()" class="mx-5 my-10">Modifier le profil</button>
                        <button id="delete-profile" type="button" v-on:click="deleteUser()" class="mx-5">Supprimer le compte</button>
                    </div>
                </form>
            </div>
        
            <div v-if="sessionUserId !== user.userId || adminAcces === 0" class="d-flex flex-column">
                <v-card class="mx-auto mt-5" elevation="24" width="600">
                    <v-list-item three-line class="px-0 py-0">
                        <v-list-item-content class="px-0 py-0">
                            <div class="name px-5 py-3"> {{user.firstName}} {{user.lastName}}</div>
                            <v-divider horizontal></v-divider>
                            <div class="profile-role px-2 py-1">{{user.role}}</div>
                            <v-img class="user-picture mx-auto mb-2" :src="user.imageUrl" :alt="user.firstName" max-width="600" height="auto"></v-img>
                        </v-list-item-content>
                    </v-list-item>
                    <router-link class="router-link" :to="{ name : 'OneUserPosts', params: { id: user.userId }}">
                      <button class="btn btn-secondary btn-block btn-info my-4" type="submit">Voir toutes les publications de {{user.firstName}}</button>
                    </router-link>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

import Header from '@/components/Header.vue';

export default {
  name: 'UserProfile',

  components: {
    Header
  },

  data() {
    return{
      userLoggedIn: false,
      sessionUserId: 0,
      adminAcces:0,
      userProfile: [],
      errorMessage: "",
      succesMessage: ""
    };
  },

  created(){
    this.userLoggedIn()
  },

  mounted(){
    if(this.userLoggedIn === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                  
      let decodedToken = jwt.verify(token, process.env.VUE_APP_SECRET_TOKEN);  // N'est pas fait le token in front 
      this.sessionUserId = decodedToken.userId 
      this.adminAcces = decodedToken.admin
      this.getUserProfile();
    }
  },
  
  methods: {
    userLoggedIn(){
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Home' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
      }
    },

    getUserProfile(){
      const userId = this.sessionUserId;
      connectedUser.get(`/users/${userId}`)
        .then(res => {
          this.userProfile = res.data;
          this.userProfile.password = "";
          this.userProfile.newpassword = "";
        })
    },

    modifyProfile(){
      const firstName = this.$refs.firstName.value;
      const lastName = this.$refs.lastName.value;
      const email = this.$refs.email.value;
      const role = this.$refs.role.value;
      const password = this.$refs.password.value;
      const newpassword = this.$refs.newpassword.value;

      connectedUser.put("/user/:id", {
        firstName,
        lastName,
        email,
        role, 
        password,
        newpassword
      })
      .then((res) => {
        if(res.status === 200) {
            this.errorMessage = ""
            this.succesMessage = res.data.message;
            setTimeout(function(){location.reload()}, 1500)
        }
      })
      .catch((error) => {
            this.errorMessage = error.response.data.error;
      })
    },

    deleteUser(){
      if(window.confirm("Attention !! Vous êtes au point de supprimer votre compte définitivement !")){
        const userId = this.sessionUserId;
        connectedUser.delete(`/user/${userId}`)
        .then((res) => {
          if(res.status === 200) {
            setTimeout(function() {location.href = '/';}, 1500)
            this.succesMessage = res.data.message;
            localStorage.removeItem('groupomaniaUser');
          }
        })
        .catch((error) => {
            setTimeout(function() {location.reload()}, 1500)
            this.errorMessage = error.response.data.error;
        })
      }
    }
  }
}
</script>

<style>

</style>