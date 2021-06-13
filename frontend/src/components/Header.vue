<template>
  <div>
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/icon-left-font.svg" />
    </h1>
    <v-card class="header-nav d-flex col row-md" :color="'#4f545c'" min-height='50' tile>
      <router-link to="post/" tag="button" class="nav-button">Créer une publication</router-link>
      <router-link to="user/:id" tag="button" class="nav-button">Mon compte</router-link>
      <button v-on:click="deconnecter()" class="nav-button" href="#">Se déconnecter</button>
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