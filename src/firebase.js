import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCdj7FgZJJbOBS9kZRSbWGczVTzlN52T3Y',
  authDomain: 'busu-karuta.firebaseapp.com',
  databaseURL: 'https://busu-karuta.firebaseio.com',
  projectId: 'busu-karuta',
  storageBucket: '',
  messagingSenderId: '402591219862',
  appId: '1:402591219862:web:73e4798f03d40dbf',
}

const app = firebase.initializeApp(firebaseConfig)
// TODO: ローカルテスト用
if (process.env.NODE_ENV !== 'production') {
  app.functions().useFunctionsEmulator('http://localhost:5001')
}

export default app
