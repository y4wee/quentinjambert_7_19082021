// plugins neccessaires
const express = require('express');
const router = express.Router();

//middlewares
const auth = require('../middlewares/auth'); //gestion autorisation
const multer = require('../middlewares/multer'); //gestion des fichiers images

// importation controller
const articleCtrl = require('../controllers/article');

//declare les routes possible vers /api/sauces
router.post('/', multer, articleCtrl.createArticle);

router.put('/:id', multer, articleCtrl.modifyArticle);

router.get('/:id', articleCtrl.getOneArticle);

router.get('/', articleCtrl.getAllArticles);

router.delete('/:id', articleCtrl.deleteOneArticle);

router.post('/:id/like', articleCtrl.likeArticle);

module.exports = router;