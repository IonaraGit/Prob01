const express = require ('express')
const bodyParser = require ('body-parser')
const session = require ('express-session')
const connection = require ('./database/database')
const app = express ();



//CONTROLLERS
const FuncionariosController = require ('./controllers/FuncionariosController')
const LigacoesController = require ('./controllers/LigacoesController')
const NotasController = require ('./controllers/NotasController')
const PeriodosController = require ('./controllers/PeriodosController')
const PermissoesController = require ('./controllers/PermissoesController')
const SetoresController = require ('./controllers/SetoresController')
const HistoricosController = require ('./controllers/HistoricosController')
const QuestionamentosController = require ('./controllers/QuestionamentosController')
const RelatoriosController = require ('./controllers/RelatoriosController')
const ComissoesController = require ('./controllers/ComissoesController')
const RhController = require  ('./controllers/RhController')

//MODELS
const Funcionario = require ('./models/Funcionario')
const Ligacao = require('./models/Ligacao')
const Nota = require ('./models/Nota')
const Periodo = require('./models/Periodo')
const Permissao = require ('./models/Permissao')
const Setor = require ('./models/Setor')
const Historico = require ('./models/Historico')
const Questionamento = require ('./models/Questionamento')
const Resposta = require ('./models/Resposta')
const Comissao = require ('./models/Comissao')
const Questao = require ('./models/Questao')
const Assiduidade = require ('./models/Assiduidade')
const Pontualidade = require ('./models/Pontualidade')
const Iniciativa = require('./models/Iniciativa')
const Disciplina = require('./models/Disciplina')
const Responsabilidade = require('./models/Responsabilidade')
const Qualidade = require('./models/Qualidade')
const Aperfeicoamento = require('./models/Aperfeicoamento')


//SESSIONS
app.use(session({
  secret: 'qualquercoisa',
  cookie: {maxAge: 900000000} //VALOR EM MILISEGUNDOS - 15 MINUTOS
}))

//VIEW ENGINE
app.set ('view engine', 'ejs')

//STATIC
app.use(express.static('public'))

//BODY PARSER
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//CONEXÃO COM O BANCO
connection.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso!')
  }).catch((err) => {
    console.log(`Aconteceu um erro: ${err}`)
})

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

//PREFIXOS DAS ROTAS
app.use('/', FuncionariosController)
app.use('/', LigacoesController)
app.use('/', NotasController)
app.use('/', PeriodosController)
app.use('/', PermissoesController)
app.use('/', SetoresController)
app.use('/', HistoricosController)
app.use('/', QuestionamentosController)
app.use('/', RelatoriosController)
app.use('/', ComissoesController)
app.use('/', RhController)

app.get('/', (req, res) =>{
  res.render('index')
})



app.listen(8082, () => {
  console.log("Servidor ok!")
})