import axios from 'axios';                              // Client http pour Node et pour navigateur

const token  = localStorage.getItem('userToken');

const commonConfig = {
    baseURL: 'http://localhost:3000/api/'
};

const authUser = axios.create({...commonConfig });

authUser.interceptors.request.use(function(config) {         // Interceptors axios pour introduire le header d'authentification
    config.headers = { Authorization: `Bearer ${token}` }
    return config;
});


export default {
    authUser,
    getAllPosts(){
        return authUser.get('/post')
    },
    getOnePost(id){
        return authUser.get('/post/' + id)
    },
    login(data){
        return authUser.post('/user/login', data)
    },
    /*createPost() {
        return authUser.post('/post/')
    },*/
    getOneUser(id) {
        return authUser.get('/user/' + id)
    },
    deletePost(id){
        return authUser.delete('/post/' + id)
    },
    deleteUser(id){
        return authUser.delete('/user/' + id)
    },
    oneUserPosts(id){
        return authUser.get('/user/' + id + '/post')
    },
    /*modify(id){
        return authUser.put('/user/' + id)
    },
    update_password(id){
        return authUser.put('/user/' + id + '/update_password')
    },
    update_image(id){
        return authUser.put('/user/' + id + '/update_image')
    }*/
}