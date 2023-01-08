// Import the functions you need from the SDKs you need
const  { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require( "firebase/database");
const { v4 }  = require('uuid');

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ebYjl4205qBa5PMRqNccGle1AeEyKcQ",
  authDomain: "lector-bpm-spo2.firebaseapp.com",
  projectId: "lector-bpm-spo2",
  storageBucket: "lector-bpm-spo2.appspot.com",
  messagingSenderId: "266708959311",
  appId: "1:266708959311:web:6fe076855012c1f0fc2a3a",
  databaseURL: "https://lector-bpm-spo2-default-rtdb.firebaseio.com",
};

const appFirebase = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(appFirebase);
function writeData(obj) {

    set(ref(db,'data/' + v4()), obj)

  }

app.post('/newData', function(req, res) {
  const data = {
    bpm: req.body.bpm,
    spo2: req.body.spo2,
    date: Date.now(),
  }
  writeData(data);
 return res.send('ok');
});

app.listen('3000', function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", 3000);
})