const express = require('express')
const path = require('path')
const expressWs = require('express-ws')
const session = require('express-session')
const WebsocketHandler = require('./websocket_handler')
const Room = require('./models/room')
const Connection = require('./connection')

// Express App
const app = express()
expressWs(app)

app.use(express.static('dist'))
app.set('port', process.env.PORT || 3000)
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxage: 1000 * 60 * 30,
    },
  })
)

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

let connection = new Connection()

app.ws('/room/:id', (ws, req) => {
  connection.open(req.session.id, req.params.id, ws)

  const handler = new WebsocketHandler(ws, connection)

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
