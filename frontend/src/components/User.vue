<template>
  <div id="user">                                         <!-- Création d'objet 'user' pour passer les valeurs à l'API -->
    <h2>Data après la soumission du formulaire</h2>
    <div v-for="key in Object.keys(user)" :key="user[key]">
      <span v-if="user[key]">{{ key }} : {{ user[key] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style scoped>
#user {
  opacity: 0;
}
</style>
