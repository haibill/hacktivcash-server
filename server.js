const http = require('http')

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  response.end('<h1>Hello, Bandung!</h1>')
}).listen(5432, '127.0.0.1')

console.log('Server running at http://127.0.0.1:5432')
