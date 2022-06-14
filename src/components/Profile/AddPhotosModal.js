import { useState } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, ImageBackground, Modal,Pressable, Alert } from 'react-native';

import { NormalButton } from '../../components/Buttons';
import ModalBarTop from '../../components/ModalBarTop';
import { HeaderText } from '../../components/Texts';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync } from 'expo-image-picker';


export function AddPhotosModal({visible, pickedImageHandler, setVisible}) {
    const [status, requestPermission] = useCameraPermissions();

    const verifyPermission = async () => {
    if(status.status === PermissionStatus.UNDETERMINED) {
        let response = await requestPermission()
        
        return response.granted
    }

    if(status.status === PermissionStatus.DENIED) {
        Alert.alert("Insufficient Permission","Permission not granted")

        return false
    }

    return true

    }

    const takePicture = async () => {

        let permission = await verifyPermission()
        if(!permission){
            return;
        }
        let image  = await launchCameraAsync({
            allowsEditing : true,
            aspect: [16, 9],
            quality: 0.5
        })
     
        if(image.uri){
         pickedImageHandler(image.uri)
        }
    }

    const selectPicture = async () => {
      console.log("picking")
        let image  = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
   
      
       if(image.uri){
        pickedImageHandler(image.uri)
       }
        
    }

  return (
    <>
   
    <Modal visible={visible} transparent >
        <View
          style={{
            ...styles.modal,
          }}>
          <ModalBarTop />
           
          <HeaderText content="Add Photo" moreStyles={{fontSize: 18}} /> 
    <View style={{height:20}}></View>
    <NormalButton
          text="Upload a Photo"
          onPress={selectPicture}
          inActive={true}
    
        />
        <View style={{height:20}}></View>
                  <NormalButton
          text="Camera"
          onPress={takePicture}
          inActive={true}
    
        /> 
         <View style={{height:20}}></View>
      </View>
   
        <Pressable onPress={()=>{setVisible(false)}}>
          <View style={styles.modalBG} />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  modalBG: {
    position: 'absolute',
    width:"100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: Dimensions.get('screen').height * 1.0 
  },
  

});

