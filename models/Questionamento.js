const Sequelize = require('sequelize')
const connection = require('../database/database')
const Funcionario = require ('./Funcionario')
const Periodo = require ('./Periodo')

const Questionamento = connection.define('questionamentos', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avaliador_matricula: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  avaliador_nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  servidor_matricula: {
    type: Sequelize.STRING,
    allowNull: false
  },
  servidor_nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  aceito: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }

})

Funcionario.hasMany(Questionamento) //UM FUNCIONARIO TEM MUITOS QUESTIONAMENTOS
Questionamento.belongsTo(Funcionario) //UM QUESTIONAMENTO PERTENCE A UM FUNCIONÁRIO

Periodo.hasMany(Questionamento) //UM PERIODO TEM MUITOS QUESTIONAMENTOS
Questionamento.belongsTo(Periodo) //UM QUESTIONAMENTO PERTENCE A UM PERIODO

Questionamento.sync({ force: false })

module.exports = Questionamento