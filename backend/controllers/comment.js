//plugins
const Comment = require('../models/comment');

//controlleur pour la creation d'un nouveau commentaire
exports.createComment = (req, res, next) => {
  const comment = Comment.build({ // creation du nouvel objet sauce grace au model pré-établie
    commentaire: req.body.commentaire, // recuperation du commentaire
    UserId: req.body.UserId,
    ArticleId: req.body.ArticleId
  });
  comment.save() // sauvegarde dans la bdd
    .then(() => res.status(201).json({ message: 'commentaire créé !'}))
    .catch(error => res.status(400).json({ error }));
};

//controlleur pour modifier un commentaire existant
exports.modifyComment = (req, res, next) => {
    let commentObject = { ...req.body };
    console.log(commentObject);
    Comment.update({
        ...commentObject
    }, {
        where: {
            id: req.params.id
        }
    })
      .then(() => res.status(200).json({ message: 'commentaire modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

//controlleur qui renvoi un commentaire en fonction de son id
exports.getOneComment = (req, res, next) => {
    Comment.findByPk(req.params.id)
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(500).json({ error }));
};

// controlleur qui renvoi tous les commentaires de la bdd du plus recent au plus ancien
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            ArticleId: req.body.ArticleId
        }
    })
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(500).json({ error }));
};

// controlleur qui supprime un commentaire de la bdd
exports.deleteOneComment = (req, res, next) => {
    Comment.findByPk(req.params.id) //trouve le commentaire en question dans la bdd par son id
    .then(comment => {
        comment.destroy() // supprime le commentaire trouvé
          .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};