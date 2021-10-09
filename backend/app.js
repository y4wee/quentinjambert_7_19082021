// importation des modules
const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');

const toobusy = require('toobusy-js');
const helmet = require("helmet");
const xssClean = require('xss-clean');
const hpp = require('hpp');

//importation des fichiers routes
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');

// library express + var env.
const app = express();
require('dotenv').config();


//connection mysql sequelize
const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
// verifiaction connection a la db
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// parse automatiquement le coprs de la reponse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// éviter les attaques de pollution des paramètres HTTP
app.use(hpp());
// définit des en-têtes de réponse HTTP liés à la sécurité pour se protéger contre certaines vulnérabilités Web bien connues
app.use(helmet());
// nettoie les entrées utilisateur provenant du corps de la requête POST ( req.body), de requête GET ( req.query) et des paramètres d'URL ( req.params).
app.use(xssClean());


// surveiller la boucle d'événement, si le trafic reseau est trop important
app.use(function(req, res, next) {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
    next();
    }
  });

//declaration routes de l'api
app.use('/images', express.static(path.join(__dirname, 'images'))); //dossier static pour ajout image
app.use('/api/auth', userRoutes);
app.use('/api/publication', articleRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;