function adminUser (req, res, next) {
  if (req.session.funcionario.permissoId === 1) {
    next();
  } else {
    res.render('admin/acesso/negado')
  }
}

module.exports = adminUser