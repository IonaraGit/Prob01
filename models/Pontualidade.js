const Sequelize = require('sequelize')
const connection = require('../database/database')

const Pontualidade = connection.define('pontualidades', {

  pontualidade01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pontualidade01op01: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade01op02: {
      type: Sequelize.STRING, 
      allowNull: true
    },
  pontualidade01op03: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pontualidade02op01: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade02op02: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade02op03: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pontualidade03op01: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade03op02: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade03op03: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade04: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pontualidade04op01: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade04op02: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade04op03: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade05: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pontualidade05op01: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade05op02: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    pontualidade05op03: {
      type: Sequelize.STRING, 
      allowNull: true
    },

})
Pontualidade.sync({ force: false })

module.exports = Pontualidade