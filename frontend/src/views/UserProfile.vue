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
          <form class="jumbotron py-6" @submit.stop="modify()">

            <div class="mb-5 mt-8 mx-auto text-h6">
              
              <span class="h5 pb-1">Modifier les informations :</span>
              <input class="form-control mb-4" id="firstName" type="text" v-model.trim="firstName" :class="{error: validation.hasError('firstName'), valid: validation.isTouched('firstName') && !validation.hasError('firstName')}" :placeholder="user.firstName" title="Modifier votre prénom">
              <div class="error" id="error" v-if="validation.hasError('firstName')">{{ nameError }}</div>
              
              <input class="form-control mb-4" id="lastName" type="text" v-model.trim="lastName" :class="{error: validation.hasError('lastName'), valid: validation.isTouched('lastName') && !validation.hasError('lastName')}" :placeholder="user.lastName" title="Modifier votre nom">
              <div class="error" id="error-ln" v-if="validation.hasError('firstName')">{{ nameError }}</div>
              
              <input class="form-control mb-4" id="role" type="text" v-model.trim="role" :class="{error: validation.hasError('role'), valid: validation.isTouched('role') && !validation.hasError('role')}" :placeholder="user.role" title="Modifier votre rôle chez Groupomania">
              <div class="error" id="error-rl" v-if="validation.hasError('role')">{{ roleError }}</div>

              <div class="btn-profile-page mx-auto mt-6 mb-6">
                <button class="btn btn-secondary" id="modify-infos" type="submit" :disabled="validation.countErrors() > 0" title="Modifier les informations">Modifier le profil</button>
              </div>
            </div>
          </form>

          <v-divider v-if="sessionUserId == id" horizontal></v-divider>

          <router-link :to="`/user/${ id }/update_password`" class="user-link pl-2 mb-0" tag="button">
            <button type="link" class="btn btn-secondary btn-password mr-5 px-5" title="Modifier le mot de passe">Modifier le mot de passe</button>
          </router-link>

          <v-divider v-if="sessionUserId == id" horizontal></v-divider>

          <form class="imageForm py-8 pl-8">
            <div class="h5 pb-1">Ajouter l'image de profil :</div>
            <input class="image-profile" type="file" name="image" ref="file" v-on:change="setImage">

            <div id="preview">
              <img class="img-preview mt-1" v-if="url" :src="url" />
            </div>

            <div class="btn-upload mx-auto mt-6 mb-6">
              <button type="submit" class="btn btn-secondary mx-5 px-5" v-on:click.prevent="update_image" title="Publier l'image">Publier l'image</button>
            </div>
          </form>

          <div class="success-message text-center">{{ deleteMessage }}</div>
          <div class="mx-auto mt-8 button-delete text-right">
            <button class="btn btn-danger mx-5" id="delete-profile" type="button" v-on:click.prevent="deleteUser()" title="Supprimer le compte définitivement">Supprimer le compte</button>
          </div>
          <User v-if="Object.keys(user).length" :user="user"/>
        </div>
      </div>
    </div>
</template>

<script>
import authUser from "../services/auth";
import Header from "../components/Header.vue";
import {mapState} from "vuex";
import { Validator } from 'simple-vue-validator';
import User from '../components/User';

export default {
  name: 'UserProfile',
  components: {
    Header,
    User,
  },

  data() {
    return{
      titleMy: "Mon profil",
      titleUser: "Profil d'utilisateur",
      id: "",
      image: "",
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      user: {},
      url: null,
      nameError: "Le nom et prénom doivent contenir 3 au 20 caractères et contenir que de lettres et les espaces",
      roleError: "Votre rôle doit contenir 3 au 60 caractères et avoir que de lettres et les espaces",
      deleteMessage: "",
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.adminUser
  }),

  mounted(){
    this.getOneUser();
  },
  validators: {
    firstName(value) {
      return Validator.value(value).required().minLength(3).maxLength(20).regex('^[A-Za-zÀ-ÿ ]+$');
    },
    lastName(value) {
      return Validator.value(value).required().minLength(3).maxLength(20).regex('^[A-Za-zÀ-ÿ ]+$');
    },
    role(value) {
      return Validator.value(value).minLength(3).maxLength(60).regex('^[A-Za-zÀ-ÿ ]+$');
    }
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
      this.$validate()
      .then((success) => {
        if (success) {
          this.user = {
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role
          }
          const userId = this.$route.params.id;
          
          let data = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            role: this.user.role
          };

          authUser.modify(userId, data)
          .then((res) => {
            console.log("infos modifiés", res.config.data);
            this.message = "Votre compte a été modifié !";
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
              this.message = "La modification des informations a échoué !";
          })
        }
      })
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
      console.log(this.file);
      this.url = URL.createObjectURL(this.file);
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
.btn-password {
  background-color: #4f545c;
}
.btn-password:hover, .btn-password:focus {
  background-color: #4f545c;
}
.btn-danger {
  background-color: #FD2D01;
  font-weight: bold;
}
.btn-danger:hover, .btn-danger:focus {
  text-decoration: underline;
}
#firstName:focus, #lastName:focus, #role:focus {
  background-color: #ffffff;
}
#error, #error-ln, #error-rl {
  background-color: #4f545c;
}
.img-preview {
  max-width: 150px;
  border: 2px solid #D4D4D4;
}
</style>