import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// imported a couple of hooks to make it easier to work with firebase and react 
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks'

firebase.initializeApp({
  // config
  apiKey: "AIzaSyDEMGCKqGpt7QLJwCz8cyFIfF-BDSvuUtI",
  authDomain: "superchat-d42b8.firebaseapp.com",
  projectId: "superchat-d42b8",
  storageBucket: "superchat-d42b8.appspot.com",
  messagingSenderId: "880623964700",
  appId: "1:880623964700:web:a8d233b198c48218c945d9",
  measurementId: "G-85Z3KZL5TZ"
})

// Global variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
