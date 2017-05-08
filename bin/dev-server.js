const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

console.log('-------------------')
console.log(server.get('port'));
console.log('-------------------')

server.listen(server.get('port') || 3000, '0.0.0.0', function(err) {
  debug(`Server is now running at http://0.0.0.0:${project.server_port}.`)
})
