const Sequelize = require('sequelize')
const connection = require('../database/database')
const Questionamento = require ('./Questionamento')
const Periodo = require ('./Periodo')

const Resposta = connection.define('respostas', {
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

Questionamento.hasMany(Resposta) 
Resposta.belongsTo(Questionamento) 

Periodo.hasMany(Resposta) 
Resposta.belongsTo(Periodo)


Resposta.sync({ force: false })

module.exports = Resposta