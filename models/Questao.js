const Sequelize = require('sequelize')
const connection = require('../database/database')

const Questao = connection.define('questoes', {
  
  
  
  
 
  
 
 
})

Questao.sync({ force: true })

module.exports = Questao

