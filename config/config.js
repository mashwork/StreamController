
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    db: 'mongodb://localhost/mean-dev',
    root: rootPath,
    app: {
      name: 'StreamController - Development',
      configFilePath: "/Users/GT/work/mashwork/receiver/target/receiver-1.0-SNAPSHOT-1375807278075/conf/twitter.cfg",
      streamCommandPath: "/Users/GT/work/mashwork/receiver/target/receiver-1.0-SNAPSHOT-1375807278075/bin/twitter.d"
    }
  },
  test: {
    db: 'mongodb://localhost/mean-test',
    root: rootPath,
    app: {
      name: 'StreamController - Test',
      configFilePath: "/Users/GT/work/mashwork/receiver/target/receiver-1.0-SNAPSHOT-1375807278075/conf/twitter.cfg",
      streamCommandPath: "/Users/GT/work/mashwork/receiver/target/receiver-1.0-SNAPSHOT-1375807278075/bin/twitter.d"
    }
  },
  production: {
    db: 'mongodb://localhost/mean',
    root: rootPath,
    app: {
      name: 'StreamController - Production',
      configFilePath: process.env.HOME + "/receiver/twitter.cfg",
      streamCommandPath: process.env.HOME + "/production/receiver/bin/twitter.d"
    }
  }
}
