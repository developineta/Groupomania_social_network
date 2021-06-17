import axios from 'axios';                              // Client http pour Node et pour navigateur

const commonConfig = {
    baseURL: 'http://localhost:3000/api/'                // L'Url de requêtes
};

const userNotSignedIn = axios.create({...commonConfig });
const userSignedIn = axios.create({...commonConfig });

userSignedIn.interceptors.request.use(function(config) {         // Interceptors axios pour introduire le header d'authentification
    const token = JSON.parse(localStorage.theUser).token
    config.headers = { Authorization: `Bearer ${token}` }
    return config;
});

export {
    userSignedIn,
    userNotSignedIn
}