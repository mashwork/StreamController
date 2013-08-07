
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


  var query = require('../app/controllers/queries');
  app.get('/api/queries',             query.all);
  app.post('/api/queries',            query.create);
  app.get('/api/queries/:queryId',    query.one);
  app.put('/api/queries/:queryId',    query.update);
  app.del('/api/queries/:queryId',    query.destroy);

  app.param('queryId', query.query)

  var stream = require('../app/controllers/stream');
  app.post('/api/stream/restart', stream.restart);

  // home route
  app.get('*', function(req, res){ res.render("layouts/default");});

}
