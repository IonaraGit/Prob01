function adminAuth(req, res, next) {
  if (!req.session.funcionario) {
    return res.redirect('/login'); // Se não houver sessão, redireciona para o login
  }
  next();
}


module.exports = adminAuth