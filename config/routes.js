
var async = require('async')

module.exports = function (app, passport, auth) {

  

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


  var query = require('../app/controllers/queries');
  app.get('/api/queries',             auth.requiresLogin, query.all);
  app.post('/api/queries',            auth.requiresLogin, query.create);
  app.get('/api/queries/:queryId',    auth.requiresLogin, query.one);
  app.put('/api/queries/:queryId',    auth.requiresLogin, query.update);
  app.del('/api/queries/:queryId',    auth.requiresLogin, query.destroy);

  app.param('queryId', query.query)

  var stream = require('../app/controllers/stream');
  app.post('/api/stream', stream.restart);
  app.get('/api/stream', stream.show);

  var partials = require('../app/controllers/partials');
  app.get('/partials/:resource/:page', partials.partials);

  // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
