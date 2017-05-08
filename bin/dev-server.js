const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')


//For avoidong Heroku $PORT error
server.get('/', function(request, response) {
    response.render('index');
}).listen(process.env.PORT || 3000, function(err) {
	console.log('****************************************')
	console.log(err)
	console.log('****************************************')
	
	  debug(`Server is now running on :${process.env.PORT}.`)
})
