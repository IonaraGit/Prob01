const Sequelize = require('sequelize')
const connection = require('../database/database')
const Permissao = require('./Permissao')
const Setor = require('./Setor')

const Funcionario = connection.define('funcionarios', {
  matricula: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  primeiro_acesso: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, 
  pergunta_secreta: {
    type: Sequelize.STRING,
    allowNull: false
  },
  resposta_secreta: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sexo: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  imagem_perfil: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data_admissao: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
})

Permissao.hasMany(Funcionario) //UMA PERMISSÃO TEM VARIOS FUNCIONARIOS
Funcionario.belongsTo(Permissao) //UM FUNCIONARIO TEM UMA PERMISSAO

Setor.hasMany(Funcionario) //UM SETOR TEM VARIOS FUNCIONARIOS
Funcionario.belongsTo(Setor) //UM FUNCIONARIO TEM UM SETOR

Funcionario.sync({ force: false})

module.exports = Funcionario
