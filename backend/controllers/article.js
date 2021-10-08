//plugins
const Article = require('../models/article');
const fs = require('fs');

//controlleur pour la creation d'une nouvelle publication
exports.createArticle = (req, res, next) => {
  const articleObject = {
    titre: req.body.titre,
    UserId: req.body.UserId
  }
  const article = Article.build({ // creation du nouvel objet sauce grace au model pré-établie
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //creation URL image
  });
  article.save() // sauvegarde dans la bdd
    .then(() => res.status(201).json({ message: 'publication créée !'}))
    .catch(error => res.status(400).json({ error }));
};
/*
//controlleur pour modifier une publication existante
exports.modifyArticle = (req, res, next) => {
  let articleObject // creation d'une variable pour l'objet modifié
  if (req.file) { // si il ya une modification de l'image
    Article.findByPk(req.params.id)
      .then(article => {
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => { //suppression de l'ancienne image de la bdd
          if (err) throw err;
        });
      })
      .then( articleObject = { // nouvel objet modifié avec la nouvelle image
        ...JSON.parse(req.body.article),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      })
      .catch(error => res.status(500).json({ error }));
  } else { //si aucun changement image juste changer avec le corps de la requete directement en json
    articleObject = { ...req.body};
  }
  console.log(articleObject);
  Article.update({
      ...articleObject
  }, {
      where: {
          id: req.params.id
      }
  }) // applique les modification dans la bdd avec le nouvel objet modifié
    .then(() => res.status(200).json({ message: 'article modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//controlleur qui renvoi une publication en fonction de son id
exports.getOneArticle = (req, res, next) => {
    Article.findByPk(req.params.id)
      .then(article => res.status(200).json(article))
      .catch(error => res.status(500).json({ error }));
};
*/
// controlleur qui renvoi toutes les publications de la bdd de la plus recente a la plus ancienne
exports.getAllArticles = (req, res, next) => {
    Article.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
      .then(articles => res.status(200).json(articles))
      .catch(error => res.status(500).json({ error }));
};

// controlleur qui supprime un article de la bdd
exports.deleteOneArticle = (req, res, next) => {
    Article.findByPk(req.params.id) //trouve la pubblication en question dans la bdd par son id
    .then(article => {
      const filename = article.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { // supprime l'image de la bdd
        article.destroy() // supprime l'article trouvé
          .then(() => res.status(200).json({ message: 'publication supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//controlleur pour la gestion des like/dislike des sauces
exports.likeArticle = (req, res, next) => {
  const like = req.body.like;
  const user = req.body.userId.toString();
  const articleId = req.params.id;
  
  Article.findByPk(articleId)
  .then((article) => {
    let newDislikes = 0;
    let newLikes = 0;

    if (like == 1) { // si like
      newLikes = article.likes + 1;
      article.update({
        likes: newLikes,
        userLiked: article.userLiked.concat(' ', user)
      })
      .then(() => res.status(200).json({ message: "ajouté un like"}))
      .catch(error => res.status(500).json({ error: error }));
    }
    else if (like == -1) { // si dislike
      newDislikes = article.dislikes + 1;
      article.update({
        dislikes: newDislikes,
        userDisliked: article.userDisliked.concat(' ', user)
      })
      .then(() => res.status(200).json({ message: "ajouté un dislike"}))
      .catch(error => res.status(500).json({ error: error }));
    } else {
      // sinon like == 0
      if (article.userLiked.includes(user)) { // on verifie si le userId est present dans le tableau des liked
        console.log(user)
        newLikes = article.likes - 1;
        article.update({
          likes: newLikes,
          userLiked: article.userLiked.replace(user, '')
        })
        .then(() => res.status(200).json({ message: "enlevé un like"}))
        .catch(error => res.status(400).json({ error: error }));
      } else { // sinon  le user doit etre dans les disliked
        newDislikes = article.dislikes - 1;
        article.update({
          dislikes: newDislikes,
          userDisliked: article.userDisliked.replace(user, '')
        })
        .then(() => res.status(200).json({ message: "enlevé un dislike"}))
        .catch(error => res.status(400).json({ error: error }));
      }
    }
  })
  .catch(error => res.status(500).json({ error: error }));
}