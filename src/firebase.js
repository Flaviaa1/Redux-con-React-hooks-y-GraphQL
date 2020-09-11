import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBrUcosjklJLxn4B7cYqc7eRfMcefTGGjQ",
    authDomain: "redux-52c98.firebaseapp.com",
    databaseURL: "https://redux-52c98.firebaseio.com",
    projectId: "redux-52c98",
    storageBucket: "redux-52c98.appspot.com",
    messagingSenderId: "419217969601",
    appId: "1:419217969601:web:54ba2e41bf4ca628359f40",
    measurementId: "G-5LDHP2PLVX"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore().collection('favs')

  
  export function getFavs(uid) {
    return db.doc(uid).get()
        .then(snap => {
            return snap.data().array
        })
}

  export function updateDB(array, uid) {
    return db.doc(uid).set({ array })
}
  
  export function signOutGoogle(){
      firebase.auth().signOut()
  }
  export function loginWithGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider()
      return firebase.auth().signInWithPopup(provider)
      .then (snap =>snap.user)
          }
