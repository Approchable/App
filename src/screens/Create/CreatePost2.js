import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as Location from 'expo-location'

import { NormalButton, TextButton } from '../../components/Buttons'
import {
  HeaderText,
  RegularText,
  RegularBoldText,
} from '../../components/Texts'
import { NormalTextField } from '../../components/TextField'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { addToPostObject } from '..//../store//posts//posts'
import MyStatusBar from '../../components/MyStatusBar'
import LocationSearchBar from '../../components/LocationSearchBar'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function CreatePost2({ navigation, route }) {
  const selectedStartTime = 'start'
  const selectedEndTime = 'end'

  const dispatch = useDispatch()
  const [description, setDescription] = useState(null)
  const [buttonActive, setButtonActive] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false)
  const [startDateTime, setStartDateTime] = useState(null)
  const [endDateTime, setEndDateTime] = useState(null)
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('00:00')
  const [location, setLocation] = useState(null)
  const [addressResult, setAddressResult] = useState(null)
  const [screeningQuestion, setScreeningQuestion] = useState(null)

  const finishCreatePost2 = () => {
    if (startTime == '00:00') {
      Alert.alert('Please enter a start time')
      return
    }
    if (
      addressResult == null ||
      addressResult == undefined ||
      addressResult == ''
    ) {
      Alert.alert('Please enter a location')
      return
    }
    console.log('date times :' + startDateTime + ' ' + endDateTime)
    const data = {
      description: description || '',
      startDateTime: startDateTime || Date.now(),
      endDateTime: endDateTime || '',
      startTime: startTime,
      endTime: endTime || '',
      location: location || {},
      addressResult: addressResult || '',
      screeningQuestion: screeningQuestion || '',
    }
    dispatch(addToPostObject(data))
    navigation.navigate('CreatePost3')
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const hideEndDatePicker = () => {
    setEndTimePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    console.log(new Date(date))
    const hoursAndMinutes = getHoursandMinutes(date)
    setStartDateTime(date)
    setStartTime(hoursAndMinutes)
    hideDatePicker()
  }

  const handleEndConfirm = (date) => {
    if (date <= startDateTime) {
      Alert.alert('Error', 'End time must be after start time')
      return
    }

    const hoursAndMinutes = getHoursandMinutes(date)
    setEndTime(hoursAndMinutes)
    setEndDateTime(date)
    hideEndDatePicker()
  }

  const getHoursandMinutes = (date) => {
    var hoursAndMinutes = date.getHours() + ':' + date.getMinutes()
    if (date.getHours() < 10) {
      hoursAndMinutes = '0' + hoursAndMinutes
    }
    if (date.getMinutes() < 10) {
      hoursAndMinutes = hoursAndMinutes + '0'
    }

    console.log('Time with hours and minutes', hoursAndMinutes)
    return hoursAndMinutes
  }

  useEffect(() => {
    _isButtonActiveController()
    // getLocationAndTurnToAdress()
  }, [description, screeningQuestion, addressResult])

  const isDescriptionComplete = () => {
    if (
      description === '' ||
      description === null ||
      description === undefined
    ) {
      return false
    }
    return true
  }

  const isLocationComplete = () => {
    if (
      addressResult === null ||
      addressResult === undefined ||
      addressResult === ''
    ) {
      return false
    }
    return true
  }

  const isStartTimeComplete = () => {
    if (
      startTime === null ||
      startTime === undefined ||
      startTime === '00:00'
    ) {
      return false
    }
    return true
  }
  const _isButtonActiveController = () => {
    console.log(description, addressResult)
    if (isDescriptionComplete() && isLocationComplete()) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }

  const handleSettingLocation = async (location) => {
    console.log(location)
    console.log('Location is setting create post 2 ')
    setLocation(location.location)
    console.log('Adress is : ' + location.location.vicinity)
    setAddressResult(location.location.vicinity) // Using vicity property instead of adress property because vcicity property is shorter and easier to read.
  }

  const getLocationAndTurnToAdress = async () => {
    // console.log('getting location');

    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      Alert.alert('Error', 'Permission to access location was denied')
      return
    }

    let locationResult = await Location.getCurrentPositionAsync({})
    // console.log('location', locationResult);
    setLocation(locationResult)
    let addressResult = await Location.reverseGeocodeAsync(
      locationResult.coords
    )
    // console.log('addressResult', addressResult);
    setAddressResult(String(addressResult[0].name))
  }

  //NaviagteOutOfCreate

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      {/* <AppHeader moreStyles={{height: 50 }} /> */}
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ marginHorizontal: 16, marginTop: 40 }}>
            <HeaderText
              content="Your hangout details"
              moreStyles={{ marginBottom: 10 }}
            />
            <RegularBoldText content="Describe your hangout" />
            <NormalTextField
              placeholder="Required"
              moreStyles={{
                marginTop: -28,
                minHeight: 44,
                maxHeight: 100,
                height: null,
              }}
              onChangeText={(text) => setDescription(text)}
              multiline
            />
            <RegularBoldText content="Location" />

            <LocationSearchBar
              moreStyles={{
                marginTop: -28,
              }}
              onClickLocation={(location) => handleSettingLocation(location)}
            />

            <RegularBoldText
              content="Time of hangout*"
              moreStyles={{ marginTop: 15, marginBottom: 10 }}
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

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndConfirm}
              onCancel={hideEndDatePicker}
            />

            <RegularBoldText content="Screening question (optional):" />
            <RegularText
              content="Ask anything that you want to require  potential connections to answer. "
              moreStyles={{ marginTop: -20 }}
            />
            <NormalTextField
              placeholder="Add a question"
              moreStyles={{ marginTop: -28 }}
              onChangeText={(text) => setScreeningQuestion(text)}
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
              onPress={() => (buttonActive ? finishCreatePost2() : null)}
              inActive={buttonActive}
              hollow
              moreStyles={{
                marginTop: 20,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const TimeHangout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red', marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', backgroundColor: 'blue' }}>
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
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
