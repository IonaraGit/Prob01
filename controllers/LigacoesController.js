const express = require ('express')
const router = express.Router();
const Setor = require ('../models/Setor');
const Funcionario = require('../models/Funcionario')
const Ligacao = require('../models/Ligacao');
const connection = require('../database/database')
const adminAuth = require ('../middlewares/adminAuth')
const adminUser = require ('../middlewares/adminUser')


router.get('/admin/ligacoes', (req, res) =>{
  Ligacao.findAll({
    include: [{model: Funcionario}], //NA BUSCA, INCLUI AS CATEGORIAS PELO RELACIONAMENTO
    include: [{model: Setor}]
  }).then(ligacoes =>{
    Funcionario.findAll().then(funcionarios =>{
      Setor.findAll().then(setores =>{
        res.render('admin/ligacoes/index', {ligacoes: ligacoes, funcionarios: funcionarios, setores: setores})
      })
    })
  
  })
})

router.get ('/admin/ligacoes/novo', (req, res) => {
  Funcionario.findAll().then(funcionarios => {
    Setor.findAll().then(setores => {
      res.render('admin/ligacoes/novo', {funcionarios: funcionarios, setores: setores})
    })
  })
})

router.post ('/ligacoes/salvar', (req, res) => {
  var chefia = req.body.chefia
  var servidor = req.body.servidor
  var setor = req.body.setor


  Ligacao.create ({
    chefia: chefia,
    servidor: servidor,
    setoreId: setor
    
  }).then (() => {
    res.redirect('/admin/ligacoes')
  })
})

router.post('/ligacoes/deletar', (req, res) => {
  var id = req.body.id
  if (id != undefined) {
      if (!isNaN(id)){

        Ligacao.destroy ({
          where: {
            id: id
          }
        }).then(() => {
          res.redirect ('/admin/ligacoes')
        })

      }else { //NÃO FOR NUMERO
        res.redirect ('/admin/ligacoes')
      }
    }else { //NULL
      res.redirect ('/admin/ligacoes')
    }
})

router.get('/admin/ligacoes/editar/:id', (req, res) => {
  var id = req.params.id

  Ligacao.findByPk(id).then (ligacao => {

    if (ligacao != undefined) {

      Funcionario.findAll().then( funcionarios => {
        Setor.findAll().then( setores => {
        
          res.render('admin/ligacoes/edicao', {funcionarios: funcionarios, setores:setores, ligacao: ligacao})
        })
      })

    }else {
      res.redirect('/admin/ligacoes')
    }

  }).catch (err => {
    res.redirect('/admin/ligacoes');
  })
})

router.post('/ligacoes/atualizar', (req, res) => {
  var id = req.body.id;
  var chefia = req.body.chefia
  var servidor = req.body.servidor
  var permissao = req.body.permissao

  Ligacao.update({
    chefia: chefia,
    servidor: servidor,
    permissoId: permissao
  },{
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/ligacoes')
  }).catch(err => {
    console.log(err)
    res.redirect('/')
  })
})



module.exports = router