<template>
  <h1>
    <img class="img-fluid logo-main text-center" alt="Groupomania logo" src="../assets/logo.png" />
  </h1>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggler">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link to="/newpost" tag="button" class="nav-button nav-link active" href="#">Créer une publication</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/account" tag="button" class="nav-button nav-link" href="#">Mon compte</router-link>
        </li>
        <li class="nav-item">
          <button v-on:click="deconnecter()" class="nav-button nav-link" href="#">Se déconnecter</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    deconnecter(){                                  // Supprime utilisateur du Local Storage
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
</style>