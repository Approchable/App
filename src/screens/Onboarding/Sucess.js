import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native'
import { HeaderText, RegularText, SmallerText } from '../../components/Texts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SucessLogo from '../../assets/images/assets/SucessLogo.svg'
import { NormalButton } from '../../components/Buttons'
import { UserContext } from '../..//context/UserContext'
import { deleteUserData } from '../../../firebase'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import MyStatusBar from '../../components/MyStatusBar'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function Sucess({ navigation }) {
  // const [user, setUser] = useContext(UserContext);
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  console.log(user)
  const buttonActive = true

  function removeItemValue(key) {
    try {
      AsyncStorage.removeItem(key)
      deleteUserData(user.id)
      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }
  const user = AsyncStorage.getItem('user')

  if (user !== undefined && user !== null) {
    return (
      <SafeAreaView style={styles.container}>
        <MyStatusBar backgroundColor="white" />
        <View style={styles.container}>
          <View style={{ marginHorizontal: 18, marginTop: 20, flex: 1 }}>
            {/* <HeaderText content={user.givenName + " is now Approached!"} /> */}
            <View style={{ flex: 1 }}>
              <HeaderText content="Approached!" />
              <SmallerText
                content={
                  'Planet Approachable is excited to have you onboard, ' +
                  user?.givenName +
                  '. We will let you know once your pod is ready. Stay tuned by enabling notifications.'
                }
              />
              <View style={{ marginTop: -20 }}>
                <SmallerText content="Already done? Sit tight and we will approach you! " />
              </View>
            </View>
            <View
              style={{
                //height: 300,
                flex: 1.5,
                alignItems: 'center',
              }}
            >
              <SucessLogo witdth="100%" />
            </View>

            <View style={{ flex: 0.3, marginBottom: 40 }}>
              {/* <NormalButton
                text="Delete yourself!"
                onPress={() => (buttonActive ? removeItemValue('user') : null)} //clode app
                inActive={true}
                hollow
              /> */}
              <NormalButton
                text="Go to Explore"
                onPress={() =>
                  buttonActive ? navigation.navigate('Explore') : null
                } //clode app
                inActive={true}
                hollow
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <MyStatusBar backgroundColor="white" />
        <View style={styles.container}>
          <View style={{ marginHorizontal: 18, marginTop: 20, flex: 1 }}>
            {/* <HeaderText content={user.givenName + " is now Approached!"} /> */}
            <View style={{ flex: 1 }}>
              <HeaderText content="Signed Out!" />
              <SmallerText content={'Restart the app to sign in again. '} />
            </View>
            {/* <View
              style={{
                //height: 300,
                flex: 1.5,
                alignItems: 'center',
              }}>
              <SucessLogo witdth="100%" />
            </View> */}
            {/* 
            <View style={{flex: 0.3, marginBottom: 20}}>
              <NormalButton
                text="Clear info"
                onPress={() => (buttonActive ? removeItemValue('user') : null)} //clode app
                inActive={true}
                hollow
              />
            </View> */}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Hi there,',
    body: 'Welcome to Approachable',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}
