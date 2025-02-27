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
const Assiduidade = require('../models/Assiduidade')
const Pontualidade = require('../models/Pontualidade')
const Iniciativa = require('../models/Iniciativa')
const Disciplina = require('../models/Disciplina')
const Responsabilidade = require('../models/Responsabilidade')
const Qualidade = require('../models/Qualidade')
const Aperfeicoamento = require('../models/Aperfeicoamento')

const adminAuth = require('../middlewares/adminAuth');
const expirar = require('../middlewares/expirar')

const nodemailer = require ('nodemailer')


const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Planilha1');
const moment = require('moment')


router.get('/admin/notas/index', adminAuth ,expirar, (req, res) => {
 
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

  const {q1Ass, q2Ass, q3Ass, q4Ass, q5Ass, comentario_assiduidade,
    q1Pont, q2Pont, q3Pont, q4Pont, q5Pont, comentario_pontualidade,
    q1Ini, q2Ini, q3Ini, q4Ini, q5Ini, comentario_iniciativa,
    q1Disc, q2Disc, q3Disc, q4Disc, q5Disc, comentario_disciplina,
    q1Resp, q2Resp, q3Resp, q4Resp, q5Resp, comentario_responsabilidade,
    q1Qual, q2Qual, q3Qual, q4Qual, q5Qual, comentario_qualidade,
    q1Ape, q2Ape, q3Ape, q4Ape, q5Ape, comentario_aperfeicoamento
  } = req.body
 
  var avaliador_nome = req.body.avaliador_nome
  var acao = 'LANCOU NOTA PARA'
  var funcionario_nome = req.body.funcionario_nome
  var funcionario_matricula = req.body.funcionario_matricula
  var avaliador_matricula = req.body.av_mat
  var data_inicio = req.body.data_inicio 
  var data_fim = req.body.data_fim 
  var avaliador = req.body.avaliador
  var funcionario = req.body.funcionario
  var periodo = req.body.periodo

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
    nota_assiduidade: 5,
    comentario_assiduidade: comentario_assiduidade,
    nota_pontualidade: 5,
    comentario_pontualidade: comentario_pontualidade,
    nota_iniciativa: 5,
    comentario_iniciativa: comentario_iniciativa,
    nota_disciplina: 5,
    comentario_disciplina: comentario_disciplina,
    nota_responsabilidade: 5,
    comentario_responsabilidade: comentario_responsabilidade,
    nota_qualidade: 5,
    comentario_qualidade: comentario_qualidade,
    nota_aperfeicoamento: 5,
    comentario_aperfeicoamento: comentario_aperfeicoamento,
    data_inicio: data_inicio,
    data_fim: data_fim,
    avaliador: avaliador,
    funcionarioId: funcionario,
    periodoId: periodo,

    nota_assiduidade1: q1Ass,
    nota_assiduidade2: q2Ass,
    nota_assiduidade3: q3Ass,
    nota_assiduidade4: q4Ass,
    nota_assiduidade5: q5Ass,

    nota_pontualidade1: q1Pont,
    nota_pontualidade2: q2Pont,
    nota_pontualidade3: q3Pont,
    nota_pontualidade4: q4Pont,
    nota_pontualidade5: q5Pont,

    nota_iniciativa1: q1Ini,
    nota_iniciativa2: q2Ini,
    nota_iniciativa3: q3Ini,
    nota_iniciativa4: q4Ini,
    nota_iniciativa5: q5Ini,

    nota_disciplina1: q1Disc,
    nota_disciplina2: q2Disc,
    nota_disciplina3: q3Disc,
    nota_disciplina4: q4Disc,
    nota_disciplina5: q5Disc,

    nota_responsabilidade1: q1Resp,
    nota_responsabilidade2: q2Resp,
    nota_responsabilidade3: q3Resp,
    nota_responsabilidade4: q4Resp,
    nota_responsabilidade5: q5Resp,

    nota_qualidade1: q1Qual,
    nota_qualidade2: q2Qual,
    nota_qualidade3: q3Qual,
    nota_qualidade4: q4Qual,
    nota_qualidade5: q5Qual,
    
    nota_aperfeicoamento1: q1Ape,
    nota_aperfeicoamento2: q2Ape,
    nota_aperfeicoamento3: q3Ape,
    nota_aperfeicoamento4: q4Ape,
    nota_aperfeicoamento5: q5Ape,
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

  const {q1Ass, q2Ass, q3Ass, q4Ass, q5Ass, comentario_assiduidade,
    q1Pont, q2Pont, q3Pont, q4Pont, q5Pont, comentario_pontualidade,
    q1Ini, q2Ini, q3Ini, q4Ini, q5Ini, comentario_iniciativa,
    q1Disc, q2Disc, q3Disc, q4Disc, q5Disc, comentario_disciplina,
    q1Resp, q2Resp, q3Resp, q4Resp, q5Resp, comentario_responsabilidade,
    q1Qual, q2Qual, q3Qual, q4Qual, q5Qual, comentario_qualidade,
    q1Ape, q2Ape, q3Ape, q4Ape, q5Ape, comentario_aperfeicoamento, funcionario, avaliador, periodo
  } = req.body

    var avaliador_matricula = req.body.av_mat
    var avaliador_nome = req.body.avaliador_nome
    var acao = 'EDITOU NOTA DE'
    var funcionario_matricula = req.body.funcionario_matricula
    var funcionario_nome = req.body.funcionario_nome
   
  Nota.update({
    nota_assiduidade1: q1Ass,
    nota_assiduidade2: q2Ass,
    nota_assiduidade3: q3Ass,
    nota_assiduidade4: q4Ass,
    nota_assiduidade5: q5Ass,
    comentario_assiduidade: comentario_assiduidade,
    nota_pontualidade1: q1Pont,
    nota_pontualidade2: q2Pont,
    nota_pontualidade3: q3Pont,
    nota_pontualidade4: q4Pont,
    nota_pontualidade5: q5Pont,
    comentario_pontualidade: comentario_pontualidade,
    nota_iniciativa1: q1Ini,
    nota_iniciativa2: q2Ini,
    nota_iniciativa3: q3Ini,
    nota_iniciativa4: q4Ini,
    nota_iniciativa5: q5Ini,
    comentario_iniciativa: comentario_iniciativa,
    nota_disciplina1: q1Disc,
    nota_disciplina2: q2Disc,
    nota_disciplina3: q3Disc,
    nota_disciplina4: q4Disc,
    nota_disciplina5: q5Disc,
    comentario_disciplina: comentario_disciplina,
    nota_responsabilidade1: q1Resp,
    nota_responsabilidade2: q2Resp,
    nota_responsabilidade3: q3Resp,
    nota_responsabilidade4: q4Resp,
    nota_responsabilidade5: q5Resp,
    comentario_responsabilidade: comentario_responsabilidade,

    nota_qualidade1: q1Qual,
    nota_qualidade2: q2Qual,
    nota_qualidade3: q3Qual,
    nota_qualidade4: q4Qual,
    nota_qualidade5: q5Qual,
    comentario_qualidade: comentario_qualidade,

    nota_aperfeicoamento1: q1Ape,
    nota_aperfeicoamento2: q2Ape,
    nota_aperfeicoamento3: q3Ape,
    nota_aperfeicoamento4: q4Ape,
    nota_aperfeicoamento5: q5Ape,
    comentario_aperfeicoamento: comentario_aperfeicoamento,

    avaliador: avaliador,
    funcionarioId: funcionario,
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

router.get('/servidor/notas/ver/:id', adminAuth, expirar, (req, res) => {
  var id = req.params.id
  const chefia_av = req.session.funcionario
  
  Nota.findAll({
    include: [{model: Funcionario}]
  }).then(notas =>{
  Funcionario.findAll().then(funcionarios => {
    Periodo.findAll().then(periodos => {
      Assiduidade.findAll().then(assiduidades => {
        Pontualidade.findAll().then(pontualidades => {
          Iniciativa.findAll().then(iniciativas => {
            Disciplina.findAll().then(disciplinas => {
              Responsabilidade.findAll().then(responsabilidades => {
                Qualidade.findAll().then(qualidades => {
                  Aperfeicoamento.findAll().then(aperfeicoamentos => {
                    res.render('admin/notas/veravaliacao', {funcionarios: funcionarios, periodos: periodos, notas: notas, chefia_av, assiduidades, pontualidades, iniciativas, disciplinas, responsabilidades, qualidades, aperfeicoamentos, id})

                  })
                })
              })
            })

        })
        })
      })
     
   
    }).catch(err => {
      res.redirect('/')})  
})})})

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