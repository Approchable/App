import {storage} from './firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {manipulateAsync, FlipType, SaveFormat} from 'expo-image-manipulator';

const compressImage = async localUri => {
  // complete this : https://www.reddit.com/r/reactnative/comments/sklotr/compress_images_befor_upload_to_firebase_storage/
  if (localUri === '' || localUri === null) {
    return '';
  }
  const saveOptions = {
    compress: 0.1,
    format: SaveFormat.JPEG,
  };
  const manipResult = await manipulateAsync(localUri, [], saveOptions);
  return manipResult.uri;
};

async function makeBlob(localUri) {
  const newblob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', localUri, true);
    xhr.send(null);
  });
  return newblob;
}

export const sendImageToFireStorageAndGetUrl = async localUri => {
  if (localUri === undefined || localUri === null) {
    return '';
  }
  
  localUri = await compressImage(localUri);
 
  localUri = localUri.replace('file://', '');
  const imageId = Date.now() + localUri.split('/').pop() || 'test.jpg';
  const metadata = {
    contentType: 'image/jpeg',
  };
  const imageRef = ref(storage, 'images/' + imageId);
  const blob = await makeBlob(localUri);
  return new Promise((resolve, reject) => {
    uploadBytes(imageRef, blob, metadata).then(snapshot => {
      getDownloadURL(snapshot.ref)
        .then(url => {
          console.log('url', url);
          resolve(url);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
    });
  });
};
