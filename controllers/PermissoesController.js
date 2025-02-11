const express = require ('express')
const router = express.Router();
const Permissao = require ('../models/Permissao')
const Funcionario = require ('../models/Funcionario')
const adminAuth = require('../middlewares/adminAuth')
const adminUser = require('../middlewares/adminUser')
const expirar = require('../middlewares/expirar')

router.get('/admin/permissoes/novo', adminAuth, adminUser, expirar, (req, res) => {
  res.render('admin/permissoes/novo')
})


router.post('/permissoes/salvar', adminAuth, adminUser, expirar, (req, res) => {
  var descricao = req.body.descricao

  if (descricao != undefined) {
    Permissao.create({
      descricao: (descricao).toUpperCase()
    }).then(() => {
      res.redirect('/admin/permissoes')
    })

  }else {
    res.redirect('/admin/permissoes/novo')
  }
})

router.get('/admin/permissoes', adminAuth, adminUser, expirar, (req, res) => {

  Permissao.findAll({
    include: [{model: Funcionario}] //NA BUSCA, INCLUI AS CATEGORIAS PELO RELACIONAMENTO
  }).then(permissoes =>{
    Funcionario.findAll().then(funcionarios =>{
      res.render('admin/permissoes/index', {funcionarios: funcionarios, permissoes: permissoes})
    })
    
  })
})

router.post('/pemissoes/deletar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
  if (id != undefined) {
      if (!isNaN(id)){

        Funcionario.count ({
          where: {
            permissoId: id
          },

        }).then (count => {
          if (count > 0 ) {
            res.redirect('/admin/permissoes')
          } else {
            Permissao.destroy ({
              where: {
                id: id
              }
            }).then(() => {
              res.redirect ('/admin/permissoes')
            })
          }
          
        })


      }else { //NÃO FOR NUMERO
        res.redirect ('/admin/permissoes')
      }
    }else { //NULL
      res.redirect ('/admin/permissoes')
    }
})

router.get('/admin/permissoes/edicao/:id', adminAuth, adminUser, expirar, (req, res) =>{
  var id = req.params.id

  if(isNaN(id)) {
    res.redirect ('/admin/permissoes')
  }
  
  //PESQUISA PELO ID
  Permissao.findByPk(id).then(permissao => {
    if (permissao != undefined) {
      res.render ('admin/permissoes/edicao', {permissao: permissao})
    }else {
      res.redirect ('/admin/permissoes')
    }
  }).catch(err => {
    res.redirect ('/admin/permissoes')
  })
})

router.post('/permissoes/atualizar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
  var descricao = req.body.descricao.toUpperCase()

  Permissao.update({descricao: descricao},{ //ATUALIZA ISSO
    where: {id:id} //NESTE ID
  }).then(() => {
    res.redirect ('/admin/permissoes')
  })

})

module.exports = router