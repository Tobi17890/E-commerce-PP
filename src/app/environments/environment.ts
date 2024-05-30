import { initializeApp } from 'firebase/app';


export const environment = {
  firebase: {
    apiKey: "AIzaSyBG7grflJRx9VqDSHSzhBnzrIb2nuijFIc",
    authDomain: "outfittershub-1de59.firebaseapp.com",
    projectId: "outfittershub-1de59",
    storageBucket: "outfittershub-1de59.appspot.com",
    messagingSenderId: "242565414541",
    appId: "1:242565414541:web:b99db2a0974d1da28cacc4"
  },
};

initializeApp(environment?.firebase);