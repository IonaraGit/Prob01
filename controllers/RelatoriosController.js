const express = require ('express')
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const expirar = require('../middlewares/expirar');


const Funcionario = require('../models/Funcionario');
const Periodo = require ('../models/Periodo');
const Setor = require ('../models/Setor');
const Nota = require ('../models/Nota');
const Questionamento = require ('../models/Questionamento');
const Resposta = require ('../models/Resposta')
const Comissao = require ('../models/Comissao')
const chalk = require('chalk')

const pdf = require('html-pdf');
const { exec } = require('child_process');



router.get('/relatorio/:id', adminAuth, expirar, (req, res) => {
  var id = req.params.id
  const chefia_av = req.session.funcionario

  Funcionario.findAll().then(funcionarios => {
    Periodo.findAll().then(periodos => {
      Setor.findAll().then(setores =>{
        Nota.findAll().then(notas => {
          Questionamento.findAll().then(questionamentos =>{
            Resposta.findAll().then(respostas => {
              Comissao.findAll().then(comissoes => {
                res.render('admin/relatorios/relatorio', {funcionarios:funcionarios, periodos:periodos, setores:setores, notas:notas, questionamentos:questionamentos, respostas: respostas, comissoes:comissoes, id, chefia_av} )
              })
 
  })})})})})})
})

//PDF
router.post('/gerar/relatorio', adminAuth, expirar, (req, res) => {

  var testando = 0
  var funcionario_nome = req.body.funcionario_nome
  var funcionario_matricula = req.body.funcionario_matricula
  var chefia_nome = req.body.avaliador
  var comissao_nome = req.body.comissao_nome
  var comissao_matricula = req.body.comissao_matricula
  var comissao_cpf = req.body.comissao_cpf
  var notaperiodo1 = '1° AVALIAÇÃO - SEM LANÇAMENTOS'
  var notaperiodo2 = '2° AVALIAÇÃO - SEM LANÇAMENTOS'
  var notaperiodo3 = '3° AVALIAÇÃO - SEM LANÇAMENTOS'

  //VALORES NOTA 1° PERIODO
  var ass1 = ''
  var pon1 = ''
  var ini1 = ''
  var dis1 = ''
  var res1 = ''
  var qua1 = ''
  var ape1 = ''

  //COMENTÁRIOS NOTA 1° PERIODO
  var c_ass1 = ''
  var c_pon1 = ''
  var c_ini1 = ''
  var c_dis1 = ''
  var c_res1 = ''
  var c_qua1 = ''
  var c_ape1 = ''

  //VALORES NOTA 2° PERIODO
  var ass2 = ''
  var pon2 = ''
  var ini2 = ''
  var dis2 = ''
  var res2 = ''
  var qua2 = ''
  var ape2 = ''

  //COMENTÁRIOS NOTA 2° PERIODO
  var c_ass2 = ''
  var c_pon2 = ''
  var c_ini2 = ''
  var c_dis2 = ''
  var c_res2 = ''
  var c_qua2 = ''
  var c_ape2 = ''

  //VALORES NOTA 3° PERIODO
  var ass3 = ''
  var pon3 = ''
  var ini3 = ''
  var dis3 = ''
  var res3 = ''
  var qua3 = ''
  var ape3 = ''

  //COMENTÁRIOS NOTA 3° PERIODO
  var c_ass3 = ''
  var c_pon3 = ''
  var c_ini3 = ''
  var c_dis3 = ''
  var c_res3 = ''
  var c_qua3 = ''
  var c_ape3 = ''

  //TITULO/DESCRIÇÃO QUESTIONAMENTO SERVIDOR 1° PERIODO (ACEITO E NAO ACEITO)
  var ta1 = ''
  var da1 = ''
  var tn1 = ''
  var dn1 = ''

  //TITULO/DESCRIÇÃO QUESTIONAMENTO SERVIDOR 2° PERIODO (ACEITO E NAO ACEITO)
  var ta2 = ''
  var da2 = ''
  var tn2 = ''
  var dn2 = ''

  //TITULO/DESCRIÇÃO QUESTIONAMENTO SERVIDOR 3° PERIODO (ACEITO E NAO ACEITO)
  var ta3 = ''
  var da3 = ''
  var tn3 = ''
  var dn3 = ''

  //TITULO/DESCRIÇÃO RESPOSTA CHEFIA TODOS PERIODOS (ACEITO E NAO ACEITO)
  var rt1 = ''
  var rc1 = ''
  var rt2 = ''
  var rc2 = ''
  var rt3 = ''
  var rc3 = ''

  //DO SERVIDOR PARA COMISSÃO DO PROPATÓRIO - TITULO E DESCRIÇÃO
  var pct1 = ''
  var pcd1 = ''
  var pct2 = ''
  var pcd2 = ''
  var pct3 = ''
  var pcd3 = ''

  //EXATAS NOTAS QUE ESTÃO SENDO QUESTIOONADAS PERIODO 1
  var qas1 = ''
  var qpo1 = ''
  var qin1 = ''
  var qdi1 = ''
  var qre1 = ''
  var qqu1 = ''
  var qap1 = ''

   //EXATAS NOTAS QUE ESTÃO SENDO QUESTIOONADAS PERIODO 2
  var qas2 = ''
  var qpo2 = ''
  var qin2 = ''
  var qdi2 = ''
  var qre2 = ''
  var qqu2 = ''
  var qap2 = ''

   //EXATAS NOTAS QUE ESTÃO SENDO QUESTIOONADAS PERIODO 3
  var qas3 = ''
  var qpo3 = ''
  var qin3 = ''
  var qdi3 = ''
  var qre3 = ''
  var qqu3 = ''
  var qap3 = ''

  //SOMENTE TITULO, DE NOTAS QUE ESTÃO SENDO QUESTIONADAS
  var tnq1 = ''
  var tnq2 = ''
  var tnq3 = ''

  //CABEÇALHO/RODAPÉ TABELA
  var cat1 = ''
  var rot1 = ''
  var cat2 = ''
  var rot2 = ''
  var cat3 = ''
  var rot3 = ''


  Funcionario.findOne({
    where: {
      matricula: funcionario_matricula
    },

  }).then(funcionario => {

    if (funcionario != undefined) {
      testando = funcionario.nome
    }
    console.log(chalk.red.bold(`TEEEEsTANDO 1 ${testando}`))
  
    Nota.findAll().then(notas => {

      notas.forEach(nota => {
        if ((nota.periodoId == 1) && (nota.funcionarioId == funcionario.id)) {

          notaperiodo1 = 1

          cat1 = `<table width="467" border="1">
          <thead>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>NOTA</th>
                <th>COMENTÁRIO</th>          
              </tr>
            </thead>
          </thead>
          <tbody> `

          ass1 = `<tr>
          <td style='text-align: center'>ASSIDUIDADE: </td>
          <td style='text-align: center'>` + nota.nota_assiduidade + `</td>`
          pon1 = `<tr>
          <td style='text-align: center'>PONTUALIDADE: </td>
          <td style='text-align: center'>` + nota.nota_pontualidade + `</td>`
          ini1 = `<tr>
          <td style='text-align: center'>INICIATIVA: </td>
          <td style='text-align: center'>` + nota.nota_iniciativa + `</td>`
          dis1 = `<tr>
          <td style='text-align: center'>DISCIPLINA: </td>
          <td style='text-align: center'>` + nota.nota_disciplina + `</td>`
          res1 = `<tr>
          <td style='text-align: center'>RESPONSABILIDADE: </td>
          <td style='text-align: center'>` + nota.nota_responsabilidade + `</td>`
          qua1 = `<tr>
          <td style='text-align: center'>QUALIDADE DO TRABALHO: </td>
          <td style='text-align: center'>` + nota.nota_qualidade + `</td>`
          ape1 = `<tr>
          <td style='text-align: center'>APERFEICOMENTO: </td>
          <td style='text-align: center'>` + nota.nota_aperfeicoamento + `</td>`

          c_ass1 = `<td style='text-align: center'>` + nota.comentario_assiduidade + `</td> </tr>`
          c_pon1 = `<td style='text-align: center'>` + nota.comentario_pontualidade + `</td> </tr>`
          c_ini1 = `<td style='text-align: center'>` + nota.comentario_iniciativa + `</td> </tr>`
          c_dis1 = `<td style='text-align: center'>` + nota.comentario_disciplina + `</td> </tr>`
          c_res1 = `<td style='text-align: center'>` + nota.comentario_responsabilidade + `</td> </tr>`
          c_qua1 = `<td style='text-align: center'>` + nota.comentario_qualidade + `</td> </tr>`
          c_ape1 = `<td style='text-align: center'>` +  nota.comentario_aperfeicoamento + `</td> </tr>`
        
          rot1 = ` </tbody>
          </table>  `

        
        }
        if ((nota.periodoId == 2) && (nota.funcionarioId == funcionario.id)) {
          notaperiodo2 = 2

          cat2 = `<table width="467" border="1">
          <thead>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>NOTA</th>
                <th>COMENTÁRIO</th>          
              </tr>
            </thead>
          </thead>
          <tbody> `

          ass2 = `<tr>
          <td style='text-align: center'>ASSIDUIDADE: </td>
          <td style='text-align: center'>` + nota.nota_assiduidade + `</td>`
          pon2 = `<tr>
          <td style='text-align: center'>PONTUALIDADE: </td>
          <td style='text-align: center'>` + nota.nota_pontualidade + `</td>`
          ini2 = `<tr>
          <td style='text-align: center'>INICIATIVA: </td>
          <td style='text-align: center'>` + nota.nota_iniciativa + `</td>`
          dis2 = `<tr>
          <td style='text-align: center'>DISCIPLINA: </td>
          <td style='text-align: center'>` + nota.nota_disciplina + `</td>`
          res2 = `<tr>
          <td style='text-align: center'>RESPONSABILIDADE: </td>
          <td style='text-align: center'>` + nota.nota_responsabilidade + `</td>`
          qua2 = `<tr>
          <td style='text-align: center'>QUALIDADE DO TRABALHO: </td>
          <td style='text-align: center'>` + nota.nota_qualidade + `</td>`
          ape2 = `<tr>
          <td style='text-align: center'>APERFEICOMENTO: </td>
          <td style='text-align: center'>` + nota.nota_aperfeicoamento + `</td>`

          c_ass2 = `<td style='text-align: center'>` + nota.comentario_assiduidade + `</td> </tr>`
          c_pon2 = `<td style='text-align: center'>` + nota.comentario_pontualidade + `</td> </tr>`
          c_ini2 = `<td style='text-align: center'>` + nota.comentario_iniciativa + `</td> </tr>`
          c_dis2 = `<td style='text-align: center'>` + nota.comentario_disciplina + `</td> </tr>`
          c_res2 = `<td style='text-align: center'>` + nota.comentario_responsabilidade + `</td> </tr>`
          c_qua2 = `<td style='text-align: center'>` + nota.comentario_qualidade + `</td> </tr>`
          c_ape2 = `<td style='text-align: center'>` +  nota.comentario_aperfeicoamento + `</td> </tr>`
        
          rot2 = ` </tbody>
          </table>  `
        }
        if ((nota.periodoId == 3) && (nota.funcionarioId == funcionario.id)) {
          notaperiodo3 = 3

          cat3 = `<table width="467" border="1">
          <thead>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>NOTA</th>
                <th>COMENTÁRIO</th>          
              </tr>
            </thead>
          </thead>
          <tbody> `

          ass3 = `<tr>
          <td style='text-align: center'>ASSIDUIDADE: </td>
          <td style='text-align: center'>` + nota.nota_assiduidade + `</td>`
          pon3 = `<tr>
          <td style='text-align: center'>PONTUALIDADE: </td>
          <td style='text-align: center'>` + nota.nota_pontualidade + `</td>`
          ini3 = `<tr>
          <td style='text-align: center'>INICIATIVA: </td>
          <td style='text-align: center'>` + nota.nota_iniciativa + `</td>`
          dis3 = `<tr>
          <td style='text-align: center'>DISCIPLINA: </td>
          <td style='text-align: center'>` + nota.nota_disciplina + `</td>`
          res3 = `<tr>
          <td style='text-align: center'>RESPONSABILIDADE: </td>
          <td style='text-align: center'>` + nota.nota_responsabilidade + `</td>`
          qua3 = `<tr>
          <td style='text-align: center'>QUALIDADE DO TRABALHO: </td>
          <td style='text-align: center'>` + nota.nota_qualidade + `</td>`
          ape3 = `<tr>
          <td style='text-align: center'>APERFEICOMENTO: </td>
          <td style='text-align: center'>` + nota.nota_aperfeicoamento + `</td>`

          c_ass3 = `<td style='text-align: center'>` + nota.comentario_assiduidade + `</td> </tr>`
          c_pon3 = `<td style='text-align: center'>` + nota.comentario_pontualidade + `</td> </tr>`
          c_ini3 = `<td style='text-align: center'>` + nota.comentario_iniciativa + `</td> </tr>`
          c_dis3 = `<td style='text-align: center'>` + nota.comentario_disciplina + `</td> </tr>`
          c_res3 = `<td style='text-align: center'>` + nota.comentario_responsabilidade + `</td> </tr>`
          c_qua3 = `<td style='text-align: center'>` + nota.comentario_qualidade + `</td> </tr>`
          c_ape3 = `<td style='text-align: center'>` +  nota.comentario_aperfeicoamento + `</td> </tr>`
        
          rot3 = ` </tbody>
          </table>  `
        }

       
        
      })
      Questionamento.findAll().then (questionamentos => {
        questionamentos.forEach(questionamento => {
          console.log(`ESSE É O FUNCIONARIO ID ${funcionario.id}`)
          if ((questionamento.periodoId == 1) && (questionamento.funcionarioId == funcionario.id)) {
            if (questionamento.aceito == 'NAO') {
              tn1 = `<p style='font-weight: bold'> QUESTIONAMENTO SERVIDOR: ` + `<span style='color: blue'>` + questionamento.titulo + `</span></p>` 
              dn1 = `<p style='font-weight: 200'>` + questionamento.descricao + `</p>`
      
            }
            if (questionamento.aceito == 'SIM'){
              ta1 = `<p style='font-weight: bold'>` + questionamento.titulo `</p>`
              da1 = `<p style='font-weight: 200'>` + questionamento.descricao + `</p>`
            }
          }
          if ((questionamento.periodoId == 2) && (questionamento.funcionarioId == funcionario.id)){
            if (questionamento.aceito == 'NAO') {
              tn2 =  `<p style='font-weight: bold'> QUESTIONAMENTO SERVIDOR: ` + `<span style='color: blue'>` + questionamento.titulo + `</span></p>`
              dn2 = `<p style='font-weight: 200'>` + questionamento.descricao + `</p>`
            }
            if (questionamento.aceito == 'SIM'){
              ta2 = `<p style='font-weight: bold'>` + questionamento.titulo `</p>`
              da2 = `<p style='font-weight: 200'>` + questionamento.descricao + `</p>`
            }
          }
          if ((questionamento.periodoId == 3) && (questionamento.funcionarioId == funcionario.id)) {
            if (questionamento.aceito == 'NAO') {
              tn3 = `<p style='font-weight: bold'> QUESTIONAMENTO SERVIDOR: ` + `<span style='color: blue'>` + questionamento.titulo + `</span></p>`
              dn3 = `<p style='font-weight: 200'>` + questionamento.descricao + `</p>`
            }
            if (questionamento.aceito == 'SIM'){
              ta3 = `<p style='font-weight: bold'> QUESTIONAMENTO SERVIDOR: ` + `<span style='color: blue'>` + questionamento.titulo + `</span></p>`
              da3 = `<p style='font-weight: 200'>` + questionamento.descricao + `</p>`
            }
          }
        
        })

        Resposta.findAll().then (respostas => {
          respostas.forEach(resposta => {
            if ((resposta.periodoId == 1) && (funcionario.matricula == resposta.servidor_matricula)) {
              rt1 = `<p style='font-weight: bold'>RESPOSTA CHEFIA: <span style='color: blue'>` + resposta.titulo + `</span></p>`
              rc1 = `<p style='font-weight: 200'>` + resposta.descricao + `</p>`

            }
            if ((resposta.periodoId == 2) && (funcionario.matricula == resposta.servidor_matricula)) {
              rt2 = `<p style='font-weight: bold'>RESPOSTA CHEFIA: <span style='color: blue'>` + resposta.titulo + `</span></p>`
              rc2 = `<p style='font-weight: 200'>` + resposta.descricao + `</p>`
            }
            if ((resposta.periodoId == 3) && (funcionario.matricula == resposta.servidor_matricula)) {
              rt3 = `<p style='font-weight: bold'>RESPOSTA CHEFIA: <span style='color: blue'>` + resposta.titulo + `</span></p>`
              rc3 =  `<p style='font-weight: 200'>` + resposta.descricao + `</p>`
            }

          })

          Comissao.findAll().then (comissoes => {
            comissoes.forEach(comissao => {
              if ((comissao.periodoId == 1) && (comissao.funcionarioId == funcionario.id)){

                
                pct1 =` <p style='font-weight: bold; color: red'>COMISSÃO DE AVALIAÇÃO AO ESTÁGIO PROBATÓRIO!</p>
                <p style='font-weight: bold'>QUESTIONAMENTO SERVIDOR: <span style='color: #006400'>` + comissao.titulo + `</span></p>`
                pcd1 = `<p style='font-weight: 200'>` + comissao.descricao + `</p>`

                tnq1 = `<p style='font-weight: bold'>NOTAS QUESTIONADAS </p>`

                if (comissao.q_assiduidade == true) {
                  qas1 = '<p>' + ass1 + '</p>'
                }
                if (comissao.q_pontualidade == true) {
                  qap1 = '<p>' + pon1 +'</p>'
                }
                if (comissao.q_iniciativa == true) {
                  qin1 = '<p>' + ini1 + '</p>'
                }
                if (comissao.q_disciplina == true) {
                  qdi1 = '<p>' + dis1 + '</p>'
                }
                if (comissao.q_responsabilidade == true) {
                  qre1 = '<p>' + res1 + '</p>'
                }
                if (comissao.q_qualidade == true) {
                  qre1 = '<p>' + qua1 + '</p>'
                }
                if (comissao.q_aperfeicoamento == true) {
                  qap1 = '<p>' + ape1 + '</p>'
                }
              }
              if ((comissao.periodoId == 2) && (comissao.funcionarioId == funcionario.id)){
                pct2 = ` <p style='font-weight: bold; color: red'>COMISSÃO DE AVALIAÇÃO AO ESTÁGIO PROBATÓRIO!</p>
                <p style='font-weight: bold'>QUESTIONAMENTO SERVIDOR: <span style='color: #006400'>` + comissao.titulo + `</span></p>`
                pcd2 =`<p style='font-weight: 200'>` + comissao.descricao + `</p>`

                tnq2 = `<p style='font-weight: bold'>NOTAS QUESTIONADAS </p>`

                if (comissao.q_assiduidade == true) {
                  qas2 = '<p>' + ass2 + '</p>'
                }
                if (comissao.q_pontualidade == true) {
                  qap2 = '<p>' + pon2 +'</p>'
                }
                if (comissao.q_iniciativa == true) {
                  qin2 = '<p>' + ini2 + '</p>'
                }
                if (comissao.q_disciplina == true) {
                  qdi2 = '<p>' + dis2 + '</p>'
                }
                if (comissao.q_responsabilidade == true) {
                  qre2 = '<p>' + res2 + '</p>'
                }
                if (comissao.q_qualidade == true) {
                  qre2 = '<p>' + qua2 + '</p>'
                }
                if (comissao.q_aperfeicoamento == true) {
                  qap2 = '<p>' + ape2 + '</p>'
                }
              }
              if ((comissao.periodoId == 3) && (comissao.funcionarioId == funcionario.id)){
                pct3 = ` <p style='font-weight: bold; color: red'>COMISSÃO DE AVALIAÇÃO AO ESTÁGIO PROBATÓRIO!</p>
                <p style='font-weight: bold'>QUESTIONAMENTO SERVIDOR: <span style='color: #006400'>` + comissao.titulo + `</span></p>`
                pcd3 = `<p style='font-weight: 200'>` + comissao.descricao + `</p>`

                tnq3 = `<p style='font-weight: bold'>NOTAS QUESTIONADAS </p>`

                if (comissao.q_assiduidade == true) {
                  qas3 = '<p>' + ass3 + '</p>'
                }
                if (comissao.q_pontualidade == true) {
                  qap3 = '<p>' + pon3 +'</p>'
                }
                if (comissao.q_iniciativa == true) {
                  qin3 = '<p>' + ini3 + '</p>'
                }
                if (comissao.q_disciplina == true) {
                  qdi3 = '<p>' + dis3 + '</p>'
                }
                if (comissao.q_responsabilidade == true) {
                  qre3 = '<p>' + res3 + '</p>'
                }
                if (comissao.q_qualidade == true) {
                  qre3 = '<p>' + qua3 + '</p>'
                }
                if (comissao.q_aperfeicoamento == true) {
                  qap3 = '<p>' + ape3 + '</p>'
                }
              }
            })
           
            var conteudo = ` 
  
            <img src="https://salto.sp.gov.br/wp-content/uploads/2022/06/logo.png" width="25%">
            <img src="https://salto.sp.gov.br/wp-content/uploads/2022/06/logo_anselmo_duarte.png" width="23%;">
            <hr>
            <h3 style='color:red; text-align: center'>ESTÁGIO PROBATÓRIO</h3>
            <hr>
            <p style='font-weight: bold'>SERVIDOR: <span style='font-weight: 200'>${funcionario_nome}</span></p>
            <p style='font-weight: bold;'>MATRICULA: <span style='font-weight: 200'>${funcionario_matricula}</span></p>
            <p style='font-weight: bold'>DATA DE ADMISSAO: <span style='font-weight: 200;'>inserir campos</span></p>
            <hr>
            <p style='font-weight: bold'>CHEFIA: <span style='font-weight: 200'>${chefia_nome}</span></p>
            <hr>
            <p style='font-weight: bold'>PERIODO: <span style='font-weight: 200'>${notaperiodo1 + `° AVALIAÇÃO`}</span></p>
          
           
            ${cat1} 
              ${ass1}              
              ${c_ass1}
              ${pon1}
              ${c_pon1}     
              ${ini1}
              ${c_ini1}
              ${dis1}
              ${c_dis1}
              ${res1}
              ${c_res1}
              ${qua1}
              ${c_qua1}
              ${ape1}         
              ${c_ape1}    
            ${rot1}
            <hr>
            ${tn1} 
            ${dn1}
        
            ${rt1} 
            ${rc1}
     
            ${ta1}
            ${da1}
            <br>
            
            ${pct1} 
            ${pcd1}
               
            ${tnq1}
            
            ${qas1}
            ${qpo1}
            ${qin1}
            ${qdi1}
            ${qre1}
            ${qqu1}
            ${qap1}

            <hr>
            <hr>
 
            <p style='font-weight: bold'>PERIODO: <span style='font-weight: 200'>${notaperiodo2}</span></p>
          
            ${cat2}
              ${ass2}              
              ${c_ass2}
              ${pon2}
              ${c_pon2}     
              ${ini2}
              ${c_ini2}
              ${dis2}
              ${c_dis2}
              ${res2}
              ${c_res2}
              ${qua2}
              ${c_qua2}
              ${ape2}         
              ${c_ape2}    
            ${rot2}
            <hr>
            ${tn2} 
            ${dn2}
              
            ${rt2} 
            ${rc2}
            ${ta2}
            ${da2}
            <br>
          
            ${pct2} 
            ${pcd2}

            ${tnq2}
              
            ${qas2}
            ${qpo2}
            ${qin2}
            ${qdi2}
            ${qre2}
            ${qqu2}
            ${qap2}

            <hr>
            <hr>
    
            <p style='font-weight: bold'>PERIODO: <span style='font-weight: 200'>${notaperiodo3}</span></p>
            ${cat3}
              ${ass3}              
              ${c_ass3}
              ${pon3}
              ${c_pon3}     
              ${ini3}
              ${c_ini3}
              ${dis3}
              ${c_dis3}
              ${res3}
              ${c_res3}
              ${qua3}
              ${c_qua3}
              ${ape3}         
              ${c_ape3}    
              ${rot3}
              
              <hr>
              ${tn3} 
              ${dn3}
              
              ${rt3} 
              ${rc3}
              ${ta3}
              ${da3}
              <br>
                
              ${pct3}
              ${pcd3}

              ${tnq3}

              ${qas3}
              ${qpo3}
              ${qin3}
              ${qdi3}
              ${qre3}
              ${qqu3}
              ${qap3}
              <hr>
              <hr>

              <p style='font-weight: bold;'>RELATÓRIO DA REUNIÃO: </p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
               
              <p style='font-weight: bold;'>FICA-SE ACORDADO ENTRE AS PARTES QUE:</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>
              <p>_____________________________________________________________________________________________</p>

              <br>
              <br>

      
              <p style='text-align:center'>SALTO, ____________DE_____________________DE 20____</p>

              <br> 
              <br>
              <div style="text-align: center;">
                <div style="display: inline-block; margin-right: 50px">
                  <p>_______________________________________</p>
                  <p>${funcionario.nome}</p>
                  <p>${funcionario.cpf} </p>
                  <p>${funcionario.matricula}</p>
                </div>
                <div style="display: inline-block; margin-left: 50px">
                  <p>_______________________________________</p>
                  <p>${comissao_nome}</p>
                  <p>${comissao_cpf}</p>
                  <p>${comissao_matricula}</p>
                </div>
              </div>

              <div style="text-align: center;">
                <div style="display: inline-block; margin-right: 50px">
                  <p>_______________________________________</p>
                  <p style="text-align: left;">TESTEMUNHA 1: ________________________
                  </p>
                  <p style="text-align: left;">CPF: ___________________________________</p>
                  <p style="text-align: left;">MATRICULA: ____________________________</p>
                </div>
                <div style="display: inline-block; ">
                  <div style="display: inline-block; margin-left: 50px">
                    <p>_______________________________________</p>
                    <p style="text-align: left;">TESTEMUNHA 2: ________________________
                    </p>
                    <p style="text-align: left;">CPF: ___________________________________</p>
                    <p style="text-align: left;">MATRICULA: ____________________________</p>
                  </div>
                </div>
              </div>

            `
            pdf.create(conteudo, {}).toFile('./teste.pdf', (err, res) => {
              if (err) {
                console.error('Ocorreu um erro ao gerar o relatório:', err);
              } else {
                console.log('Relatório gerado com sucesso!');
                // Abrir o arquivo PDF em uma nova guia do navegador
                exec('start ./teste.pdf', (error, stdout, stderr) => {
                  if (error) {
                    console.error('Erro ao abrir o arquivo:', error);
                  }
                });
              }
            });
          })
        })
      })       
   })
  })
  res.redirect('/painel/rh')
})

module.exports = router