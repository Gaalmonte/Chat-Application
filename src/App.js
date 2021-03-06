import './App.css';
import React, {useState, useRef} from 'react';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// imported a couple of hooks to make it easier to work with firebase and react 
import { useAuthState }  from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

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
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}
function ChatRoom(){
  const dummy = useRef()
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField:'id'});
  const [formValue, setFormValue] = useState('')
  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({behavior:'smooth'});
  }
  return(
    <>
    <main>
    <div>{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}</div>
    <div ref={dummy}></div>
    </main>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
      <button type="submit">Send</button>
    </form>
    </>
  )
}

function ChatMessage(props){
  const {text,uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return(
     <div className={`message ${messageClass}`}>
       <img src={photoURL} />
       <p>{text}</p>
     </div>
     )
}
export default App;
