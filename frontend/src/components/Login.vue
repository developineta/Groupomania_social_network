<template>
    <form class="border border-light p-5">
        <p class="h4 mb-4 text-center">Connection</p>
        <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">
        <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Mot de passe">
        <button class="btn btn-info btn-block my-4" type="submit">Se Connecter</button>
        <div class="text-center">
            <p>Vous n'avez pas encore de compte ?
                <a href="">S'inscrire</a>
            </p>
        </div>
    </form>
</template>

<script>
export default {
  name: "Login",
};
</script>