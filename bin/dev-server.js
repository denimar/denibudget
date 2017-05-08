const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

console.log('-------------------')
console.log(process.env.PORT);
console.log('-------------------')

server.listen(process.env.PORT || 3000, function(err) {
  debug(`Server is now running at http://localhost:${project.server_port}.`)
})
