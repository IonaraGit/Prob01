const express = require ('express')
const router = express.Router();
const Nota = require('../models/Nota');
const Funcionario = require('../models/Funcionario');
const Periodo = require ('../models/Periodo')
const Setor = require ('../models/Setor')
const Permissao = require('../models/Permissao')
const Historico = require('../models/Historico')
const Questionamento = require('../models/Questionamento');
const Resposta = require ('../models/Resposta')
const Comissao = require('../models/Comissao')

const adminAuth = require('../middlewares/adminAuth');
const expirar = require('../middlewares/expirar')

const nodemailer = require ('nodemailer')


const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Planilha1');
const moment = require('moment')



router.get('/admin/notas/index', expirar, (req, res) => {
 
  teste = req.session.funcionario 
  Funcionario.findAll().then(funcionarios => {
    Periodo.findAll().then(periodos => {
      Setor.findAll().then(setores =>{
        Nota.findAll().then(notas => {
          Questionamento.findAll().then(questionamentos =>{
            Resposta.findAll().then(respostas => {
              Comissao.findAll().then(comissoes =>{
                res.render('admin/notas/index',{ periodos:periodos, funcionarios:funcionarios, setores:setores, notas:notas, questionamentos: questionamentos, respostas:respostas, comissoes:comissoes, teste})
              })
             
            })
                         
  }).catch((err) => {
    console.log(err)
    res.redirect('/')})})})})})
})


router.get('/servidor', expirar, (req, res) => {
  teste = req.session.funcionario 
  Funcionario.findAll().then(funcionarios => {
    Periodo.findAll().then(periodos => {
      Setor.findAll().then(setores =>{
        Nota.findAll().then(notas => {
          Questionamento.findAll().then(questionamentos =>{
            Resposta.findAll().then(respostas => {
              Comissao.findAll().then((comissoes) => {
                res.render('index',{ periodos:periodos, funcionarios:funcionarios, setores:setores, notas:notas, questionamentos: questionamentos, respostas: respostas, comissoes:comissoes, teste})
              })
             
            })
            
              
  }).catch(() => {
    res.redirect('/')})})})})})
})


router.get('/admin/notas/novo/:id', adminAuth, expirar, (req, res) => {
  var id = req.params.id
  const chefia_av = req.session.funcionario

  
  console.log(`testando o id ${chefia_av}`)
  
  Nota.findAll({
    include: [{model: Funcionario}]
  }).then(notas =>{
  Funcionario.findAll().then(funcionarios => {
  
    Periodo.findAll().then(periodos => {
      res.render('admin/notas/novo', {funcionarios: funcionarios, periodos: periodos, notas: notas, chefia_av, id})
    })
  })
  })
})

router.post ('/notas/salvar', adminAuth, expirar, (req, res) => {
  
          const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth:{
              user: 'ionara_002@hotmail.com',
              pass: 'caixa2103'
            }
          })
                    
          const emailop ={
            from: 'ionara_002@hotmail.com',
            to: 'roque.ionara@gmail.com',
            subject: 'NOTA LANCADA',
            text: 'Conteudo'
          }
          
          transporter.sendMail(emailop, (err, info) => {
            if (err) {
              console.error('Erro ao enviar o e-mail:', err);
            } else {
              console.log('E-mail enviado:', info.response);
            }
          })

  var nota_assiduidade = req.body.nota_assiduidade
  var comentario_assiduidade = req.body.comentario_assiduidade.toUpperCase()
  var nota_pontualidade = req.body.nota_pontualidade
  var comentario_pontualidade = req.body.comentario_pontualidade.toUpperCase()
  var nota_iniciativa = req.body.nota_iniciativa
  var comentario_iniciativa = req.body.comentario_iniciativa.toUpperCase()
  var nota_disciplina = req.body.nota_disciplina
  var comentario_disciplina = req.body.comentario_disciplina.toUpperCase()
  var nota_responsabilidade = req.body.nota_responsabilidade
  var comentario_responsabilidade = req.body.comentario_responsabilidade.toUpperCase()
  var nota_qualidade = req.body.nota_qualidade
  var comentario_qualidade = req.body.comentario_qualidade.toUpperCase()
  var nota_aperfeicoamento = req.body.nota_aperfeicoamento
  var comentario_aperfeicoamento = req.body.comentario_aperfeicoamento.toUpperCase()
  var data_inicio = req.body.data_inicio 
  var data_fim = req.body.data_fim 
  var avaliador = req.body.avaliador
  var funcionario = req.body.funcionario
  var periodo = req.body.periodo

  var avaliador_nome = req.body.avaliador_nome
  var acao = 'LANCOU NOTA PARA'
  var funcionario_nome = req.body.funcionario_nome
  var funcionario_matricula = req.body.funcionario_matricula
  var avaliador_matricula = req.body.av_mat

 
  Funcionario.findAll().then(funcionarios => {
    funcionarios.forEach(funcionario => {
      if(funcionario.matricula == avaliador_matricula) {
        const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth:{
            user: 'ionara_002@hotmail.com',
            pass: 'caixa2103'
          }
        })
                  
        const emailop ={
          from: 'ionara_002@hotmail.com',
          to: funcionario.email,
          subject: 'NOTA LANCADA',
          text: `Você atribuiu uma nota ao servidor(a) ${funcionario_nome}`
        }
        
        transporter.sendMail(emailop, (err, info) => {
          if (err) {
            console.error('Erro ao enviar o e-mail:', err);
          } else {
            console.log('E-mail enviado:', info.response);
          }
        })
      }
      

      if(funcionario.matricula == funcionario_matricula){
        const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth:{
            user: 'ionara_002@hotmail.com',
            pass: 'caixa2103'
          }
        })
                  
        const emailop ={
          from: 'ionara_002@hotmail.com',
          to: funcionario.email,
          subject: 'NOTA LANCADA',
          text: `Você recebeu uma nota, referente ao seu estágio probatório. Clique no link .... e descubra!`
        }
        
        transporter.sendMail(emailop, (err, info) => {
          if (err) {
            console.error('Erro ao enviar o e-mail:', err);
          } else {
            console.log('E-mail enviado:', info.response);
          }
        })
      }
    });
  })

  Nota.create ({
    nota_assiduidade: nota_assiduidade,
    comentario_assiduidade: comentario_assiduidade,
    nota_pontualidade: nota_pontualidade,
    comentario_pontualidade: comentario_pontualidade,
    nota_iniciativa: nota_iniciativa,
    comentario_iniciativa: comentario_iniciativa,
    nota_disciplina: nota_disciplina,
    comentario_disciplina: comentario_disciplina,
    nota_responsabilidade: nota_responsabilidade,
    comentario_responsabilidade: comentario_responsabilidade,
    nota_qualidade: nota_qualidade,
    comentario_qualidade: comentario_qualidade,
    nota_aperfeicoamento: nota_aperfeicoamento,
    comentario_aperfeicoamento: comentario_aperfeicoamento,
    data_inicio: data_inicio,
    data_fim: data_fim,
    avaliador: avaliador,
    funcionarioId: funcionario,
    periodoId: periodo,



        
    }).then (() => {

      Historico.create ({
        matricula_a: avaliador_matricula,
        nome_a: avaliador_nome,
        acao: acao,
        matricula_b: funcionario_matricula,
        nome_b: funcionario_nome,
        periodo: periodo
      })
      res.redirect('/admin/notas/index')
      }).catch(err => {
      res.redirect('/')})   
})

router.post('/admin/notas/voltar', adminAuth, expirar, (req, res) => {
  res.redirect('/admin/notas/index')
 })


router.get('/admin/notas/edicao/:id', adminAuth, expirar, (req, res) => {
  var id = req.params.id
  const chefia_av = req.session.funcionario
  
  Nota.findAll({
    include: [{model: Funcionario}]
  }).then(notas =>{
  Funcionario.findAll().then(funcionarios => {
    Periodo.findAll().then(periodos => {
      
      res.render('admin/notas/edicao', {funcionarios: funcionarios, periodos: periodos, notas: notas, chefia_av, id})
   
    }).catch(err => {
      res.redirect('/')})  
})})})

router.post ('/notas/atualizar', adminAuth, expirar, (req, res) => {
  var id = req.body.id;
  var nota_assiduidade = req.body.nota_assiduidade
  var comentario_assiduidade = req.body.comentario_assiduidade.toUpperCase()
  var nota_pontualidade = req.body.nota_pontualidade
  var comentario_pontualidade = req.body.comentario_pontualidade.toUpperCase()
  var nota_iniciativa = req.body.nota_iniciativa
  var comentario_iniciativa = req.body.comentario_iniciativa.toUpperCase()
  var nota_disciplina = req.body.nota_disciplina
  var comentario_disciplina = req.body.comentario_disciplina.toUpperCase()
  var nota_responsabilidade = req.body.nota_responsabilidade
  var comentario_responsabilidade = req.body.comentario_responsabilidade.toUpperCase()
  var nota_qualidade = req.body.nota_qualidade
  var comentario_qualidade = req.body.comentario_qualidade.toUpperCase()
  var nota_aperfeicoamento = req.body.nota_aperfeicoamento
  var comentario_aperfeicoamento = req.body.comentario_aperfeicoamento.toUpperCase()
  var data_inicio = req.body.data_inicio 
  var data_fim = req.body.data_fim 
  var avaliador = req.body.avaliador
  var funcionario = req.body.funcionario
  var periodo = req.body.periodo

  var avaliador_nome = req.body.avaliador_nome
  var acao = 'EDITOU NOTA DE'
  var funcionario_nome = req.body.funcionario_nome
  var funcionario_matricula = req.body.funcionario_matricula
  var avaliador_matricula = req.body.av_mat

 
  Nota.update({
    nota_assiduidade: nota_assiduidade,
    comentario_assiduidade: comentario_assiduidade,
    nota_pontualidade: nota_pontualidade,
    comentario_pontualidade: comentario_pontualidade,
    nota_iniciativa: nota_iniciativa,
    comentario_iniciativa: comentario_iniciativa,
    nota_disciplina: nota_disciplina,
    comentario_disciplina: comentario_disciplina,
    nota_responsabilidade: nota_responsabilidade,
    comentario_responsabilidade: comentario_responsabilidade,
    nota_qualidade: nota_qualidade,
    comentario_qualidade: comentario_qualidade,
    nota_aperfeicoamento: nota_aperfeicoamento,
    comentario_aperfeicoamento: comentario_aperfeicoamento,
    data_inicio: data_inicio,
    data_fim: data_fim,
    avaliador: avaliador,
    funcionarioId: funcionario,
    periodoId: periodo
  }, {

    where: {
      id:id
    }
  }).then(() => {

    Historico.create ({
      matricula_a: avaliador_matricula,
      nome_a: avaliador_nome,
      acao: acao,
      matricula_b: funcionario_matricula,
      nome_b: funcionario_nome,
      periodo: periodo
    })

    res.redirect('/admin/notas/index')
  }).catch(err => {
    res.redirect('/')})       
})

//EXCEL 
router.get('/sistemas/pdi/relatorios/:id', (req, res) => {

  var id = req.params.id
 
 

  var conteudo = ` 
  <h1>AGORA SIM</h1>
  <hr>
  <p style='color:red'>teste - ID: ${id}, ${nota_assiduidade}</p>

  `
 
  pdf.create(conteudo, {}).toFile("./teste.pdf", (err, res) => {
    if (err) {
      console.log ("um erro")
    }else {
      console.log(res)
    }
  })
  
  res.redirect('/login')
})

module.exports = router