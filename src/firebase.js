import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDkRSlqEDGYQ3fuVT4e-xwESicNTLQspoY',
  authDomain: 'test-7f01a.firebaseapp.com',
  databaseURL: 'https://test-7f01a.firebaseio.com',
  projectId: 'test-7f01a',
  storageBucket: 'test-7f01a.appspot.com',
  messagingSenderId: '764893171362',
  appId: '1:764893171362:web:d51de3c36c8e63f1',
}

firebase.initializeApp(firebaseConfig)

export default firebase
