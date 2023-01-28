// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2qld3XUcqrnpfDBWP_Yxohoa4lJxfGe8",
    authDomain: "demodata-3e6d2.firebaseapp.com",
    databaseURL: "https://demodata-3e6d2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "demodata-3e6d2",
    storageBucket: "demodata-3e6d2.appspot.com",
    messagingSenderId: "499591801974",
    appId: "1:499591801974:web:2f64f23781767ff6944357"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  

var database = firebase.database();
var Categories = document.querySelector('#see');
var data = firebase.database().ref().child('Categories');
data.on('value', (snap) => {
    var product = snap.val(); 
    for (const key in product) {
        Categories.innerHTML += product[key].catName + " ";
    }
});