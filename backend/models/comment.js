const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); 
const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'    
});
const User = require('./user');
const Article = require('./article');

// creation model Article
const Comment = sequelize.define('Comment', {
  // definition des attributs du model
    comment_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true

//creation des foreign keys
User.hasOne(Comment);
Comment.belongsTo(User);

Article.hasOne(Comment);
Comment.belongsTo(Article);

// crée la table si elle n'existe pas 
Comment.sync()

module.exports = sequelize.model('Comment', Comment);