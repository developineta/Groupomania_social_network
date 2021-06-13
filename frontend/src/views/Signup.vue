<template>
  <div>
    <div class="container mx-auto">
        <form @submit.prevent = signup()>
            <div class="mb-2">Tous les champs sont requis</div>
            <input id="firstName" ref="firstName" type="text" placeholder="Prénom" required title="Saisissez votre prénom">
            <input id="lastName" ref="lastName" type="text" placeholder="Nom"  required title="Saisissez votre nom de famille">
            <input id="email" ref="email" type="email" placeholder="E-mail" required title="Saisissez votre adresse e-mail">
            <input id="role" ref="role" type="text" placeholder="Votre rôle chez Groupomania" title="Saisissez votre rôle - le poste occupé ou une description">
            <input id="password" ref="password" type="password" placeholder="Mot de passe" required title="Saisissez un mot de passe">
            <input id="confirmedpassword" ref="confirmedpassword" type="password" placeholder="Confirmer mot de passe (*)" required title="Confirmez votre mot de passe">
            <div class="error-msg">{{ message }}</div>
            <div class="mx-auto mt-6 mb-15">
              <button id="signup" type="submit" class="mx-5">S'inscrire</button>
            </div>
            <router-link to="/" id="login" tag="button" class="mx-5">Se Connecter</router-link>
        </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Signup'
    }
</script>