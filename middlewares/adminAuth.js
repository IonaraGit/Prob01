function adminAuth (req, res, next) {
  if (req.session.funcionario != undefined) {
    next();
  } else {
    res.redirect('/login')
  }
}

module.exports = adminAuth