const express = require ('express')
const router = express.Router();
const Historico = require ('../models/Historico')

const adminAuth = require ('../middlewares/adminAuth')
const adminUser = require ('../middlewares/adminUser')
const expirar = require('../middlewares/expirar')



router.get('/admin/historicos/index/:num', adminAuth, adminUser, expirar, (req, res) =>{

  let limit = parseInt(req.query.limit) || 10; // VALOR PADRÃO DE ITENS MOSTRADOS = 10
  const pagina = parseInt(req.params.num) || 1; // VALOR PADRÃO DO NUMERO DA PAGINA = 10
  const offset = (pagina - 1) * limit;
     
    Historico.findAndCountAll({
      
      limit: limit, 
      offset: offset

    }).then(historicos => {   
          
      let totalHistoricos = historicos.count;

      if (limit > totalHistoricos){
        limit = totalHistoricos 
      }

      const resultado = {
        paginacao: pagina,
        next: (pagina * limit) < totalHistoricos,
        historicos: historicos,
        totalHistoricos: totalHistoricos
      }
      res.render('admin/historicos/index', {resultado, limit, historicos}) 
  
}).catch (err => {
  console.log(`Erro aquiii ${err}`)
  res.redirect('/login')
})
  
})


module.exports = router