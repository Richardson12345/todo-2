var firebase = require('firebase')

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDGwaRhBj-V_z67x3MQUHpUDdy6ZktPMOE",
  authDomain: "second-todo-fb9c5.firebaseapp.com",
  databaseURL: "https://second-todo-fb9c5.firebaseio.com",
  projectId: "second-todo-fb9c5",
  storageBucket: "second-todo-fb9c5.appspot.com",
  messagingSenderId: "954479492519"
}

firebase.initializeApp(config)
var provider = new firebase.auth.FacebookAuthProvider()
var auth = firebase.auth()

export { auth, provider }


