const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// controlleur d'inscription utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // cryptage du mdp
      .then(hash => {
        const user = User.build({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hash
        });
        user.save() // sauvegarde les informations utilisateur
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

// controlleur de connexion des utilisateurs
exports.login = (req, res, next) => {
  User.findOne({ where: {email: req.body.email} }) //verifie si l'email est valide
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // verifie si le mdp est valide
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            nom: user.nom,
            prenom: user.prenom,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET, // creation token de connexion
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// controlleur get pour page compte 
exports.getOneUser = (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            res.status(200).json({
                nomExt: user.nom,
                prenomExt: user.prenom,
                isAdminExt: user.isAdmin,
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// controlleur pour suppression profil
exports.deleteOneUser = (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => {
    bcrypt.compare(req.body.password, user.password) // verifie si le mdp est valide
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        user.destroy()
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(401).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};