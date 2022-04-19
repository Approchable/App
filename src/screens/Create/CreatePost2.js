import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NormalButton} from '../../components/Buttons';
import {NaviagteOutOfCreate, createPosts} from '../../store/actions';
import {useDispatch} from 'react-redux';
import {HeaderText, RegularText, RegularBoldText} from '../../components/Texts';
import {NormalTextField} from '../../components/TextField';
import AppHeader from '../../components/Utility/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function CreatePost2({navigation, route}) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);

  // const {headline} = route.params;
  // console.log('headline', headline);

  useEffect(() => {
    _checkDescription();
  }, [description]);

  const _checkDescription = () => {
    console.log('Checking description', description);
    if (
      description === null ||
      description === undefined ||
      description === ''
    ) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  };

  const closeCreateTest = navigation => {
    postHangout();
    dispatch(NaviagteOutOfCreate());
    navigation.navigate('Explore');
  };
  const postHangout = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    const postObject = {
      headline: headline || null,
      description: description || null,
      time: new Date().toLocaleString() || null,
      userId: user.id || null,
      userName: user.name || null,
      userImage: user.image || null,
      userEmail: user.email || null,
    };
    dispatch(createPosts(postObject));
    console.log('PostObject', postObject);
    console.log('Posting hangout...');
  };

  //NaviagteOutOfCreate

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={{marginHorizontal: 16, flex: 0.5, marginTop: 40}}>
          <HeaderText
            content="Your hangout details"
            moreStyles={{marginBottom: 10}}
          />
          <RegularBoldText content="Describe your hangout" />
          <NormalTextField
            placeholder="Required"
            moreStyles={{marginTop: -28}}
            onChangeText={text => setDescription(text)}
          />
          <RegularBoldText content="Location" />
          <NormalTextField
            placeholder="Required"
            moreStyles={{marginTop: -28}}
            onChangeText={text => setDescription(text)}
          />
          <RegularBoldText content="Time of hangout" />
          <TimeHangout />

          <RegularBoldText content="Screening question (optional):" />
          <RegularText
            content="Ask anything that you want to require  potential connections to answer. "
            moreStyles={{marginTop: -20}}
          />
          <NormalTextField
            placeholder="Add a question"
            moreStyles={{marginTop: -28}}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <NormalButton
            text="Next"
            onPress={() => (buttonActive ? navigation.navigate('CreatePost3') : null)}
            inActive={buttonActive}
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

const TimeHangout = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red', marginBottom: 20}}>
      <View style={{flexDirection: 'row', backgroundColor: 'blue'}}>
        <TextInput
          placeholder="Hours"
          style={{
            height: 40,
            padding: 1,
            marginLeft: 2,
            justifyContent: 'center',
            color: '#696969',
            alignItems: 'center',
          }}></TextInput>
        <Text
          style={{
            height: 40,
            padding: 1,
            marginHorizontal: 1,
            color: '#696969',
            justifyContent: 'center',
            color: '#696969',
            backgroundColor: 'green',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          :
        </Text>
        <TextInput
          placeholder="Minutes "
          style={{
            height: 40,
            padding: 1,
            marginLeft: 2,
            justifyContent: 'center',
            color: '#696969',
          }}></TextInput>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
