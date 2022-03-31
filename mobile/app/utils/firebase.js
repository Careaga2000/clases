import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDP9GVFHC22jHav_pGDTZKt-wUWPRqMMMA",
  authDomain: "prorestc.firebaseapp.com",
  projectId: "prorestc",
  storageBucket: "prorestc.appspot.com",
  messagingSenderId: "200553239718",
  appId: "1:200553239718:web:509131498c4b84f2305067"
};

  export const firebaseapp = firebase.initializeApp(firebaseConfig)