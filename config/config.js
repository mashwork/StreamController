
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    db: 'mongodb://localhost/mean-dev',
    root: rootPath,
    app: {
      name: 'MEAN - A Modern Stack - Development',
      configFilePath: "/Users/GT/work/mashwork/receiver/src/main/resources/twitter.cfg"
    }
  },
  test: {
    db: 'mongodb://localhost/mean-test',
    root: rootPath,
    app: {
      name: 'MEAN - A Modern Stack - Test',
      configFilePath: "/Users/GT/work/mashwork/receiver/src/main/resources/twitter.cfg"
    }
  },
  production: {
    db: 'mongodb://localhost/mean',
    root: rootPath,
    app: {
      name: 'MEAN - A Modern Stack - Production',
      configFilePath: "/Users/GT/work/mashwork/receiver/src/main/resources/twitter.cfg"
    }
  }
}
