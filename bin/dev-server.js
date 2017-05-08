console.log('-------------------')
console.log(`PORT -> : ${process.env.PORT}`);
console.log('-------------------')

const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

server.listen(process.env.PORT || 3000, function(err) {
  if (err) {
    debug(`Error serving ion port ${process.env.PORT}.`)
    return;
  }
  debug(`Server is now running on port ${process.env.PORT}.`)
})

setInterval(function() {
  console.log('-------------------')
  console.log(`PORT -> : ${process.env.PORT}`);
  console.log('-------------------')
}, 10000)
