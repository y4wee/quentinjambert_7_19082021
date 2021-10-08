// plugins neccessaires
const express = require('express');
const router = express.Router();

//middlewares
const auth = require('../middlewares/auth'); //gestion autorisation
const multer = require('../middlewares/multer'); //gestion des fichiers images

// importation controller
const articleCtrl = require('../controllers/article');

//declare les routes possible vers /api/sauces
router.post('/', auth, multer, articleCtrl.createArticle);

//router.put('/:id', auth, multer, articleCtrl.modifyArticle);

//router.get('/:id', auth, articleCtrl.getOneArticle);

router.get('/', auth, articleCtrl.getAllArticles);

router.delete('/:id', auth, articleCtrl.deleteOneArticle);

router.post('/:id/like', articleCtrl.likeArticle);

module.exports = router;