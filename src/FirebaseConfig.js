import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoSgNrchjX5c1oFGklUX0fSbjoZeYrsdA",
  authDomain: "qcm-react-804d9.firebaseapp.com",
  databaseURL: "https://qcm-react-804d9.firebaseio.com",
  projectId: "qcm-react-804d9",
  storageBucket: "",
  messagingSenderId: "18906705970",
  appId: "1:18906705970:web:2282fbe8cc96c8bc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database };
