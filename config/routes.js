
var async = require('async')

module.exports = function (app, passport, auth) {

  var partials = require('../app/controllers/partials');
  app.get('/partials/:resource/:page', partials.partials);

  // user routes
  var users = require('../app/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)

  app.param('userId', users.user)


  var query = require('../app/controllers/query');
  app.get('/api/query', query.index)

  // home route
  app.get('*', function(req, res){ res.render("layouts/default");});

}