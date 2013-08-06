
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    db: 'mongodb://localhost/mean-dev',
    root: rootPath,
    app: {
      name: 'StreamController - Development',
      configFilePath: "/Users/GT/work/mashwork/receiver/src/main/resources/twitter.cfg",
      streamCommandPath: "/Users/GT/work/mashwork/receiver/src/main/bin/twitter.d"
    }
  },
  test: {
    db: 'mongodb://localhost/mean-test',
    root: rootPath,
    app: {
      name: 'StreamController - Test',
      configFilePath: "/Users/GT/work/mashwork/receiver/src/main/resources/twitter.cfg",
      streamCommandPath: "/Users/GT/work/mashwork/receiver/src/main/bin/twitter.d"
    }
  },
  production: {
    db: 'mongodb://localhost/mean',
    root: rootPath,
    app: {
      name: 'StreamController - Production',
      configFilePath: "/Users/GT/work/mashwork/receiver/src/main/resources/twitter.cfg",
      streamCommandPath: "/Users/GT/work/mashwork/receiver/src/main/bin/twitter.d"
    }
  }
}