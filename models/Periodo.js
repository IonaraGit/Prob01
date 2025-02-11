const Sequelize = require('sequelize')
const connection = require('../database/database')

const Periodo = connection.define('periodos', {
  descricao: {
    type: Sequelize.STRING,
    allowNull: true
  }

})

Periodo.sync({ force: false })

module.exports = Periodo
