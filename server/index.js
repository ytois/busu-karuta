const express = require('express')
const path = require('path')
const expressWs = require('express-ws')
const WebsocketHandler = require('./websocket_handler')

// Express App
const app = express()
expressWs(app)

app.use(express.static('dist'))
app.set('port', process.env.PORT || 3000)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

let connections = []

app.ws('/room/:id', (ws, req) => {
  connections.push({ roomId: req.params.id, socket: ws })

  const handler = new WebsocketHandler(ws, connections)

  ws.on('message', message => {
    handler.receiveMessage(message)
  })

  ws.on('close', () => {
    handler.closeConnection()
  })
})

// Server
app.listen(app.get('port'), function() {
  console.log('server listening. Port:' + app.get('port'))
})
