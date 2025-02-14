const express = require ('express')
const router = express.Router();
const Permissao = require ('../models/Permissao')
const Setor = require ('../models/Setor')
const Funcionario = require ('../models/Funcionario');
const Nota = require ('../models/Nota');
const Periodo = require('../models/Periodo');
const Questionamento = require ('../models/Questionamento')


const bcrypt = require ('bcryptjs')
const adminAuth = require ('../middlewares/adminAuth')
const adminUser = require ('../middlewares/adminUser')
const expirar = require('../middlewares/expirar')


//LOGIN
router.get ('/', (req, res) => {
 
  res.redirect('/login')
})

router.get('/login', (req, res) =>{
  res.render('admin/login/login')
})

router.post('/autenticacao', (req, res) =>{
  var matricula = req.body.matricula;
  var senha = req.body.senha

  Funcionario.findOne({
    where: {
      matricula: matricula
    },

  }).then(funcionario => {
    //SE EXISTE
    if (funcionario != undefined) {
      //VALIDAR SENHA
      if (funcionario.primeiro_acesso == 0) {

        teste = req.session.funcionario = {
          matricula: funcionario.matricula,
          resposta_secreta: funcionario.resposta_secreta
        }
        
        res.render ('admin/login/alterar', teste)
        return
      }

      var correto = bcrypt.compareSync(senha, funcionario.senha)
     
      if (correto) {
  
        teste = req.session.funcionario = {
          id: funcionario.id,
          matricula: funcionario.matricula,
          nome: funcionario.nome,
          setoreId: funcionario.setoreId,
          permissoId: funcionario.permissoId
        }

        if (funcionario.permissoId == 1){
          Funcionario.findAll({
            include: [{model: Permissao}] //NA BUSCA, INCLUI AS CATEGORIAS PELO RELACIONAMENTO
          }).then(funcionarios =>{
            Permissao.findAll().then(permissoes =>{
              Setor.findAll().then(setores =>{
                Nota.findAll().then(notas =>{
                  Periodo.findAll().then(periodos => {
                    res.redirect('/admin/funcionarios/index/1')
          })})})})})

        } else if (funcionario.permissoId == 3) {
          
           
          Nota.findOne({
            where: {funcionarioId : funcionario.id}
          }).then (nota => {
            if (nota) {
            
                res.redirect('/servidor')
              
            }else{
              res.render('admin/notas/semnota')
            }
           
        
          })

        } else if (funcionario.permissoId == 2) {
       
          res.redirect('/admin/notas/index')
        
        } else if (funcionario.permissoId == 4) {
          res.redirect('/painel/inicio')
        }
      }else{
        res.render('admin/login/login');
      }
    }else {   
      res.render('admin/login/login');
    }
  }).catch(err => {
    res.redirect('/login')})
})

router.get ('/confere', (req, res) => {
  var resposta_secreta = req.query.resposta_secreta.toUpperCase()
  var id = req.query.funcionario


  Funcionario.findOne({
    where: {
        id: id,
        resposta_secreta: resposta_secreta
    }
}).then((funcionario) => {
    if (funcionario) {
        // resposta secreta correta, redireciona para a página de alteração de senha
        teste = req.session.funcionario = {
          matricula: funcionario.matricula,
          resposta_secreta: funcionario.resposta_secreta
        }
        
        res.render ('admin/login/alterar', teste)
        return
    } else {
        // resposta secreta incorreta, exibe mensagem de erro
        res.send('Resposta secreta incorreta');
    }
}).catch(err => {
  res.redirect('/login')})
})

router.get ('/esqueci/matricula', (req, res) => {
  var matricula = req.query.matricula

  Funcionario.findAll({

  }).then(funcionarios => {

  Funcionario.findOne({
    where: {
      matricula: matricula,
    }

  }).then((funcionario) => {
      if (funcionario) {
        res.locals.mensagem = ' ';
        res.render ('admin/login/confere',  {funcionarios: funcionarios, matricula})
                   
      } else {
        // resposta secreta incorreta, exibe mensagem de erro
        res.locals.mensagem = 'MATRÍCULA INVÁLIDA.';
        res.render('admin/login/confere', { funcionarios: funcionarios, matricula });
      }  
    })
  }).catch(err => {
    res.redirect('/login')})
})

router.get ('/semnotas', expirar, (req, res) => {
  res.render('admin/notas/semnota')
}) 

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir a sessão:', err);
      return res.redirect('/'); // Se houver erro, redireciona para a página inicial
    }
    res.clearCookie('connect.sid'); // Limpa o cookie da sessão
    return res.redirect('/login');
  });
});


router.get('/esqueci', (req, res) => {
  res.render('admin/login/esqueci')
})

//PAGINAÇÃO
router.get('/admin/funcionarios/index/:num', adminAuth, adminUser, expirar, (req, res) => {
  let limit = parseInt(req.query.limit) || 10; 
  const pagina = parseInt(req.params.num) || 1; 
  const offset = (pagina - 1) * limit;
     
  Funcionario.findAndCountAll({
    limit: limit, 
    offset: offset
  }).then(funcionarios => {   
    Permissao.findAll().then(permissoes => {
      Setor.findAll().then(setores => {
        
        let totalFuncionarios = funcionarios.count;
        if (limit > totalFuncionarios) {
          limit = totalFuncionarios;
        }

        const resultado = {
          paginacao: pagina,
          next: (pagina * limit) < totalFuncionarios,
          funcionarios: funcionarios.rows || [], // Garante que sempre será um array
          totalFuncionarios: totalFuncionarios
        };

        console.log("FUNCIONÁRIOS:", resultado.funcionarios); // Debug
        res.render('admin/funcionarios/index', {
          resultado,
          limit,
          funcionarios: resultado.funcionarios, // Alterado
          permissoes,
          setores,
          funcionarioLogadoId: req.session.funcionario.id 
        });
      });
    });
  }).catch(err => {
    console.error("Erro ao buscar funcionários:", err);
    res.redirect('/login');
  });
});


router.get ('/admin/funcionarios/novo', adminAuth, adminUser, expirar, (req, res) => {

  Permissao.findAll().then(permissoes => {
    Setor.findAll().then(setores => {
      res.render('admin/funcionarios/novo', {permissoes: permissoes, setores: setores})
    })
  }).catch(err => {
    res.redirect('/login')})
})

router.post ('/funcionarios/salvar', adminAuth, adminUser, expirar, (req, res) => {
  var matricula = req.body.matricula
  var cpf = req.body.cpf
  var nome = req.body.nome.toUpperCase()
  var senha = 'semacesso'
  var permissao = req.body.permissao
  var setor = req.body.setor
  var sexo = req.body.sexo
  var email = req.body.email
  var imagem = 'sem imagem'


  //VERIFICANDO SE JÁ EXISTE UMA MATRICULA
  Funcionario.findOne({
    where: {
      matricula: matricula
    }
  }).then ( funcionario => {
    if (funcionario == undefined){
    
      Funcionario.create ({
        matricula: matricula,
        cpf: cpf,
        nome: nome,
        senha: senha,
        permissoId: permissao,
        setoreId: setor,
        primeiro_acesso: 0,
        pergunta_secreta: 'SEM PERGUNTA',
        resposta_secreta: 'SEM DEFINICAO',
        sexo: sexo,
        email: email,
        imagem_perfil: imagem
        
      }).then (() => {

        res.redirect('/admin/funcionarios/index/1')
      })
    }else {
      res.redirect('/admin/funcionarios/novo')
    }
  }).catch(err => {
    res.redirect('/login')})
})

router.post('/funcionarios/deletar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
  if (id != undefined) {
      if (!isNaN(id)){

        Nota.count({
          where: {
            funcionarioId: id
          }
        }).then (count => {
          if (count > 0) {
            res.send ('não pode ser deletado')
          }else{
            Funcionario.destroy ({
              where: {
                id: id
              }
            }).then(() => {
              res.redirect ('/admin/funcionarios/index/1')
            })
          }
        })
      }else { //NÃO FOR NUMERO
        res.redirect ('/admin/funcionarios/index/1')
      }
    }else { //NULL
      res.redirect ('/admin/funcionarios/index/1')
    }
})

router.get('/admin/funcionarios/editar/:id', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.params.id

  Funcionario.findByPk(id).then (funcionario => {

    if (funcionario != undefined) {

      Permissao.findAll().then( permissoes => {
        Setor.findAll().then( setores => {
        
          res.render('admin/funcionarios/edicao', {permissoes: permissoes, setores:setores, funcionario: funcionario})
        })
      })

    }else {
      res.redirect('/admin/funcionarios')
    }

  }).catch (err => {
    res.redirect('/admin/funcionarios');
  })
})

router.post('/funcionarios/atualizar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id;
  var matricula = req.body.matricula;
  var cpf = req.body.cpf;
  var nome = req.body.nome.toUpperCase();
  var permissao = req.body.permissao;
  var setor = req.body.setor;
  var sexo = req.body.sexo;
  var redefinir_senha = req.body.redefinir_senha;
  var email = req.body.email;


  if (redefinir_senha == 0) {
      
  Funcionario.update({
    matricula: matricula,
    cpf: cpf,
    nome: nome,
    permissoId: permissao,
    setoreId: setor,
    sexo: sexo,
    primeiro_acesso: 0,
    email: email

   
  },{
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/funcionarios/index/1')
  
  }).catch(err => {
    console.log(err)
    res.redirect('/')
  }).catch(err => {
    res.redirect('/login')})
   
  } else {
    Funcionario.update({
      matricula: matricula,
      cpf: cpf,
      nome: nome,
      permissoId: permissao,
      setoreId: setor,
      sexo: sexo,     
    },{
      where: {
        id: id
      }
    }).then(() => {
      res.redirect('/admin/funcionarios/index/1')
    
    }).catch(err => {
      console.log(err)
      res.redirect('/')
    }).catch(err => {
      res.redirect('/login')})
  }
    
 

 
})

router.post('/alterar', (req, res) => {
  var nova_senha = req.body.nova_senha;
  var confirmar_senha = req.body.confirmar_senha;
  var matricula = parseInt(req.body.matricula);
  var pergunta_secreta = req.body.pergunta_secreta.toUpperCase();
  var resposta_secreta = req.body.resposta_secreta.toUpperCase();
  var imagem = req.body.imagemperfil

  
  if (nova_senha !== confirmar_senha) {
    return res.status(400).send('As senhas não coincidem')
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(nova_senha, salt)

  Funcionario.update({
    senha: hash,
    primeiro_acesso: 1,
    pergunta_secreta: pergunta_secreta,
    resposta_secreta: resposta_secreta, 
    imagem_perfil: imagem
  },
  {
    where: {
      matricula: matricula,
    }
  }).then(() => {
    res.redirect('/login')
  }).catch(err => {
    console.log(`Esse é o erro ${err}`)
    res.redirect('/login')
  }).catch(err => {
    res.redirect('/login')})
})

module.exports = router