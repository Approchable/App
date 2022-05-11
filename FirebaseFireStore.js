import { fireStore } from './firebase.js'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  where,
  query,
} from 'firebase/firestore'

import { sendImageToFireStorageAndGetUrl } from './FirebaseStorage'

export async function sendPostToFireStore(postObject) {
  console.log('sendPostToFireStore')
  // if ('localImageUrl' in postObject) {
  //   postObject['imageUrl'] = await sendImageToFireStorageAndGetUrl(
  //     postObject.localImageUrl,
  //   );
  // }
  console.log('postObject after image url', postObject)
  const collectionRef = collection(fireStore, 'posts')
  try {
    const docRef = await setDoc(
      doc(collectionRef, postObject.postId),
      postObject
    )
    return docRef
  } catch (error) {
    console.log('Error sending posts to firebase ', error)
    return null
  }
}

export async function sendRequestToFireStore(request) {
  const userRef = await collection(fireStore, 'users')
  const userDocRef = await doc(userRef, request.userReciving.id)
  const requestRef = await collection(userDocRef, 'usersWhoRequested')
  try {
    const docRef = await addDoc(requestRef, request)
    return docRef
  } catch (error) {
    console.log('Error sending requests to firebase ', error)
    return null
  }
}

export async function getAllRequestIDs(postId) {
  if (postId === undefined || postId === null || postId === '') {
    console.log('postId is undefined or null or empty')
    return []
  }
  //get all user id that have requested to join  a hangout post with hangout id
  console.log('getting ids...')
  try {
    const postCollectionRef = collection(fireStore, 'posts')
    const q = query(postCollectionRef, where('postId', '==', postId))
    // get post data from firebase
    const post = await getDocs(postCollectionRef)
    if (!post) {
      return []
    }
    var postData = post.docs[0].data()
    // find a better way to query this data
    console.log('post count', post.docs.length)
    for (let i = 0; i < post.docs.length; i++) {
      if (post.docs[i].data().postId === postId) {
        postData = post.docs[i].data()
      }
    }

    if (!postData) {
      return []
    }
    const requests = postData.usersWhoRequested
    if (!requests) {
      return []
    }
    //console.log('usersWhoRequested', requests);
    return requests
  } catch (error) {
    console.log('Error getting requests from firebase ', error)
    return []
  }
}

export async function createConnectionOnFireStore(connectionObject) {
  console.log('connectionObject -> ', connectionObject)
  const collectionRef = collection(fireStore, 'connections')
  try {
    const docRef = await addDoc(collectionRef, connectionObject)
    return docRef
  } catch (error) {
    console.log('Error creating connection object to firebase ', error)
    return null
  }
}

export async function joinPostRequest(postId, userId) {
  try {
    var requestIds = await getAllRequestIDs(postId)
    console.log('requestIds', requestIds)
    if (requestIds.length === 0) {
      console.log('no previous join requests on this post')
    }
    if (requestIds.includes(userId)) {
      console.log('user already requested to join this post', userId)
      return null
    }
    requestIds.push(userId)
    requestIds = [...new Set(requestIds)]
    const postCollectionRef = collection(fireStore, 'posts')
    const postDoc = await doc(postCollectionRef, postId)
    await updateDoc(postDoc, { usersWhoRequested: requestIds })
    return requestIds
  } catch (error) {
    console.log('Error joining post ', error)
    return null
  }
}
export async function getAllRequest(userId) {
  // get all request from firebase for a certain user
}

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
