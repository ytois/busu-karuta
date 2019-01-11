const express = require('express')
const path = require('path')
const expressWs = require('express-ws')
const WebsocketHandler = require('./websocket_handler')
const Room = require('./models/room')

// Express App
const app = express()
expressWs(app)

app.use(express.static('dist'))
app.set('port', process.env.PORT || 3000)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.get('/api/room', (req, res) => {
  ;(async () => {
    const rooms = await Room.getAll()
    res.json(rooms)
  })()
})

app.get('/api/room/new', (req, res) => {
  ;(async () => {
    const room = await Room.generate()
    res.json(room.json)
  })()
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
