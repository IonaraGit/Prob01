const express = require ('express')
const router = express.Router();
const Permissao = require ('../models/Permissao')
const Setor = require ('../models/Setor')
const Funcionario = require ('../models/Funcionario');
const Nota = require ('../models/Nota');
const Periodo = require('../models/Periodo');
const Questionamento = require ('../models/Questionamento')
const Comissao = require ('../models/Comissao')
const bcrypt = require ('bcryptjs')
const adminAuth = require ('../middlewares/adminAuth')

const expirar = require('../middlewares/expirar');




router.get('/pedido/comissao/:id/:periodo',  expirar, adminAuth,(req, res) =>{

  var id = req.params.id
  var periodo = req.params.periodo

  Permissao.findAll().then(permissoes =>{
    Setor.findAll().then(setores =>{
      Nota.findAll().then(notas =>{
        Periodo.findAll().then(periodos => {
          Funcionario.findAll().then(funcionarios => {
            Comissao.findAll().then((comissoes => {
              res.render('admin/comissao/pedido', {funcionarios:funcionarios, periodos:periodos, notas:notas, setores:setores, permissoes:permissoes, comissoes:comissoes, id, periodo})
            }))         
  })})})})})
 
})

router.get ('/painel/rh', adminAuth, expirar, (req, res) => {
  Comissao.findAll().then((comissoes) => {
    Funcionario.findAll().then(funcionarios => {
      Setor.findAll().then(setores =>{
        res.render('admin/comissao/aberto', {comissoes:comissoes, funcionarios: funcionarios, setores:setores})})})
  })
})


router.get ('/painel/inicio', adminAuth, expirar, (req, res) => {
  Comissao.findAll().then((comissoes) => {
    Funcionario.findAll().then(funcionarios => {
      Setor.findAll().then(setores =>{
        res.render('admin/comissao/index', {comissoes:comissoes, funcionarios: funcionarios, setores:setores})})})
  })
})

router.get ('/painel/finalizado', adminAuth, expirar, (req, res) => {
  Comissao.findAll().then((comissoes) => {
    Funcionario.findAll().then(funcionarios => {
      Setor.findAll().then(setores =>{
        res.render('admin/comissao/finalizado', {comissoes:comissoes, funcionarios: funcionarios, setores:setores})})})
  })
})

router.post ('/comissao/rh/salvar', adminAuth, expirar, (req, res) => {
  
  var servidor_matricula = req.body.servidor_matricula
  var servidor_nome = req.body.servidor_nome
  var email_servidor = req.body.email_servidor
  
  var av_nome = req.body.av_nome
  var av_matricula = req.body.av_matricula
  var email_chefia = req.body.email_chefia
  
  var servidor_id = req.body.servidor_id
  var periodo_questionado = req.body.periodo_questionado
 
  var titulo = req.body.titulo.toUpperCase()
  var descricao = req.body.descricao.toUpperCase()

  
  var q_assiduidade = false
  var q_pontualidade = false
  var q_iniciativa = false
  var q_disciplina = false
  var q_responsabilidade = false
  var q_qualidade = false
  var q_aperfeicoamento = false

  if (req.body.nota_assiduidade) {
    q_assiduidade = true
  }
  if (req.body.nota_pontualidade) {
    q_pontualidade = true
  }
  if (req.body.nota_iniciativa) {
    q_iniciativa = true
  }
  if (req.body.nota_disciplina) {
    q_disciplina = true
  }
  if(req.body.nota_responsabilidade){
    q_responsabilidade = true
  }
  if(req.body.nota_qualidade) {
    q_qualidade = true
  }
  if (req.body.nota_aperfeicoamento) {
    q_aperfeicoamento = true
  }
    
  Comissao.create ({
    matricula_servidor: servidor_matricula,
    nome_servidor: servidor_nome,
    email_servidor: email_servidor,
    matricula_chefia: av_matricula,
    nome_chefia: av_nome,
    email_chefia: email_chefia,
    titulo: titulo,
    descricao: descricao,
    q_assiduidade: q_assiduidade,
    q_pontualidade: q_pontualidade,
    q_iniciativa: q_iniciativa,
    q_disciplina: q_disciplina,
    q_responsabilidade: q_responsabilidade,
    q_qualidade: q_qualidade,
    q_aperfeicoamento:q_aperfeicoamento,
    periodoId: periodo_questionado,
    funcionarioId: servidor_id,
    resolvido: false

  }).then(() =>{
   
    res.render('admin/comissao/enviado')
    return
  })
})

router.post ('/comissao/resolvido', (req, res) => {

  var id = req.body.finalizaId

  console.log(`iddddddddddddd ${id}`)
  if (id != undefined) {
    if (!isNaN(id)) {
      Comissao.update ({
        resolvido:true
      }, {
        where: {
          funcionarioId:id
        }
      }).then(() => {
        res.redirect('/painel/finalizado')
      }).catch (err => {
        res.send (err)
      })
    }
  }
})


module.exports = router