const Sequelize = require ('sequelize')
const connection = require ('../database/database')
const Funcionario = require ('./Funcionario')
const Periodo = require('./Periodo')


const Nota = connection.define('notas', {
  nota_assiduidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_assiduidade: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nota_pontualidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_pontualidade: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nota_iniciativa: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_iniciativa: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nota_disciplina: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_disciplina: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nota_responsabilidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_responsabilidade: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nota_qualidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_qualidade: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nota_aperfeicoamento: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comentario_aperfeicoamento: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  data_inicio: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  data_fim: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  avaliador: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Funcionario.hasMany(Nota) //UM FUNCIONARIO TEM MUITAS NOTAS
Nota.belongsTo(Funcionario) //UMA NOTA PERTENCE A UM FUNCIONÁRIO

Periodo.hasMany(Nota) //UM PERIODO TEM MUITAS NOTAS
Nota.belongsTo(Periodo) //UMA NOTA PERTENCE A UM PERIODO



Nota.sync({force: false})

module.exports = Nota
