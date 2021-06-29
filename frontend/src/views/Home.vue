<template>
  <div class="home text-center">

    <img class="img-fluid logo-main m-5" alt="Groupomania logo" src="../assets/logo-left.jpg" />

    <h1 class="m-5">Bienvenue sur le reseau social de Groupomania !</h1>

    <div class="col text-center">

      <router-link class="router-link btn btn-info font-weight-bold m-5" :to="{ name : 'Login' }" id="login" tag="button" title="Se connecter">Se connecter</router-link>

      <router-link class="router-link btn btn-secondary font-weight-bold m-5" :to="{ name : 'Signup' }" id="signup" tag="button" title="S'inscrire">S'inscrire</router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
.home {
  height: 100%;
}
.logo-main {
  width: 300px;
}
</style>
