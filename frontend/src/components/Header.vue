<template>
  <div>
    <h1 class="text-center">
      <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo.png" />
    </h1>
    <v-card class="d-flex col row-md" :color="'#ffffff'" min-height='50' tile>
      <router-link to="/newpost" tag="button" class="nav-button">Créer une publication</router-link>
      <router-link to="/profile" tag="button" class="nav-button">Mon compte</router-link>
      <button v-on:click="deconnecter()" class="nav-button" href="#">Se déconnecter</button>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    deconnecter() {    // Supprime utilisateur du Local Storage
        localStorage.removeItem('authorisedUser');
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
</style>