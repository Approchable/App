import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  Modal,
  SafeAreaView
} from 'react-native';
import {HeaderText, RegularText, RegularBoldText} from '../../components/Texts';
import React, {useState, useEffect} from 'react';
import {NormalButton} from '../../components/Buttons';
import * as ImagePicker from 'expo-image-picker';
import {NaviagteOutOfCreate, createPosts} from '../../store/actions';
import {Camera} from 'expo-camera';
import {useDispatch, useSelector} from 'react-redux';
import {addToPostObject} from '..//../store//posts//posts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStatusBar from '../../components/MyStatusBar';
import AppHeader from '../../components/Utility/AppHeader';

export default function CreatePost3({navigation}) {
  const [buttonActive, setButtonActive] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  var prevPostObject = useSelector(state => state.postsReducer);

  const finsihCreatePost3 = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    const data = {
      localImageUrl: image || '',
      user: user,
    };
    const newPostObject = {
      ...prevPostObject,
      ...data,
    };

    // dispatch(addToPostObject(data));
    // console.log(postObject)
    console.log(
      '================================================================',
    );
    console.log('newPostObject', newPostObject);
    dispatch(createPosts(newPostObject));
    navigation.navigate('Explore');
  };

  const pickImage = async () => {
    if (Platform.OS === 'android') {
      const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setModalVisible(false);
  };

  const openCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    setImage(result.uri);
    setModalVisible(false);
  };

  const ButtonModalItems = [
    {
      id: 1,
      name: 'Open Camera',
      onPress: () => {
        openCamera();
      },
    },
    {
      id: 2,
      name: 'Open Gallery',
      onPress: () => {
        pickImage();
      },
    },
  ];

  const post = () => {
    console.log('posting');
    // dispatch(NaviagteOutOfCreate());
    navigation.navigate('Explore');
  };
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      {/* <AppHeader moreStyles={{height: 50}} /> */}
      <ScrollView style={styles.container}>
        <View style={{marginHorizontal: 16}}>
          <HeaderText content="Add to your post" />

          {image == null && (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#989898',
                marginTop: 30,
                height: 250,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',

                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#44BFBA',
                }}>
                Add Photo
              </Text>
            </TouchableOpacity>
          )}

  

          {image && (
            <Image
              source={{uri: image}}
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                borderRadius: 5,
                marginTop: 30,
                height: 250,
                spectRatio: 1,
              }}
            />
          )}

          {image && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  marginTop: 30,
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',

                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#44BFBA',
                }}>
                Change Photo
              </Text>
            </TouchableOpacity>
          )}
          <ButtonModal
            visible={modalVisible}
            items={ButtonModalItems}
            onCancel={() => setModalVisible(false)}
          />
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-end',
              marginBottom: 20,
            }}>
            <NormalButton
              text="Post"
              onPress={() => (image !== null ? finsihCreatePost3() : null)}
              inActive={image !== null}
              hollow
              moreStyles={{
                marginTop: 20,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ButtonModal = ({visible, items, onCancel}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <ModalBarTop />
      <View
        style={{
          ...styles.modal,
        }}>
        <ModalBarTop />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',

            marginBottom: 20,
            marginTop: 14,
            marginLeft: 16,
          }}>
          Add Phtotos
        </Text>

        {items.map(item => {
          return (
            <View
              style={{
                marginBottom: 10,
                marginHorizontal: 16,
              }}>
              <NormalButton
                text={item.name}
                onPress={item.onPress}
                inActive={true}
                hollow={false}
                moreStyles={{}}
              />
            </View>
          );
        })}
        <View
          style={{
            marginBottom: 10,
            marginHorizontal: 16,
          }}>
          <NormalButton
            text={'Cancel'}
            onPress={onCancel}
            inActive={true}
            hollow={false}
            moreStyles={{
              marginBottom: 40,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const ModalBarTop = () => {
  return (
    <View
      style={{
        backgroundColor: '#ECEEF2',
        height: 4,
        width: 70,
        borderRadius: 13,
        alignSelf: 'center',
        marginTop: 10,
      }}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});
