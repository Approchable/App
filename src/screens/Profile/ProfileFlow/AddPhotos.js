import { useEffect, useState } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, ImageBackground, Modal,Pressable } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BackButton } from '../../../components/BackButton';
import { NormalButton } from '../../../components/Buttons';
import ModalBarTop from '../../../components/ModalBarTop';
import { AddPhotosModal } from '../../../components/Profile/AddPhotosModal';
import { HeaderText } from '../../../components/Texts';


const width = (Dimensions.get('window').width - 36) / 3.5;

export function AddPhotos({user, backHandler, nextHandler, actionHandler}) {
  const new_arr = []
  const concat_arr = new_arr.concat(user.profileImages)
  const [visible, setVisible] = useState(false)
  const [images, setImages] = useState(concat_arr) 

  const pickedImageHandler = (img) => {
   
    setImages(oldArray => [...oldArray, img]);

    setVisible(false)
  }
  const removeImage = (image) => {
    setImages(images.filter(item => item !== image))

  }
  const saveAndProceed = () => {
   actionHandler(images)
   nextHandler()
  }

  return (
    <>
    <BackButton actionHandler={backHandler} />
    <View style={styles.container}>
        <View>
        <HeaderText content="Add photos" moreStyles={{fontSize: 27}} />
        <View style={{height:10}}></View>
        <Text style={styles.textStyle}>2 photos are better than 1.</Text>
    <Text style={styles.textStyle}>You can add more & change these later.</Text>
    <View style={{height:30}}></View>
    <View style={styles.photosRow}>
      {images.length > 0 ? images.map((image, index) => {
        return (    
        <View key={index} style={styles.photosCol}>
    <ImageBackground imageStyle={{ borderRadius: 12}} style={styles.photoStyle} resizeMode="cover"  source={{ uri: image }}>
    <Pressable style={{background: 'red', width:"100%",height:"100%"}} onPress={()=>{removeImage(image)}}>
    <Image style={styles.deletePhotos}  source={require('../../../assets/images/assets/delete.png')} />
    </Pressable>
    </ImageBackground>
   </View>)
      }) :

     null
    }

   { images.length < 2 ? <Pressable style={styles.photosColAdd} onPress={()=>{setVisible(true)}}>
    <View>
    <Image  source={require('../../../assets/images/assets/plus.png')} />
    </View>
    </Pressable> : null }
   

    </View>
        </View>

        <View>
        <NormalButton
            text={'Next'}
            onPress={saveAndProceed}
            inActive={true}
            hollow={true}
            moreStyles={{
              marginBottom: 0,
            }}
          />
        </View>
    </View>
    <AddPhotosModal visible={visible} pickedImageHandler = {pickedImageHandler} setVisible={setVisible}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
    justifyContent:'space-between',
    height:Dimensions.get('screen').height * 0.7,
  },
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
  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: "#696969",
    marginBottom: 10
  },
  photosRow:{
  flex: 0,
  flexDirection: 'row',
  justifyContent: "space-between",
  flexWrap: 'wrap'
  },
  photosCol: {
width: "48%",
height: Dimensions.get('screen').height * 0.18,
borderRadius: 12,
marginBottom: 20
},
photoStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 12
    },
  photosColAdd: {
      flex: 0,
  width: "48%",
  height: Dimensions.get('screen').height * 0.18,
  backgroundColor: "#44bfba1a",
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: "center",
  marginBottom: 20
  },
  deletePhotos:{
  position: 'absolute',
  top:-10,
  right: -10,
  }

});

