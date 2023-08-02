//Configurarea firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
//import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtH5Szl33Qz1GuvvbyeFpBBUdprlFRXnM",
  authDomain: "disertatiemphr.firebaseapp.com",
  projectId: "disertatiemphr",
  storageBucket: "disertatiemphr.appspot.com",
  messagingSenderId: "1090616494033",
  appId: "1:1090616494033:web:da2ab577fd2c63572e82f0",
  measurementId: "G-J81FNB12YL"
}

let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const auth = firebase.auth();

export {auth};

