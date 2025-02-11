const express = require ('express')
const router = express.Router();
const Setor = require ('../models/Periodo');
const Periodo = require('../models/Periodo');
const Nota = require('../models/Nota')

const adminAuth = require ('../middlewares/adminAuth')
const adminUser = require ('../middlewares/adminUser')
const expirar = require('../middlewares/expirar')

router.get('/admin/periodos/novo', adminAuth, adminUser, expirar, (req, res) => {
  res.render('admin/periodos/novo')
})

router.post('/periodos/salvar', adminAuth, adminUser, expirar, (req, res) => {
  var descricao = req.body.descricao

  if (descricao != undefined) {
    Periodo.create({
      descricao: descricao.toUpperCase()
    }).then(() => {
      res.redirect('/admin/periodos')
    })
  } else {
    res.redirect('/admin/periodos/novo')
  }
})

router.get('/admin/periodos', adminAuth, adminUser, expirar, (req, res) => {
  Periodo.findAll({}).then(periodos => {
    res.render('admin/periodos/index', { periodos: periodos })
  })
})

router.post('/periodos/deletar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
  if (id != undefined) {
    if (!isNaN(id)) {

      Nota.count({
        where: {
          periodoId: id
        }
      }).then( count => {
        if (count > 0) {
          res.redirect ('/admin/periodos')
        }else {
          Periodo.destroy({
            where: {
              id: id
            }
          }).then(() => {
            res.redirect('/admin/periodos')
          })
        }
      })
      
    } else {
      //NÃO FOR NUMERO
      res.redirect('/admin/periodos')
    }
  } else {
    //NULL
    res.redirect('/admin/periodos')
  }
})

router.get('/admin/periodos/edicao/:id', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.params.id

  if (isNaN(id)) {
    res.redirect('/admin/periodos')
  }

  //PESQUISA PELO ID
  Periodo.findByPk(id)
    .then(periodo => {
      if (periodo != undefined) {
        res.render('admin/periodos/edicao', { periodo: periodo })
      } else {
        res.redirect('/admin/periodos')
      }
    })
    .catch(err => {
      res.redirect('/admin/periodos')
    })
})

router.post('/periodos/atualizar', adminAuth, adminUser, expirar, (req, res) => {
  var id = req.body.id
  var descricao = req.body.descricao.toUpperCase()

  Periodo.update({descricao: descricao},{ //ATUALIZA ISSO
    where: {id:id} //NESTE ID
  }).then(() => {
    res.redirect ('/admin/periodos')
  })

})

module.exports = router