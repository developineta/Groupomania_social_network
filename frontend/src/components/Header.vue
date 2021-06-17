<template>
  <div>
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo-left.jpg" />
    </h1>
    <v-card class="navbar d-flex col row-md" :color="'#4f545c'" min-height='50' tile>
      <router-link :to="{name:'NewPost'}" id="newpost" class="navbar-brand nav-button" tag="button">Créer une publication</router-link>
      <router-link :to="{name:'UserProfile'}" id="user-profile" class="navbar-brand nav-button" tag="button">Mon compte</router-link>
      <button v-on:click="deconnecter()" class="navbar-brand nav-button" href="#">Se déconnecter</button>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    deconnecter() {    // Supprime utilisateur du Local Storage
        localStorage.removeItem('groupomaniaUser');
        location.href = '/';
    }
  }
}
</script>

<style scoped>
.logo-main {
  width: 300px;
}
.d-flex {
  justify-content: space-around;
}
.nav-button {
  color: #ffffff;
}
</style>