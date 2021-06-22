import axios from 'axios';                              // Client http pour Node et pour navigateur

const token  = localStorage.getItem('userToken');

const commonConfig = {
    baseURL: 'http://localhost:3000/api/'
};

const postService = axios.create({...commonConfig });

postService.interceptors.request.use(function(config) {         // Interceptors axios pour introduire le header d'authentification
    config.headers = { Authorization: `Bearer ${token}` }
    return config;
});

export default {
    create(file){
        return postService.post('/post', {file})
    },
    getOnePost(id){
        return postService.get('/post/' + id)
    },
    getAllPosts(){
        return postService.get('/post')
    },
    deletePost(id){
        return postService.delete('/post/' + id)
    },
}