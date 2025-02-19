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
          Nota.findAll().then(notas => {
            let totalFuncionarios = funcionarios.count;
       
            const resultado = {
              funcionarios: funcionarios.rows || [], // Garante que sempre será um array
              totalFuncionarios: totalFuncionarios
            };
    
            
            console.log("FUNCIONÁRIOS:", resultado.funcionarios); // Debug
            res.render('admin/rh/index', {
              resultado,
         
              funcionarios: resultado.funcionarios, // Alterado
              permissoes,
              setores,
              periodos,
              notas,
              funcionarioLogadoId: req.session.funcionario.id 
            });
          })
          
      
       
        });
      });
    });
  }).catch(err => {
    console.error("Erro ao buscar funcionários:", err);
    res.redirect('/login');
  });
});

router.post("/atualizar-funcionario", (req, res) => {
  console.log("Dados recebidos no backend:", req.body);

  const { id, nome, permissao, setor, dataAdmissao } = req.body;

  // Atualizando o funcionário usando Sequelize
  Funcionario.update(
    {
      nome: nome.toUpperCase(),
      permissoId: permissao,  // Garantindo que está usando o nome correto do campo
      setoreId: setor,         // Garantindo que está usando o nome correto do campo
      data_admissao: dataAdmissao
    },
    {
      where: {
        id: id  // Onde o id do funcionário é igual ao id recebido
      }
    }
  )
  .then(result => {
    if (result[0] === 0) {
      // Caso nenhum registro tenha sido atualizado
      return res.json({ sucesso: false, mensagem: 'Funcionário não encontrado ou nenhum dado foi alterado.' });
    }
    res.json({ sucesso: true });
  })
  .catch(err => {
    console.error("Erro ao atualizar funcionário:", err);
    res.json({ sucesso: false, mensagem: 'Erro ao atualizar funcionário.' });
  });
});

router.get('/rh/graficos', (req, res) => {
  Funcionario.findAndCountAll().then(funcionarios => {
    // Contar os funcionários com permissoId == 2 (chefias)
    Funcionario.count({
      where: {
        permissoId: 2
      }
    }).then(chefiasCount => {

      // Contar os funcionários com permissoId == 3 (estagiários)
      Funcionario.count({
        where: {
          permissoId: 3
        }
      }).then(estagiariosCount => {

        // Contar os funcionários com permissoId == 1 (administradores)
        Funcionario.count({
          where: {
            permissoId: 1
          }
        }).then(administradoresCount => {

          // Contar os funcionários com permissoId == 4 (comissão)
          Funcionario.count({
            where: {
              permissoId: 4
            }
          }).then(comissaoCount => {

            // Contar os funcionários com permissoId == 5 (RH)
            Funcionario.count({
              where: {
                permissoId: 5
              }
            }).then(rhCount => {
              // Contar as notas por periodoId (1 a 6)
              const periodosCount = {};
              for (let i = 1; i <= 6; i++) {
                Nota.count({
                  where: {
                    periodoId: i
                  }
                }).then(notasCount => {
                  periodosCount[`periodo${i}Count`] = notasCount;
                }).catch(err => {
                  console.error(`Erro ao contar notas do período ${i}:`, err);
                  res.redirect('/login');
                });
              }

              // Buscar os dados adicionais (Permissões, Setores, Periodos, Notas)
              Permissao.findAll().then(permissoes => {
                Setor.findAll().then(setores => {
                  Periodo.findAll().then(periodos => {
                    Nota.findAll().then(notas => {
                      const totalUsuarios = funcionarios.count; // Total de funcionários

                      res.render('admin/rh/graficos', {
                        funcionarios,
                        permissoes,
                        setores,
                        periodos,
                        notas,
                        totalUsuarios, // Passa o total de usuários para a view
                        chefiasCount,   // Passa o total de chefias para a view
                        estagiariosCount, // Passa o total de estagiários para a view
                        administradoresCount, // Passa o total de administradores para a view
                        comissaoCount, // Passa o total de comissão para a view
                        rhCount, // Passa o total de RH para a view
                        periodosCount // Passa o total de notas por período para a view
                      });
                    });
                  });
                });
              });
            }).catch(err => {
              console.error("Erro ao contar RH:", err);
              res.redirect('/login');
            });
          }).catch(err => {
            console.error("Erro ao contar comissão:", err);
            res.redirect('/login');
          });
        }).catch(err => {
          console.error("Erro ao contar administradores:", err);
          res.redirect('/login');
        });
      }).catch(err => {
        console.error("Erro ao contar estagiários:", err);
        res.redirect('/login');
      });
    }).catch(err => {
      console.error("Erro ao contar chefias:", err);
      res.redirect('/login');
    });
  }).catch(err => {
    console.error("Erro ao buscar funcionários:", err);
    res.redirect('/login');
  });
});







module.exports = router
