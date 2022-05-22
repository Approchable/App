// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  orderBy,
  where,
  query,
  Timestamp,
  updateDoc,
  doc,
  setDoc
} from 'firebase/firestore';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getStorage, ref as storageRef } from 'firebase/storage';
import { generateRandomId, getCurrentDate, setDataByDate } from './src/components/Utility/Helper';
import { MessageTypeStatus, RequestStatus } from './src/components/config/Constant';
import uuid from 'react-native-uuid'

const firebaseConfig = {
  apiKey: 'AIzaSyDdTfUFd_lcoQOKjwLV4mCSczLypegMPAs',
  authDomain: 'approachablebackend.firebaseapp.com',
  projectId: 'approachablebackend',
  storageBucket: 'approachablebackend.appspot.com',
  messagingSenderId: '332924613398',
  appId: '1:332924613398:web:c608ffe501aa3cd028d637',
  measurementId: 'G-D3YBGEZD7D',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore Database
const fireStore = getFirestore(app)

// Initialize Realtime Database
const realTimeDB = getDatabase(app)

// Initialize Firebase Storage
const storage = getStorage(app)

// createStorageUrlfromImage(
//   'file:///Users/ebukaegbunam/Library/Developer/CoreSimulator/Devices/71080F92-B428-460B-8F59-ABCE4268910B/data/Containers/Data/Application/A0E0666A-CBFB-41DD-8C25-54B5F263AFA9/Library/Caches/ExponentExperienceData/%2540ebukaegb%252FApproachableNative/ImagePicker/01D82213-8999-4C29-BFA4-69338B4734D1.jpg',
// );

// Firebase Storage Methods

async function createStorageUrlfromImage(localUri) {
  console.log('creating storage url...')
  try {
    const imageId = +Date.now() + localUri.split('/').pop() || 'test.jpg'

    const imageRef = storageRef('images/' + imageId);
    const imageUrl = await imageRef.getDownloadURL();
    console.log('image url: ' + imageUrl);
    return imageUrl;
  } catch (error) {
    console.log(error)
    return ''
  }
}

// Realtime Database Methods

function _writeDatatoRdb(path, data) {
  const ref = realTimeDB.ref('users/' + id)
  ref.set(data)
}

export function writeUserData(userId, data) {
  set(ref(realTimeDB, 'users/' + userId), data)
    .then(() => {
      console.log('success with firebase writing user data')
    })
    .catch((error) => {
      console.log(error, ' error writing user data')
    })
}

export function deleteUserData(id) {
  console.log(' deleting user -> ...', id)
  set(ref(realTimeDB, 'users/' + id), null)
    .then(() => {
      console.log('deleted user')
    })
    .catch((error) => {
      console.log(error, ' deleting user ')
    })
}

// get user by id from firebase realtime database

export async function getUserDataById(userId) {
  const dbRef = ref(realTimeDB)
  const user = get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        console.log('getUserDataById user ==> ', data)
        return data
      } else {
        console.log('getUserDataById ==> No data available')
        return null
      }
    })
    .catch((error) => {
      console.error('getUserDataById Error ==>', error)
      return null
    })

  return user
}

// Firestore Database Methods

export async function getPostsFromFireStore() {
  const collectionRef = collection(fireStore, 'posts')
  try {
    const querySnapshot = await getDocs(collectionRef)
    const data = querySnapshot.docs.map((doc) => doc.data())

    return data
  } catch (error) {
    console.log('Error getting posts from firebase ', error)
    return null
  }
}

export async function verifyCredentialsFromFireStore(postId) {
  return true
}

export async function readingtestToFireStore() {
  const collectionRef = collection(fireStore, 'posts')
  try {
    const querySnapshot = await getDocs(collectionRef)
    const data = querySnapshot.docs.map((doc) => doc.data())

    return data
  } catch (error) {
    console.log('error testing firstore-reading with this error: ', error)
    return null
  }
}

// get connections list which is actually chats main object
export async function getAllConnections() {
  const connectionsRef = collection(fireStore, 'connections')
  try {
    const querySnapshot = await getDocs(connectionsRef)
    const data = querySnapshot.docs.map((doc) => doc.data())
    return data
  } catch (error) {
    console.log('Error getting connections from firebase ', error)
    return null
  }
}


// get connection by id
export async function getConnectionById(connectionId) {
  const connectionsRef = collection(fireStore, 'connections')
  try {
    const q = query(connectionsRef, where('id', '==', connectionId))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())
    if (data.length > 0) {
      return data[0]
    } else {
      return null
    }
  } catch (error) {
    console.log('Error getting connections from firebase ', error)
    return null
  }
}

// get active user requests (with status pending or opened etc.) by user id
export async function getActiveUserRequests(userId) {
  const requestsRef = collection(fireStore, 'users', userId, 'usersWhoRequested');
  try {
    const q = query(requestsRef, where('requestStatus', 'in', [RequestStatus.pending, RequestStatus.opened]))
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    return data
  } catch (error) {
    console.log('Error getting connections from firebase ', error);
    return null;
  }
}

export async function updateRequestStatus(userId, requestId, requestStatus) {
  try {
    const requestsCollectionRef = collection(fireStore, 'users', userId, 'usersWhoRequested');
    const requestDoc = await doc(requestsCollectionRef, requestId);
    await updateDoc(requestDoc, { "requestStatus": requestStatus });
    console.log('docRes sucessfully  =====>>> ');
  } catch (error) {
    console.log('Error getting connections from firebase ', error);
    return null;
  }
}



export async function getAllMessagesForConnectionId(conId) {
  const messagesRef = collection(fireStore, 'connections', conId, 'messages')
  try {
    const q = query(
      messagesRef,
      where('connectionId', '==', conId),
      orderBy('sentAt')
    )
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())
    // console.log('conId==== : ', conId);
    // console.log('data chating ==== : ', data);
    const groupedData = setDataByDate(data)
    return groupedData
  } catch (error) {
    console.log('Error getting chat from firebase ', error)
    return null
  }
}

export async function sendChatMessage(messageObject) {
  const messagesRef = collection(
    fireStore,
    'connections/' + messageObject.connectionId + '/' + 'messages'
  )
  console.log('sendChatMessage message  ==> ', messageObject)

  try {
    const docRef = await addDoc(messagesRef, messageObject)
    console.log('sendChatMessage message sent successfully ==> ', docRef)
    return docRef
  } catch (error) {
    console.log('sendChatMessage message ==> ', error)
    return null
  }
}

export async function createNewConnectionWithSystemMessage(requestObj, conId) {

  const today = getCurrentDate()
  const sentAtTimeStamp = Timestamp.fromDate(today)

  const newConnection = {
    id: conId,
    isDeleted: false,
    createdAt: sentAtTimeStamp,
    updatedAt: sentAtTimeStamp,
    participantIds: [requestObj.userReciving.id, requestObj.userSendingRequest.id],
  }

  const systemRequestAcceptMessage = {
    id: `${uuid.v4()}`,
    connectionId: conId,
    isDeleted: false,
    isRead: false,
    mediaFiles: [],
    message: 'request accepted',
    requestData: requestObj,
    sentAt: sentAtTimeStamp,
    type: MessageTypeStatus.systemRequestAccept,
  }

  const systemStartChatMessage = {
    id: `${uuid.v4()}`,
    connectionId: conId,
    isDeleted: false,
    isRead: false,
    mediaFiles: [],
    message: 'Start the chat with <otherUserName>',
    sentAt: sentAtTimeStamp,
    type: MessageTypeStatus.systemStartChat,
  }

  try {
    await setDoc(doc(fireStore, 'connections', conId), newConnection)
    console.log(' ======>> new Connection created successfully <,====== ', conId)
    await setDoc(doc(fireStore, 'connections', conId, 'messages', systemRequestAcceptMessage.id), systemRequestAcceptMessage)
    console.log('====>> system request accept message created successfully <<=====')
    await setDoc(doc(fireStore, 'connections', conId, 'messages', systemStartChatMessage.id), systemStartChatMessage)
    console.log('====>> system start chat message created successfully <<=====')
  } catch (error) {
    console.log('sendChatMessage message ==> ', error)
    return null
  }
}

export { storage, fireStore }
