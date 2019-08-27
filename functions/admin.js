const admin = require('firebase-admin')
const serviceAccount = require('./firebase-admin.credential.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://test-7f01a.firebaseio.com',
})

module.exports = admin
