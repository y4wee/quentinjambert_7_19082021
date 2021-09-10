const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); 
const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'    
});
const User = require('./user');

// creation model Article
const Article = sequelize.define('Article', {
  // definition des attributs du model
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    media_path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    likes: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    }
});

// `sequelize.define` also returns the model
console.log(Article === sequelize.models.Article); // true

// creation foreign key
User.hasOne(Article);
Article.belongsTo(User);

// crée la table si elle n'existe pas 
Article.sync();

module.exports = sequelize.model('Article', Article);