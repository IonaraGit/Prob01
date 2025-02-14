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

router.post ('/notas/atualizar', adminAuth, expirar, (req, res) => {
  var id = req.body.id;

  

  var nota_assiduidade = 5
  var comentario_assiduidade = req.body.comentario_assiduidade.toUpperCase()
  var nota_pontualidade = 5
  var comentario_pontualidade = req.body.comentario_pontualidade.toUpperCase()
  var nota_iniciativa = 5
  var comentario_iniciativa = req.body.comentario_iniciativa.toUpperCase()
  var nota_disciplina = 5
  var comentario_disciplina = req.body.comentario_disciplina.toUpperCase()
  var nota_responsabilidade = 5
  var comentario_responsabilidade = req.body.comentario_responsabilidade.toUpperCase()
  var nota_qualidade = 5
  var comentario_qualidade = req.body.comentario_qualidade.toUpperCase()
  var nota_aperfeicoamento = 5
  var comentario_aperfeicoamento = req.body.comentario_aperfeicoamento.toUpperCase()
  var data_inicio = req.body.data_inicio 
  var data_fim = req.body.data_fim 
  var avaliador = req.body.avaliador
  var funcionario = req.body.funcionario
  var periodo = req.body.periodo

  var avaliador_matricula = req.body.av_mat
  var avaliador_nome = req.body.avaliador_nome
  var acao = 'EDITOU NOTA DE'
  var funcionario_matricula = req.body.funcionario_matricula
  var funcionario_nome = req.body.funcionario_nome


  

 
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