const express = require ('express')
const router = express.Router();
const Setor = require ('../models/Setor')
const Funcionario = require ('../models/Funcionario');
const Nota = require ('../models/Nota');
const Periodo = require('../models/Periodo');
const Resposta = require('../models/Resposta')
const Historico = require ('../models/Historico')

const adminAuth = require ('../middlewares/adminAuth');
const expirar = require('../middlewares/expirar')

const Questionamento = require('../models/Questionamento');


router.get ('/index', expirar, (req, res) => {
  res.redirect('/servidor')
})

router.get ('/admin/notas/resposta/:id/:periodo', expirar, (req, res) => {

  var id = req.params.id
  var periodo = req.params.periodo

  Funcionario.findAll().then(funcionarios => {
    Questionamento.findAll().then(questionamentos => {
    
        res.render('admin/notas/resposta', {funcionarios:funcionarios, questionamentos: questionamentos, id, periodo})  
    })
  })
})

router.post ('/questionamentos/salvar', adminAuth, expirar, (req, res) => {
  
  var titulo = req.body.titulo.toUpperCase()
  var descricao = req.body.descricao.toUpperCase()
  var av_nome = req.body.av_nome.toUpperCase()
  var av_matricula = req.body.av_matricula
  var servidor_nome = req.body.servidor_nome.toUpperCase()
  var servidor_matricula = req.body.servidor_matricula
  var servidor_id = req.body.servidor_id
  var periodo_questionado = req.body.periodo_questionado
  var aceito = 'NAO'
  var status = 'REQUISICAO'
  
    
  Questionamento.create ({
   titulo: titulo,
   descricao: descricao,
   avaliador_nome: av_nome,
   avaliador_matricula: av_matricula,
   servidor_nome: servidor_nome,
   servidor_matricula: servidor_matricula,
   funcionarioId: servidor_id,
   periodoId: periodo_questionado,
   aceito: aceito,
   status: status
  
  }).then(() =>{


    res.redirect('/index')
    return
  })
})

router.post ('/questionamentos/aceitar', adminAuth, expirar, (req, res) => {
  
  var titulo = req.body.titulo.toUpperCase()
  var descricao = req.body.descricao.toUpperCase()
  var av_nome = req.body.av_nome.toUpperCase()
  var av_matricula = req.body.av_matricula
  var servidor_nome = req.body.servidor_nome.toUpperCase()
  var servidor_matricula = req.body.servidor_matricula
  var servidor_id = req.body.servidor_id
  var periodo_questionado = req.body.periodo_questionado
  var aceito = 'SIM'
  var status = 'DEFERIDO'
  
    
  Questionamento.create ({
   titulo: titulo,
   descricao: descricao,
   avaliador_nome: av_nome,
   avaliador_matricula: av_matricula,
   servidor_nome: servidor_nome,
   servidor_matricula: servidor_matricula,
   periodoId: periodo_questionado,
   funcionarioId: servidor_id,
   aceito: aceito,
   status: status
  
  }).then(() =>{

    res.redirect('/index')
    return
  })
})

router.get('/verquestao/:id', expirar, (req, res) =>{
  var id = req.params.id
  const chefia_av = req.session.funcionario
  
  Nota.findAll({
    include: [{model: Funcionario}]
  }).then(notas =>{
  Funcionario.findAll().then(funcionarios => {
  Questionamento.findAll().then(questionamentos => {
    Periodo.findAll().then(periodos => {
      Resposta.findAll().then(respostas => {
        res.render('admin/notas/questionamento', {funcionarios: funcionarios, periodos: periodos, notas: notas, questionamentos: questionamentos,respostas:respostas, chefia_av, id})
      })

      
  })   
    })
  })
  })
})

router.get('/naoaceito/:id/:periodo', expirar,(req, res) =>{
  id = req.params.id
  periodo = req.params.periodo
  Funcionario.findAll().then(funcionarios => {
    Questionamento.findAll().then(questionamentos => {
      Periodo.findAll().then(periodos => {
        Nota.findAll().then(notas => {
          res.render('admin/notas/naoaceito', {id, periodo, funcionarios: funcionarios, questionamentos:questionamentos, periodos:periodos, notas:notas})
        })
  
})   
})
})
})   

router.get('/aceito/:id/:periodo', expirar, (req, res) =>{
  id = req.params.id
  periodo = req.params.periodo
  Funcionario.findAll().then(funcionarios => {
    Questionamento.findAll().then(questionamentos => {
      Periodo.findAll().then(periodos => {
        Nota.findAll().then(notas => {
          res.render('admin/notas/aceito', {id, periodo, funcionarios: funcionarios, questionamentos:questionamentos, periodos:periodos, notas:notas, periodo})
        })
  
})   
})
})
})   

router.post ('/resposta/salvar', adminAuth, expirar, (req, res) => {
  
  var titulo = req.body.titulo.toUpperCase()
  var descricao = req.body.descricao.toUpperCase()
  var av_nome = req.body.av_nome.toUpperCase()
  var av_matricula = req.body.av_matricula
  var servidor_nome = req.body.servidor_nome.toUpperCase()
  var servidor_matricula = req.body.servidor_matricula
  var servidor_id = req.body.servidor_id
  var questao_id = req.body.questao_id
  var periodo_questionado = req.body.periodo_questionado
 
  var aceito = 'TITULO'
  var status = 'RESPOSTA'
  
    
  Resposta.create ({
   titulo: titulo,
   descricao: descricao,
   avaliador_nome: av_nome,
   avaliador_matricula: av_matricula,
   servidor_nome: servidor_nome,
   servidor_matricula: servidor_matricula,
   questionamentoId: questao_id,
   periodoId: periodo_questionado,

   aceito: aceito,
   status: status
  
  }).then(() =>{
   
    res.redirect('/verquestao/' + servidor_id);
    return
  })
}) 


module.exports = router