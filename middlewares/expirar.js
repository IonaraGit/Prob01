function expirar (req, res, next) {
  if (!req.session.funcionario) {
    // A sessão expirou, redireciona o usuário para outra página
    return res.redirect('/login');
  }
  next();
};



module.exports = expirar