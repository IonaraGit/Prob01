const express = require('express')
const router = express.Router()
const Setor = require('../models/Setor')
const Funcionario = require('../models/Funcionario')
const Permissao = require('../models/Permissao')
const adminAuth = require ('../middlewares/adminAuth')
const adminUser = require('../middlewares/adminUser')
const expirar = require ('../middlewares/expirar')

router.get('/admin/setores/novo', adminAuth, adminUser, expirar, (req, res) => {
  res.render('admin/setores/novo')
})

router.post('/setores/salvar', adminAuth, adminUser, expirar, (req, res) => {
  var descricao = req.body.descricao

  if (descricao != undefined) {
    Setor.create({
      descricao: descricao.toUpperCase()
    }).then(() => {
      res.redirect('/admin/setores')
    })
  } else {
    res.redirect('/admin/setores/novo')
  }
})

router.get('/admin/setores', adminAuth, adminUser, expirar, (req, res) => {
  Setor.findAll({}).then(setores => {
    res.render('admin/setores/index', { setores: setores })
  })
})

router.post('/setores/deletar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
 
  if (id != undefined) {
    if (!isNaN(id)) {
  
      Funcionario.count({
        where: {
          setoreId: id,
        },
      }).then(count => {
        if (count > 0) {
          // Há funcionários vinculados a este setor, não é possível excluí-lo
          res.redirect('/admin/setores')

        } else {
          // Não há funcionários vinculados a este setor, pode ser excluído
          Setor.destroy({
            where: {
              id: id,
            },
          }).then(() => {
            res.redirect('/admin/setores')
          })
        }
      })

    } else {
      //NÃO FOR NUMERO
      res.redirect('/admin/setores')
    }
  } else {
    //NULL
    res.redirect('/admin/setores')
  }
})


router.get('/admin/setores/edicao/:id', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.params.id

  if (isNaN(id)) {
    res.redirect('/admin/setores')
  }

  //PESQUISA PELO ID
  Setor.findByPk(id)
    .then(setor => {
      if (setor != undefined) {
        res.render('admin/setores/edicao', { setor: setor })
      } else {
        res.redirect('/admin/setores')
      }
    })
    .catch(err => {
      res.redirect('/admin/setores')
    })
})

router.post('/setores/atualizar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
  var descricao = req.body.descricao.toUpperCase()

  Setor.update({descricao: descricao},{ //ATUALIZA ISSO
    where: {id:id} //NESTE ID
  }).then(() => {
    res.redirect ('/admin/setores')
  }).catch(err => {
    res.redirect('/login')})

})

router.get('/admin/setores/ver/:setorId', adminAuth, adminUser, expirar, (req, res) => {

  Setor.findByPk(req.params.setorId, {
    include: [{model: Funcionario}],
  }).then(setor =>{
    
    const funcionariosDoSetor = setor.funcionarios;
    res.render('admin/setores/ver', {setor: setor, funcionarios: funcionariosDoSetor}) 
  }).catch(err => {
    res.redirect('/login')})

})


router.get('/admin/setores/ver/:setorId', adminAuth, adminUser, expirar, (req, res) => {

  Setor.findByPk(req.params.setorId, {
    include: [{model: Funcionario}],
  }).then(setor =>{
    
    const funcionariosDoSetor = setor.funcionarios;
    res.render('admin/setores/ver', {setor: setor, funcionarios: funcionariosDoSetor}) 
  }).catch(err => {
    res.redirect('/login')})
})

module.exports = router
