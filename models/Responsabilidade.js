const Sequelize = require('sequelize')
const connection = require('../database/database')

const Responsabilidade = connection.define('responsabilidades', {

responsabilidade01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade01op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade01op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade01op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade02op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade02op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade02op03: {
    type: Sequelize.STRING,
    allowNull: true
 },
  responsabilidade03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade03op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade03op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade03op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade04: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade04op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade04op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade04op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade05: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade05op01: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade05op02: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsabilidade05op03: {
    type: Sequelize.STRING,
    allowNull: true
  },
})

Responsabilidade.sync({ force: false })

module.exports = Responsabilidade

