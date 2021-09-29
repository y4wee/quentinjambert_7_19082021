import { createStore } from "vuex";

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

// variable du user par defaut
let userDefault = {
    userId: 0,
    nom: '',
    prenom: '',
    isAdmin: false,
    token: ''
};
// on recupere les data user si connecté dans le localStorage
let user = JSON.parse(localStorage.getItem('user'));
if(!user) {
    user = userDefault // sinon on applique la variable par defaut
} else {
    instance.defaults.headers.common['Authorization'] = user.token; // on applique les auth au header avec le bearer token
}

// creat new store instance 
const store = createStore({
    state: {
        status: '',
        user: user,
        articles: [],
    },
    mutations: {
        // gere state user
        setUser: function(state, user) {
            user.token = 'Bearer ' + user.token;
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            instance.defaults.headers.common['Authorization'] = user.token;
        },
        // mutation pour deconnexion user
        logout: function(state) {
            localStorage.removeItem('user');
            state.user = userDefault;
        },
        // gere state article
        setArticle: function(state, articles) {
            state.articles = articles;
        }
    },
    actions: {
        // requete post user Signup
        userCreating: ({commit}, userData) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/auth/signup', userData)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete post user login
        userLogin: ({commit}, userData) => {
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userData)
                .then(function (res) {
                    commit('setUser', res.data)
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete get all article
        articleGetAll: ({commit}) => {
            commit;
            instance.get('/publication')
            .then((res) => {
                commit('setArticle', res.data)
                console.log(res);
            })
            .catch((error) =>  {
                console.error(error);
            })
        }
    }
})

export default store;