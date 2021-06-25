<template>
    <div class="user-profile">
      <Header />

      <div class="container d-flex flex-column">
          <p v-if="sessionUserId != id" class="h4 mt-5 mb-2 text-center text-uppercase">{{titleUser}}</p>
          <p v-if="sessionUserId == id" class="h4 mt-5 mb-2 text-center text-uppercase">{{titleMy}}</p>

          <v-card class="jumbotron mx-auto mt-3 mb-8 pb-2 pt-5 text-center" elevation="24" width="600">
            <v-list-item three-line class="px-0 py-0">
              <v-list-item-content class="card-content px-0 py-0">

                <div class="card-title h4 px-5 py-3"> {{user.firstName}} {{user.lastName}}</div>

                <div class="profile-role py-2 mt-4" title="Le rôle chez Groupomania">{{user.role}}</div>

                <v-divider horizontal style="border: 1px solid #FEFEFE"></v-divider>

                <div v-if="user.imageUrl == '/images/imageDefault.png'" class="mt-3">
                  <img class="user-picture mx-auto mb-2 card-img" :src="'http://localhost:3000/images/imageDefault.png'" :alt="user.firstName" title="L'image d'utilisateur" />
                </div>

                <div v-else class="mt-3">
                  <img class="user-picture mx-auto mb-2 card-img" :src="user.imageUrl" :alt="user.firstName" title="L'image d'utilisateur" />
                </div>

                <v-divider v-if="sessionUserId === id || adminUser === 1" horizontal style="border: 1px solid #FEFEFE"></v-divider>
                
                <router-link class="router-link" :to="`/user/${ id }/post`">
                  <button class="btn btn-secondary btn-posts my-4" type="submit" title="Vour les publications d'utilisateur">Voir toutes les publications de {{user.firstName}}</button>
                </router-link>

              </v-list-item-content>
            </v-list-item>
          </v-card>

        <div v-if="sessionUserId == id">
          <form class="jumbotron py-6" @submit.prevent>

            <div class="mb-5 mt-8 mx-auto text-h6">
              <div class="success-message text-center">{{ infosMessage }}</div>
              <div class="error-message text-center">{{ infosErrorMessage }}</div>

              <span class="h5 pb-1">Modifier les informations :</span>
              <input class="form-control mb-4" ref="firstName" type="text" title="Modifier votre prénom" :value="user.firstName" required>
              <input class="form-control mb-4" ref="lastName" type="text" title="Modifier votre nom" :value="user.lastName" required>
              <input class="form-control mb-4" ref="role" title="Modifier votre rôle chez Groupomania" type="text" :value="user.role">

              <div class="btn-profile-page mx-auto mt-6 mb-6">
                <button class="btn btn-secondary" id="modify-infos" type="submit" v-on:click="modify()" title="Modifier les informations">Modifier le profil</button>
              </div>
            </div>

            <v-divider v-if="sessionUserId == id" horizontal></v-divider>

            <div class="mb-5 mt-8 mx-auto text-h6">
              <div class="success-message text-center">{{ passwordMessage }}</div>
              <div class="error-message text-center">{{ passwordErrorMessage }}</div>
              
              <span class="h5 pb-1">Modifier le mot de passe :</span>
              <input class="form-control mb-4" ref="newpassword" type="password" title="Saisissez le nouveau mot de passe" placeholder="Mon nouveau mot de passe">
              <input class="form-control mb-4" ref="confirmpassword" type="password" title="Confirmez le nouveau mot de passe" placeholder="Confirmer mon nouveau mot de passe">
              
              <div class="btn-profile-page mx-auto mt-6 mb-6">
                <button class="btn btn-secondary" id="modify-password" type="submit" v-on:click.prevent="update_password()" title="Modifier le mot de passe">Modifier le mot de passe</button>
              </div>

            </div>
          </form>

          <form class="imageForm py-8 pl-8">
            <div class="h5 pb-1">Ajouter l'image de profil :</div>
            <input class="image-profile" type="file" name="image" ref="file" v-on:change="setImage">
            <div class="btn-upload mx-auto mt-6 mb-6">
              <button type="submit" class="btn btn-secondary mx-5 px-5" v-on:click.prevent="update_image" title="Publier l'image">Publier l'image</button>
            </div>
          </form>

          <div class="error-message text-center">{{ deleteErrorMessage }}</div>
          <div class="success-message text-center">{{ deleteSuccessMessage }}</div>
          <div class="mx-auto my-8 button-delete text-right">
            <button class="btn btn-danger mx-5" id="delete-profile" type="button" v-on:click.prevent="deleteUser()" title="Supprimer le compte définitivement">Supprimer le compte</button>
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
import authUser from "../services/auth";
import Header from "../components/Header.vue";
import {mapState} from "vuex";

export default {
  name: 'UserProfile',
  components: {
    Header
  },

  data() {
    return{
      titleMy: "Mon profil",
      titleUser: "Profil d'utilisateur",
      user: [],
      id: "",
      image: "",
      infosMessage: "",
      infosErrorMessage: "",
      passwordMessage: "",
      passwordErrorMessage: "",
      deleteErrorMessage: "",
      deleteSuccessMessage: ""
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),

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
      .catch((error) => {
        console.log(error);
      })
    },

    modify() {
      const userId = this.$route.params.id;
      let data = {
        firstName: this.$refs.firstName.value,
        lastName: this.$refs.lastName.value,
        role: this.$refs.role.value
      };
      authUser.modify(userId, data)
      .then((res) => {
        console.log("infos modifiés", res.config.data);
        this.infosMessage = "Votre compte a été modifié !";
        this.$router.go();
      })
      .catch((error) => {
        console.log(error);
          this.infosErrorMessage = "La modification des informations a échoué !";
      })
    },
    update_password() {
      const userId = this.$route.params.id;
      let password = this.$refs.newpassword.value;
      const confirmpassword = this.$refs.confirmpassword.value;

      if(password == confirmpassword){
        authUser.update_password(userId, password)
        .then((res) => {
          console.log("infos modifiés", res.config.data);
          this.passwordErrorMessage = "";
          this.passwordMessage = "Votre mot de passe a été modifié !";
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.passwordMessage = "";
            this.passwordErrorMessage = "Le format de mot de passe n'est pas correct ! Le mot de passe doit contenir au moins 8 caractères, au moins 1 majuscule, au moins 1 minuscule, au moins 1 chiffre et doit être sans les espaces !";
            
          }
        })
      } else {
          this.passwordMessage = "";
          this.passwordErrorMessage = "Veuillez confirmer le nouveau mot de passe !";
      }
    },

    update_image() {
      let userId = this.sessionUserId;
      const formCreate = document.getElementsByClassName("imageForm")[0];
      let data = new FormData(formCreate);
          
      authUser.update_image(userId, data)
      .then(() => {
        this.$router.go();
      })
      .catch(error => {
          console.log(error)
      });
    },

    setImage() {
      this.file = this.$refs.file.files[0];
      console.log(this.file)
    },

    deleteUser(){
      if(window.confirm("Attention !! Vous êtes au point de supprimer votre compte définitivement !")){
        const userId = this.$route.params.id;
        authUser.deleteUser(userId)
        .then((res) => {
          console.log("Utilisateur supprimé", res);
          setTimeout(function() {location.href = '/';}, 2000)
          this.deleteMessage = "Le compte est supprimé !";
          localStorage.removeItem('userToken');
        })
        .catch((e) => {
          if (e.response.status === 500) {
          this.deleteMessage = "La suppression de compte a échoué, supprimez vos publications d'abord et recommencez";
          setTimeout(function() {location.reload()}, 2000)
          }
        })
      }
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