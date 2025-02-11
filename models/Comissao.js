const Sequelize = require('sequelize')
const connection = require('../database/database')
const Permissao = require('./Permissao')
const Setor = require('./Setor')
const Funcionario = require ('./Funcionario')
const Periodo = require('./Periodo')

const Comissao = connection.define('comissoes', {
  matricula_servidor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome_servidor: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  email_servidor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  matricula_chefia: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nome_chefia: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  email_chefia: {
    type: Sequelize.STRING,
    allowNull: false
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  q_assiduidade: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  q_pontualidade: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  q_iniciativa: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  q_disciplina: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  q_responsabilidade: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  q_qualidade: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  q_aperfeicoamento: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  resolvido: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})


Funcionario.hasMany(Comissao) 
Comissao.belongsTo(Funcionario) 

Periodo.hasMany(Comissao) 
Comissao.belongsTo(Periodo) 

Comissao.sync({ force: false})

module.exports = Comissao
