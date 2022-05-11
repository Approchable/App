// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  orderBy,
  where,
  query,
  Timestamp
} from 'firebase/firestore';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { setDataByDate } from './src/components/Utility/Helper';


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

// Initialize Firestore Database
const fireStore = getFirestore(app);

// Initialize Realtime Database
const realTimeDB = getDatabase(app);

// Initialize Firebase Storage
const storage = getStorage(app);

createStorageUrlfromImage(
  'file:///Users/ebukaegbunam/Library/Developer/CoreSimulator/Devices/71080F92-B428-460B-8F59-ABCE4268910B/data/Containers/Data/Application/A0E0666A-CBFB-41DD-8C25-54B5F263AFA9/Library/Caches/ExponentExperienceData/%2540ebukaegb%252FApproachableNative/ImagePicker/01D82213-8999-4C29-BFA4-69338B4734D1.jpg',
);

// Firebase Storage Methods

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

// Realtime Database Methods

function _writeDatatoRdb(path, data) {
  const ref = realTimeDB.ref('users/' + id);
  ref.set(data);
}

export function writeUserData(userId, data) {
  set(ref(realTimeDB, 'users/' + userId), data)
    .then(() => {
      console.log('success with firebase writing user data');
    })
    .catch(error => {
      console.log(error, ' error writing user data');
    });
}

export function deleteUserData(id) {
  console.log(' deleting user -> ...', id);
  set(ref(realTimeDB, 'users/' + id), null)
    .then(() => {
      console.log('deleted user');
    })
    .catch(error => {
      console.log(error, ' deleting user ');
    });
}

// get user by id from firebase realtime database

export async function getUserDataById(userId) {

  const dbRef = ref(realTimeDB);
  const user = get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('getUserDataById user ==> ', data)
      return data
    } else {
      console.log("getUserDataById ==> No data available");
      return null
    }
  }).catch((error) => {
    console.error("getUserDataById Error ==>", error);
    return null
  });

  return user;

}

// Firestore Database Methods

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

// get connections list which is actually chats main object
export async function getAllConnections() {
  const connectionsRef = collection(fireStore, 'connections');
  try {
    const querySnapshot = await getDocs(connectionsRef);
    const data = querySnapshot.docs.map(doc => doc.data());
    return data;
  } catch (error) {
    console.log('Error getting connections from firebase ', error);
    return null;
  }
}
// 
// get connection by id
export async function getConnectionById(connectionId) {
  const connectionsRef = collection(fireStore, 'connections');
  try {
    const q = query(connectionsRef, where("id", "==", connectionId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    if (data.length > 0) {
      return data[0]
    } else {
      return null
    }
  } catch (error) {
    console.log('Error getting connections from firebase ', error);
    return null;
  }
}

// get user Requests by id
export async function getUserRequests(usedId) {
  const requestsRef = collection(fireStore, 'users', usedId, 'usersWhoRequested');
  try {
    const querySnapshot = await getDocs(requestsRef);
    const data = querySnapshot.docs.map(doc => doc.data());
    return data
    // if (data.length > 0) {
    //   return data[0]
    // } else {
    //   return null
    // }
  } catch (error) {
    console.log('Error getting connections from firebase ', error);
    return null;
  }
}

export async function getAllMessagesForConnectionId(conId) {

  const messagesRef = collection(fireStore, 'connections/' + conId + '/' + 'messages');
  try {
    const q = query(messagesRef, where("connection_id", "==", conId), orderBy("sent_at"))
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    // console.log('data chating ==== : ', data);
    const groupedData = setDataByDate(data)
    return groupedData
  } catch (error) {
    console.log('Error getting chat from firebase ', error);
    return null;
  }
}

export async function sendChatMessage(messageObject) {

  const msg = messageObject
  const conId = msg.connection_id
  console.log("sendChatMessage message ==> ", msg)
  const sentAtTimeStamp = Timestamp.fromDate(msg.sent_at)
  const messagesRef = collection(fireStore, 'connections/' + conId + '/' + 'messages');

  const newMessage = {
    connection_id: conId,
    id: msg.id,
    is_deleted: msg.is_deleted,
    is_read: msg.is_read,
    sent_at: sentAtTimeStamp,
    message: msg.message,
    media_files: msg.media_files,
    sender: msg.sender
  }

  console.log("sendChatMessage message updated ==> ", newMessage)

  try {
    const docRef = await addDoc(messagesRef, newMessage);
    console.log('sendChatMessage message sent successfully ==> ', docRef);
    return docRef;
  } catch (error) {
    console.log('sendChatMessage message ==> ', error);
    return null;
  }

}

export { storage, fireStore };
