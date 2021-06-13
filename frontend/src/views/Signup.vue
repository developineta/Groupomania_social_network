<template>
  <div class="signup">
    <Header />

    <div class="container p-5">
      <p class="h4 mb-4 text-center">Inscription</p>
      <form class="jumbotron py-6" @submit.prevent = signup()>
        <div class="required mb-2 text-center">Les champs requis *</div>
        <div class="signup-inputs">
          <input class="form-control mb-4" id="firstName" ref="firstName" type="text" placeholder="Prénom *" title="Saisissez votre prénom" required>
          <input class="form-control mb-4" id="lastName" ref="lastName" type="text" placeholder="Nom *"  title="Saisissez votre nom de famille" required>
          <input class="form-control mb-4" id="email" ref="email" type="email" placeholder="E-mail *" title="Saisissez votre adresse e-mail" required>
          <input class="form-control mb-4" id="role" ref="role" type="text" placeholder="Votre rôle chez Groupomania  ex.: project manager" title="Saisissez votre rôle - le poste occupé ou une description">
          <input class="form-control mb-4" id="password" ref="password" type="password" placeholder="Mot de passe *" title="Saisissez un mot de passe" required>
          <input class="form-control mb-4" id="confirmedpassword" ref="confirmedpassword" type="password" placeholder="Confirmer mot de passe *" title="Confirmez votre mot de passe" required>
        </div>
        <div class="error-msg">{{ message }}</div>
        <div class="btn-signup-page mx-auto mt-6 mb-6">
          <button class="btn btn-secondary mx-5" id="signup" type="submit">S'inscrire</button>
        </div>
      </form>
      <div class="btn-signup-page">
        <router-link to="/" id="login" tag="button" class="btn btn-secondary mx-5">Se Connecter</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// v-if="userLoggedIn" add to line 3, 5
import Header from "../components/Header.vue";

export default {
  name: 'Signup',
  components: {
    Header,
  },
}
</script>

<style scoped>
.signup {
  background-color: #36393f;
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
  border-bottom: 1px solid #FD2D01;
}
input {
  max-width: 900px;
  background-color: #36393f;
  color: #ffffff;
}
.signup-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-signup-page {
  display: flex;
  justify-content: center;
}
.btn-secondary {
  background-color: #36393f;
  color: #ffffff;
}
</style>