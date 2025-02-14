const Sequelize = require ('sequelize')
const connection = require ('../database/database')
const Funcionario = require ('./Funcionario')
const Periodo = require('./Periodo')


const Nota = connection.define('notas', {
  nota_assiduidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_assiduidade1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_assiduidade2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_assiduidade3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_assiduidade4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_assiduidade5: {
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
  nota_pontualidade1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_pontualidade2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_pontualidade3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_pontualidade4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_pontualidade5: {
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
  nota_iniciativa1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_iniciativa2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_iniciativa3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_iniciativa4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_iniciativa5: {
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
  nota_disciplina1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_disciplina2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_disciplina3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_disciplina4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_disciplina5: {
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
  nota_responsabilidade1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_responsabilidade2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_responsabilidade3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_responsabilidade4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_responsabilidade5: {
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
  nota_qualidade1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_qualidade2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_qualidade3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_qualidade4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_qualidade5: {
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
  nota_aperfeicoamento1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_aperfeicoamento2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_aperfeicoamento3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_aperfeicoamento4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nota_aperfeicoamento5: {
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
