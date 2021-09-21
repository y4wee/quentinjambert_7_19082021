// plugins neccessaires
const express = require('express');
const router = express.Router();

//middlewares
const auth = require('../middlewares/auth'); //gestion autorisation

// importation controller
const commentCtrl = require('../controllers/comment');

//declare les routes possible vers /api/sauces
router.post('/', commentCtrl.createComment);

router.put('/:id', commentCtrl.modifyComment);

router.get('/:id', commentCtrl.getOneComment);

router.get('/', commentCtrl.getAllComments);

router.delete('/:id', commentCtrl.deleteOneComment);


module.exports = router;