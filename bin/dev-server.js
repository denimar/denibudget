const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

console.log('-------------------')
console.log(server.get('port'));
console.log('-------------------')

//For avoidong Heroku $PORT error
server.get('/', function(request, response) {
    response.send('App is running...');
}).listen(server.get('port') || 3000, function(err) {
	console.log('****************************************')
	console.log(err)
	console.log('****************************************')
	
  debug(`Server is now running at http://0.0.0.0:${project.server_port}.`)
})
