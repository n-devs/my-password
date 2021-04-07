
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import  firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCLYyA1xVMD6PAhTm_0jXGSW51Q2ujvPfw",
    authDomain: "my-password-ebebd.firebaseapp.com",
    projectId: "my-password-ebebd",
    storageBucket: "my-password-ebebd.appspot.com",
    messagingSenderId: "590675023138",
    appId: "1:590675023138:web:26ec57a53c1c162af7417b",
    measurementId: "G-ZJZLTY4C91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;