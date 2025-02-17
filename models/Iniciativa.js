const Sequelize = require('sequelize')
const connection = require('../database/database')

const Iniciativa = connection.define('iniciativas', {
  
 iniciativa01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa01op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa01op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa01op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa02op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa02op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa02op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa03op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa03op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa03op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa04: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa04op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa04op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa04op03: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa05: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa05op01: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa05op02: {
     type: Sequelize.STRING,
     allowNull: true
   },
   iniciativa05op03: {
     type: Sequelize.STRING,
     allowNull: true
   },

})
Iniciativa.sync({ force: false })

module.exports = Iniciativa