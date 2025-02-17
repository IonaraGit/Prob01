const Sequelize = require('sequelize')
const connection = require('../database/database')

const Qualidade = connection.define('qualidades', {

  qualidade01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade01op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade01op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade01op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade02op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade02op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade02op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade03op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade03op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade03op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade04: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade04op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade04op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade04op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade05: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade05op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade05op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   qualidade05op03: {
     type: Sequelize.STRING,
     allowNull: true
   },

})
Qualidade.sync({ force: false })

module.exports = Qualidade