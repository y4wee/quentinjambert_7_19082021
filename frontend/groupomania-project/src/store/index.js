import { createStore } from "vuex";

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});


// on recupere les data user si connecté dans le localStorage
let token = JSON.parse(localStorage.getItem('token'));
if(token) {
    instance.defaults.headers.common['Authorization'] = token; // on applique les auth au header avec le bearer token
}

// creat new store instance 
const store = createStore({
    state: {
        status: '',
        user: {
            userId: 0,
            nom: '',
            prenom: '',
            isAdmin: false,
            token: ''
        },
        articles: [],
    },
    mutations: {
        // gere state user
        setUser: function(state, user) {
            user.token = 'Bearer ' + user.token;
            state.user = user;
            localStorage.setItem('token', JSON.stringify(user.token));
            instance.defaults.headers.common['Authorization'] = user.token;
        },
        userOn: function(state, data) {
            state.user.userId = data.userId;
            state.user.nom = data.nom;
            state.user.prenom = data.prenom;
            state.user.isAdmin = data.isAdmin;
        },
        // mutation pour deconnexion user
        logout: function(state) {
            localStorage.removeItem('token');
            state.user = {
                userId: 0,
                nom: '',
                prenom: '',
                isAdmin: false,
                token: ''
            };
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
        // requete get one user
        userGetOne: ({commit}, userData) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get(`/auth/${userData.id}`)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete delete user
        userDelete: ({commit}, userData) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.delete(`/auth/${userData.id}`, {
                    data: {
                        password: userData.password
                    }
                })
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requette creation d'un article
        articleCreating: ({commit}, articleData) => {
            console.log(articleData);
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/publication', articleData)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete get all article
        articleGetAll: ({commit}) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.get('/publication')
                .then(function (res) {
                    commit('setArticle', res.data)
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete like article
        // requete post user Signup
        articleLike: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post(`/publication/${data.id}/like`, {
                    like: data.like,
                    userId: data.userId
                })
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        //requete delete article
        articleDelete: ({commit}, articleId) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.delete(`/publication/${articleId}`)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete Post pour creer un commentaire 
        commentPost: ({commit}, commentData) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/comments', commentData)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete get all comments d'un article en fonction de l'id de ce dernier
        commentGetAll: ({commit}, articleId) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.get(`/comments/${articleId}`)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        //requete delete comment
        commentDelete: ({commit}, commentId) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.delete(`/comments/${commentId}`)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
    }
})

export default store;