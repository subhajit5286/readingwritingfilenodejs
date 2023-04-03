const http=require('http')
const routes=require('./app')
http.createServer(routes).listen(8000)