import {fireStore} from './firebase.js';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from 'firebase/firestore';

import { sendImageToFireStorageAndGetUrl}   from './FirebaseStorage';


export async function sendPostToFireStore(postObject) {
   
    if ('localImageUrl' in postObject) {
      postObject['imageUrl'] = await sendImageToFireStorageAndGetUrl(postObject.localImageUrl);
    }
    console.log("postObject after image url", postObject)
    const collectionRef = collection(fireStore, 'posts');
    try {
      const docRef = await addDoc(collectionRef, postObject);
      return docRef;

    } catch (error) {
      console.log('Error sending posts to firebase ', error);
      return null;
    }
  }
  // creating connection object which is actually chats main object
  export async function createConnectionOnFireStore(connectionObject) {
   
    console.log("connectionObject -> ", connectionObject)
    const collectionRef = collection(fireStore, 'connections');
    try {
      const docRef = await addDoc(collectionRef, connectionObject);
      return docRef;

    } catch (error) {
      console.log('Error creating connection object to firebase ', error);
      return null;
    }
  }

  // get connections list which is actually chats main object
  // export async function getConnectionsFromFireStore() {
   
  //   try {
  //     const querySnapshot = await getDocs(collectionRef);
  //     const data = querySnapshot.docs.map(doc => doc.data());
  //     return data;
  //   } catch (error) {
  //     console.log('Error getting connections from firebase ', error);
  //     return null;
  //   }
  // }

  
  // export async function sendChatMessageToFireStore(messageObject) {
   
  //   console.log("messageObject -> ", messageObject)
  //   const collectionConnectionsRef = collection(fireStore, 'connections');
  //   try {
  //     const docRef = await getDocs(collectionConnectionsRef)
  //     return docRef;
  //   } catch (error) {
  //     console.log('Error sending message to firebase ', error);
  //     return null;
  //   }
  // }
  
