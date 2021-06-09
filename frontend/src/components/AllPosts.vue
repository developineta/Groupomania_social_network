<template>
    <div class="container jumbotron">
        <h1 class="text-center">Retrouvez les posts de vos collaborateurs</h1>
        <div class="article-container row m-auto">
            <div class="card carte-accueil m-2 m-lg-4">
                <h2 class="post-author">${post.author}</h2>
                <a href="post.html?id=${post._id}" class="card-body stretched-link" title="Voir l'article">
                    <picture>
                        <img src="${post.postImageUrl}" class="card-img-top" alt="Article" title="image de l'article" />
                    </picture>
                    <h2 class="card-title">${post.title}</h2>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "AllPosts",
};
</script>
