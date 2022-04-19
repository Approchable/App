import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {HeaderText, RegularText, RegularBoldText} from '../../components/Texts';
import React, {useState, useEffect} from 'react';
import {NormalButton} from '../../components/Buttons';
import * as ImagePicker from 'expo-image-picker';
import {NaviagteOutOfCreate, createPosts} from '../../store/actions';
import {useDispatch} from 'react-redux';

export default function CreatePost3() {
  const [buttonActive, setButtonActive] = useState(false);

  const [image, setImage] = useState(null);

  const pullUpCamera = async () => {};

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
  };
  const post = () => {
    console.log('posting');
    dispatch(NaviagteOutOfCreate());
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{marginHorizontal: 16}}>
        <HeaderText content="Add to your post" />

        {image == null && (
          <TouchableOpacity
            onPress={() => pickImage()}
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
          <TouchableOpacity onPress={() => pickImage()}>
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

        <View
          style={{
            flex: 1,

            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <NormalButton
            text="Post"
            onPress={() => (image !== null ? post() : null)}
            inActive={image !== null}
            hollow
            moreStyles={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
