const Sequelize = require('sequelize')
const connection = require('../database/database')

const Assiduidade = connection.define('assiduidades', {

  assiduidade01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade01op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade01op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade01op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade02op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade02op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade02op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade03op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade03op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade03op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade04: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade04op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade04op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade04op03: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade05: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade05op01: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade05op02: {
      type: Sequelize.STRING,
      allowNull: true
    },
    assiduidade05op03: {
      type: Sequelize.STRING,
      allowNull: true
    }

})

Assiduidade.sync({ force: false })

module.exports = Assiduidade

