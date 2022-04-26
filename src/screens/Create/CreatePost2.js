import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NormalButton, TextButton} from '../../components/Buttons';
import {NaviagteOutOfCreate, createPosts} from '../../store/actions';
import {useDispatch} from 'react-redux';
import {HeaderText, RegularText, RegularBoldText} from '../../components/Texts';
import {NormalTextField} from '../../components/TextField';
import AppHeader from '../../components/Utility/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addToPostObject} from '..//../store//posts//posts';
import * as Location from 'expo-location';

export default function CreatePost2({navigation, route}) {
  const selectedStartTime = 'start';
  const selectedEndTime = 'end';

  const dispatch = useDispatch();

  const [description, setDescription] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [location, setLocation] = useState(null);
  const [addressResult, setAddressResult] = useState(null);
  const [screeningQuestion , setScreeningQuestion] = useState(null);

  // const {headline} = route.params;
  // console.log('headline', headline);
  // const startTime = new Date();

  const finishCreatePost2 = () => {
    const data = {
      description: description || '',
      startDateTime: startDateTime || '',
      endDateTime: endDateTime  || '',
      startTime: startTime || '',
      endTime: endTime || '', 
      location: location || {},
      addressResult: addressResult || '',
      screeningQuestion: screeningQuestion || '',
    };
    dispatch(addToPostObject(data));
    navigation.navigate('CreatePost3')
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirm = date => {
    const hoursAndMinutes = getHoursandMinutes(date);
    setStartDateTime(date);
    setStartTime(hoursAndMinutes);
    hideDatePicker();
  };

  const handleEndConfirm = date => {
    if (date <= startDateTime) {
      Alert.alert('Error', 'End time must be after start time');
      return;
    }

    const hoursAndMinutes = getHoursandMinutes(date);
    setEndTime(hoursAndMinutes);
    setEndDateTime(date);
    hideEndDatePicker();
  };

  const getHoursandMinutes = date => {
    var hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
    if (date.getHours() < 10) {
      hoursAndMinutes = '0' + hoursAndMinutes;
    }
    console.log('Time with hours and minutes', hoursAndMinutes);
    return hoursAndMinutes;
  };

  useEffect(() => {
    _checkDescription();
    getLocationAndTurnToAdress();
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

  const getLocationAndTurnToAdress = async () => {
    // console.log('getting location');

    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert('Error', 'Permission to access location was denied');
      return;
    }

    let locationResult = await Location.getCurrentPositionAsync({});
    // console.log('location', locationResult);
    setLocation(locationResult);
    let addressResult = await Location.reverseGeocodeAsync(
      locationResult.coords,
    );
    // console.log('addressResult', addressResult);
    setAddressResult(String(addressResult[0].name));
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
          {addressResult === null ? (
            <ActivityIndicator size="large" color="#44BFBA" />
          ) : (
            <NormalTextField
              placeholder="Required"
              value={addressResult}
              moreStyles={{marginTop: -28}}
              onChangeText={text => setAddressResult(text)}
            />
          )}

          <RegularBoldText
            content="Time of hangout*"
            moreStyles={{marginTop: 15, marginBottom: 10}}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => showDatePicker()}
              style={{
                width: 66,
                height: 44,
                backgroundColor: 'white',
                borderColor: '#ECEEF2',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#030E01',
                  fontWeight: 'bold',
                }}>
                {startTime}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#696969',
              }}>
              <Text>-</Text>
            </View>

            <TouchableOpacity
              onPress={() => showEndTimePicker()}
              style={{
                width: 66,
                height: 44,
                backgroundColor: 'white',
                borderColor: '#ECEEF2',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#030E01',
                  fontWeight: 'bold',
                }}>
                {endTime}
              </Text>
            </TouchableOpacity>
          </View>
          
          {isDatePickerVisible == true && (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}

          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleEndConfirm}
            onCancel={hideEndDatePicker}
          />

          <RegularBoldText content="Screening question (optional):" />
          <RegularText
            content="Ask anything that you want to require  potential connections to answer. "
            moreStyles={{marginTop: -20}}
          />
          <NormalTextField
            placeholder="Add a question"
            moreStyles={{marginTop: -28}}
            onChangeText={text => setScreeningQuestion(text)}
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
            onPress={() =>
              buttonActive ? finishCreatePost2() : null
            }
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
