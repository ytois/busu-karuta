const express = require('express')
const path = require('path')

// Express App
const app = express()
app.use(express.static('dist'))
app.set('port', process.env.PORT || 3000)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const expressWs = require('express-ws')(app)

app.ws('/', (ws, req) => {
  ws.on('message', msg => {
    console.log(msg)
  })
})

// Server

const PORT = process.env.PORT || 3000

app.listen(app.get('port'), function() {
  console.log('server listening. Port:' + PORT)
})
