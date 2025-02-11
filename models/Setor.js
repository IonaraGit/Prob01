const Sequelize = require('sequelize')
const connection = require('../database/database')

const Setor = connection.define('setores', {
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  }

})

Setor.sync({ force: false })

module.exports = Setor

