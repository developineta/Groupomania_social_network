<template>
  <div class="mb-4">
    <form name="newPost">
      <textarea name="title" class="form-control title-input" maxlength="60" placeholder="Le titre de votre publication" title="Saisissez le titre de la publication" required></textarea>
      <textarea name="content" class="form-control content-input" maxlength="2000" placeholder="Le contenu de votre publication" title="Saisissez le contenu de la publication" required></textarea>
      <div class="custom-file">
        <input name="image" type="file" class="file-input" required v-on:change="sendFile($event)" />
        <label class="file-label" for="image">Télécharger un fichier</label>
      </div>
      <button class="btn btn-light form-control text-center" type="submit" v-on:click.prevent="sendPost()">Publier</button>
    </form>
  </div>
</template>

<script>
    export default {
        name: "NewPost",
    }
</script>