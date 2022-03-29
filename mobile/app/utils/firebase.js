import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB8IB5Bc8yHxX5kgOZKhn--cs0yA3DosCw",
    authDomain: "prorestc-c3d54.firebaseapp.com",
    projectId: "prorestc-c3d54",
    storageBucket: "prorestc-c3d54.appspot.com",
    messagingSenderId: "99308105941",
    appId: "1:99308105941:web:dce3151425f8114ed9325c"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)