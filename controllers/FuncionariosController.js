const express = require ('express')
const router = express.Router();
const Permissao = require ('../models/Permissao')
const Setor = require ('../models/Setor')
const Funcionario = require ('../models/Funcionario');
const Nota = require ('../models/Nota');
const Periodo = require('../models/Periodo');
const Questionamento = require ('../models/Questionamento')
const moment = require('moment');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');



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
                    res.redirect('/admin/funcionarios/index')
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
        } else  if (funcionario.permissoId == 5){
          Funcionario.findAll({
            include: [{model: Permissao}] //NA BUSCA, INCLUI AS CATEGORIAS PELO RELACIONAMENTO
          }).then(funcionarios =>{
            Permissao.findAll().then(permissoes =>{
              Setor.findAll().then(setores =>{
                Nota.findAll().then(notas =>{
                  Periodo.findAll().then(periodos => {
                    res.redirect('/admin/rh/index')
          })})})})})

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
router.get('/admin/funcionarios/index', adminAuth, adminUser, (req, res) => {
 
     
  Funcionario.findAndCountAll({
   
  }).then(funcionarios => {   
    Permissao.findAll().then(permissoes => {
      Setor.findAll().then(setores => {
        Periodo.findAll().then(periodos => {
          
        
        let totalFuncionarios = funcionarios.count;
       
        const resultado = {
          funcionarios: funcionarios.rows || [], // Garante que sempre será um array
          totalFuncionarios: totalFuncionarios
        };

        console.log("FUNCIONÁRIOS:", resultado.funcionarios); // Debug
        res.render('admin/funcionarios/index', {
          resultado,
     
          funcionarios: resultado.funcionarios, // Alterado
          permissoes,
          setores,
          periodos,
          funcionarioLogadoId: req.session.funcionario.id 
        });
        });
      });
    });
  }).catch(err => {
    console.error("Erro ao buscar funcionários:", err);
    res.redirect('/login');
  });
});

router.get('/admin/funcionarios/novo', adminAuth, adminUser, expirar, (req, res) => {
  Permissao.findAll().then(permissoes => {
    Setor.findAll().then(setores => {
      // Passando a variável error, caso ela exista
      res.render('admin/funcionarios/novo', { 
        permissoes: permissoes, 
        setores: setores,
        error: req.query.error || null  // Se houver erro, passa o valor, senão passa null
      });
    });
  }).catch(err => {
    res.redirect('/login');
  });
});

router.post('/funcionarios/salvar', adminAuth, adminUser, expirar, async (req, res) => {
  try {
    var { matricula, cpf, nome, permissao, setor, sexo, email, dataAdmissao } = req.body;
    var senha = 'semacesso';
    var imagem = 'sem imagem';
    dataAdmissao = moment(dataAdmissao).format('YYYY-MM-DD');

    // Buscar permissões e setores para preencher o select novamente
    const permissoes = await Permissao.findAll();
    const setores = await Setor.findAll();

    // Verificar se a matrícula já existe
    const funcionarioExistente = await Funcionario.findOne({ where: { matricula } });
    const funcionarioCpfExistente = await Funcionario.findOne({ where: { cpf } })

    if ((funcionarioExistente) || (funcionarioCpfExistente)) {
      return res.render('admin/funcionarios/novo', { 
        errorMessage: 'Matrícula e/ou CPF já cadastrada.', 
        permissoes, 
        setores,
        dados: req.body // Retornar os valores preenchidos
      });
    }


    // Criar funcionário
    await Funcionario.create({
      matricula, cpf, nome: nome.toUpperCase(), senha, permissoId: permissao, setoreId: setor,
      primeiro_acesso: 0, pergunta_secreta: 'SEM PERGUNTA', resposta_secreta: 'SEM DEFINICAO',
      sexo, email, imagem_perfil: imagem, data_admissao: dataAdmissao
    });

    return res.redirect('/admin/funcionarios/index');

  } catch (err) {
    console.error('Erro no banco de dados:', err);
    const permissoes = await Permissao.findAll();
    const setores = await Setor.findAll();

    return res.render('admin/funcionarios/novo', { 
      errorMessage: 'Erro interno do servidor.', 
      permissoes, 
      setores, 
      dados: req.body // Retorna os valores preenchidos
    });
  }
});

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

router.get('/admin/funcionarios/todos', async (req, res) => {
  try {
    // 1️⃣ Busca todos os funcionários
    const funcionarios = await Funcionario.findAll();

    // 2️⃣ Busca permissões e setores para adicionar a descrição correta
    const permissoes = await Permissao.findAll();
    const setores = await Setor.findAll();

    // 3️⃣ Mapeia os dados para enviar apenas o que interessa
    const funcionariosFormatados = funcionarios.map(funcionario => ({
      id: funcionario.id,
      matricula: funcionario.matricula,
      cpf: funcionario.cpf,
      nome: funcionario.nome,
      permissao: permissoes.find(p => p.id === funcionario.permissoId)?.descricao || "Não informado",
      setor: setores.find(s => s.id === funcionario.setoreId)?.descricao || "Não informado"
    }));

    res.json(funcionariosFormatados);
  } catch (error) {
    console.error("Erro ao buscar todos os funcionários:", error);
    res.status(500).json({ error: "Erro ao buscar os funcionários." });
  }
});


router.get('/admin/funcionarios', adminAuth, adminUser, async (req, res) => {
  try {
    const { setor, permissao, periodo } = req.query;

    let filtros = {}; // Objeto que armazena os filtros ativos

    if (setor) {
      filtros.setoreId = setor;
    }
    if (permissao) {
      filtros.permissoId = permissao;
    }
    if (periodo) {
      // Supondo que "periodo" seja um intervalo de datas. Ajuste conforme necessário.
      const inicioPeriodo = moment().subtract(periodo, 'months').format('YYYY-MM-DD');
      filtros.data_admissao = { [Op.gte]: inicioPeriodo }; // Filtra apenas os que entraram no período
    }

    const funcionarios = await Funcionario.findAll({
      where: filtros,
      include: [Permissao, Setor]
    });

    const permissoes = await Permissao.findAll();
    const setores = await Setor.findAll();
    const periodos = [
      { id: 1, descricao: 'Último mês' },
      { id: 3, descricao: 'Últimos 3 meses' },
      { id: 6, descricao: 'Últimos 6 meses' },
      { id: 12, descricao: 'Último ano' }
    ];

    res.render('admin/funcionarios/index', {
      resultado: { funcionarios },
      permissoes,
      setores,
      periodos,
      req // Passamos `req` para manter as opções selecionadas no front-end
    });

  } catch (err) {
    console.error('Erro ao buscar funcionários:', err);
    res.redirect('/admin/funcionarios');
  }
});

module.exports = router