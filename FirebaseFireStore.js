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
  
