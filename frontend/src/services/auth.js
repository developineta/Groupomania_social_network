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
    login(data){
        return authUser.post('/user/login', data)
    },
    getOneUser(id) {
        return authUser.get('/user/' + id)
    },
    deleteUser(id){
        return authUser.delete('/user/' + id)
    },
    oneUserPosts(id){
        return authUser.get('/user/' + id + '/post')
    },
    modify(id, data){
        return authUser.put('/user/' + id, data)
    },
    update_password(id, password){
        return authUser.put('/user/' + id + '/update_password', {password})
    },
    update_image(id, formData){
        return authUser.put('/user/' + id + '/update_image', {formData})
    }
}