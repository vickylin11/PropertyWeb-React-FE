import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAtzR7_p8l6rLW7dz6sA5YSUqhR1PAxT90",
    authDomain: "best-home-web.firebaseapp.com",
    databaseURL: "https://best-home-web.firebaseio.com",
    projectId: "best-home-web",
    storageBucket: "best-home-web.appspot.com",
    messagingSenderId: "1054977780009",
    appId: "1:1054977780009:web:3d16f4a4fa1d25d4052f38",
    measurementId: "G-E32BZKP9TS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}
