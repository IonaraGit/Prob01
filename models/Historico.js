const Sequelize = require('sequelize')
const connection = require('../database/database')

const Historico = connection.define('historicos', {

  matricula_a: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome_a: {
    type: Sequelize.STRING,
    allowNull: false
  },
  acao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  matricula_b: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome_b: {
    type: Sequelize.STRING,
    allowNull: false
  },
  periodo: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Historico.sync ({ force: false })

module.exports = Historico