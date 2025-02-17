const Sequelize = require('sequelize')
const connection = require('../database/database')

const Aperfeicoamento = connection.define('aperfeicoamentos', {
  aperfeicoamento01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento01op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento01op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento01op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento02op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento02op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento02op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento03op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento03op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento03op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento04: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento04op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento04op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento04op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento05: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento05op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento05op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aperfeicoamento05op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
 
})
Aperfeicoamento.sync({ force: false })

module.exports = Aperfeicoamento