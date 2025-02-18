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

router.get('/admin/rh/index', adminAuth, (req, res) => {
  
     
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

module.exports = router
