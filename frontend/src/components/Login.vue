<template>
    <div>
        <h1 class="text-center">
            <img class="img-fluid logo-main" alt="Groupomania logo" src="../assets/logo.png" />
        </h1>
        <div class="border border-light p-5">
            <p class="h4 mb-4 text-center">Connection</p>
            <form @submit.prevent = login()>
                <div class="mb-2">Champs requis</div>
                <input type="email" id="loginEmail" class="form-control mb-4" placeholder="E-mail" title="Renseignez votre e-mail" required>
                <input type="password" id="loginPassword" class="form-control mb-4" placeholder="Mot de passe" title="Renseignez votre mot de passe" required>
                <div class="error-msg">{{ message }}</div>
                <button class="btn btn-primary btn-block btn-info my-4" type="submit">Se Connecter</button>
                <div class="text-center">
                    <p>Vous n'avez pas encore de compte ?
                        <router-link :to="{name:'Signup'}" id="signup" class="font-weight-bold mx-5" tag="button">S'inscrire</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                message: "",  // Contiendra les messages d'erreur du backend ???
            };
        },
        methods: {
        }
    }
</script>

<style scoped>
.logo-main {
  width: 300px;
}
</style>