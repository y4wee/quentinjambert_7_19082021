// plugins neccessaires
const express = require('express');
const router = express.Router();

//middlewares
const auth = require('../middlewares/auth'); // autorisations
const validationPass = require("../middlewares/pass"); //validation mdp

// importation controller
const userCtrl = require('../controllers/user');

//declare les routes possible vers /api/auth
router.post('/signup', validationPass, userCtrl.signup);

router.post('/login', validationPass, userCtrl.login);

router.get('/:id', userCtrl.getOneUser);

router.delete('/:id', validationPass, userCtrl.deleteOneUser);

module.exports = router;