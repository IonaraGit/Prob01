const Sequelize = require('sequelize')
const connection = require('../database/database')
const Setor = require ('../models/Setor')

const Ligacao = connection.define('ligacoes', {
  chefia: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  servidor: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})


Setor.hasMany(Ligacao) //UMA SETOR TEM VARIOS FUNCIONARIOS
Ligacao.belongsTo(Setor) //UM LIGAÇÃO PERTENCE A UM SETOR

Ligacao.sync({ force: false })

module.exports = Ligacao

