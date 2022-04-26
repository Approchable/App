// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from 'firebase/firestore';
import {getDatabase, ref, set} from 'firebase/database';
import {getStorage} from 'firebase/storage';

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

const db = getFirestore(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

// console.log("test")

async function createStorageUrlfromImage(localUri) {
  console.log('creating storage url...');
  try {
    const imageId = +Date.now() + localUri.split('/').pop() || 'test.jpg';

    const imageRef = storage.ref('images/' + imageId);
    const imageUrl = await imageRef.getDownloadURL();
    console.log('image url: ' + imageUrl);
    return imageUrl;
  } catch (error) {
    console.log(error);
    return '';
  }
}

createStorageUrlfromImage(
  'file:///Users/ebukaegbunam/Library/Developer/CoreSimulator/Devices/71080F92-B428-460B-8F59-ABCE4268910B/data/Containers/Data/Application/A0E0666A-CBFB-41DD-8C25-54B5F263AFA9/Library/Caches/ExponentExperienceData/%2540ebukaegb%252FApproachableNative/ImagePicker/01D82213-8999-4C29-BFA4-69338B4734D1.jpg',
);

function writeDatatoRdb(path, data) {
  const db = getDatabase();
  const ref = db.ref('users/' + id);
  ref.set(data);
}

export function writeUserData(userId, data) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), data)
    .then(() => {
      console.log('success with firebase writing user data');
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



export async function getPostsFromFireStore() {
  const collectionRef = collection(fireStore, 'posts');
  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => doc.data());

    return data;
  } catch (error) {
    console.log('Error getting posts from firebase ', error);
    return null;
  }
}

export async function verifyCredentialsFromFireStore(postId) {
  return true;
}



export async function readingtestToFireStore() {
  const collectionRef = collection(fireStore, 'posts');
  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => doc.data());

    return data;
  } catch (error) {
    console.log('error testing firstore-reading with this error: ', error);
    return null;
  }
}



export {storage , db , fireStore  };
