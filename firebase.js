// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {getDatabase, ref, set} from 'firebase/database';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDdTfUFd_lcoQOKjwLV4mCSczLypegMPAs',
  authDomain: 'approachablebackend.firebaseapp.com',
  projectId: 'approachablebackend',
  storageBucket: 'approachablebackend.appspot.com',
  messagingSenderId: '332924613398',
  appId: '1:332924613398:web:c608ffe501aa3cd028d637',
  measurementId: 'G-D3YBGEZD7D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// console.log("test")


function writeDatatoRdb(path, data) {
  const db = getDatabase();
  const ref = db.ref('users/' + id);
  ref.set(data);
}

export function writeUserData(userId, data) {
  console.log('writing data...');
  const db = getDatabase();
  set(ref(db, 'users/' + userId), data)
    .then(() => {
      console.log('success');
    })
    .catch(error => {
      console.log(error, ' error writing user data');
    });
}

export function deleteUserData(id) {
  console.log(' deleting...');
  const db = getDatabase();
  set(ref(db, 'users/' + id), null)
    .then(() => {
      console.log('deleted user');
    })
    .catch(error => {
      console.log(error, ' deleting user ');
    });
}

// writeUserData("testID" , "testName", "testEmail", "testImageUrl");

// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();
// const functions = firebase.functions();

// export { auth , db , storage , functions}
