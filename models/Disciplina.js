const Sequelize = require('sequelize')
const connection = require('../database/database')

const Disciplina = connection.define('disciplinas', {
   disciplina01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina01op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina01op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina01op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina02op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina02op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina02op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina03op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina03op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina03op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina04: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina04op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina04op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina04op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina05: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina05op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina05op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disciplina05op03: {
      type: Sequelize.STRING,
      allowNull: true
    },

})
Disciplina.sync({ force: false })

module.exports = Disciplina