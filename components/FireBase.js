import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDw9yaaLBUS8XwoeYRNbCoFPW5JY-dlCz0",
    authDomain: "newlywed-5989d.firebaseapp.com",
    databaseURL: "https://newlywed-5989d.firebaseio.com",
    projectId: "newlywed-5989d",
    storageBucket: "newlywed-5989d.appspot.com",
    messagingSenderId: "766001587059"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();