const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'    
});
const User = require('./user');
const Article = require('./article');

// creation model Comment
const Comment = sequelize.define('Comment', {
  // definition des attributs du model
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    prenom: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true

//creation des foreign keys
User.hasOne(Comment, {
    onDelete: 'CASCADE'
});
Comment.belongsTo(User);

Article.hasOne(Comment, {
    onDelete: 'CASCADE'
});
Comment.belongsTo(Article);

// crée la table si elle n'existe pas
Comment.sync();

module.exports = sequelize.model('Comment', Comment);