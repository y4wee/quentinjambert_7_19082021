// plugins neccessaires
const express = require('express');
const router = express.Router();

//middlewares
const auth = require('../middlewares/auth'); // autorisations
const validationPass = require("../middlewares/pass"); //validation mdp

// importation controller
const userCtrl = require('../controllers/user');

// utilisé pour empêcher les adresses IP de faire des demandes répétées aux points de terminaison de l'API
const rateLimit = require('express-rate-limit');

// rateLimit pour les connexions
const connexionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // bloque apres 5 requetes
    skipSuccessfulRequests: true,
  });

//declare les routes possible vers /api/auth
router.post('/signup', validationPass, userCtrl.signup);

router.post('/login',connexionLimiter, validationPass, userCtrl.login);

router.get('/:id',auth, userCtrl.getOneUser);

router.delete('/:id',auth, validationPass, userCtrl.deleteOneUser);

module.exports = router;