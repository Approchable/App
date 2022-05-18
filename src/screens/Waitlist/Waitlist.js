import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import SucessLogo from '../../assets/images/assets/SucessLogo.svg'
import { NormalButton } from '../../components/Buttons'
import {
  HeaderText,
  RegularBoldText,
  RegularText,
  SmallerText,
} from '../../components/Texts'
import { useSelector, useDispatch } from 'react-redux'
import { NormalTextField } from '../../components/TextField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { verifyToken } from '../../store/WaitList/Waitlist'
import { login } from '../../store/auth/Auth.js'
import MyStatusBar from '../../components/MyStatusBar'

export default function Waitlist({ navigation, route }) {
  console.log('In Waitlist')
  console.log('params', route.params)
  const correctCode = '0123456789'
  const [user, setUser] = useState(null)
  const [code, setCode] = useState('0123456789')

  const approachableUrl = 'https://www.approachable.ai/'
  const dispatch = useDispatch()

  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url)
    if (isSupported) {
      await Linking.openURL(url)
    } else {
      Alert.alert('Error', 'Could not open url')
    }
  }

  const _verifyCode = (codeString) => {
    // aso logsthe user in
    if (codeString.length !== 10) {
      Alert.alert('Error', 'Please enter a valid code')
      return
    }
    if (codeString !== correctCode) {
      Alert.alert('Error', 'Please enter a valid code')
      return
    }

    const finalResult = route.params
    console.log('verify code', finalResult)
    dispatch(verifyToken(codeString))
    dispatch(login(finalResult))
  }

  const _getUser = () => {
    // const userPromise = AsyncStorage.getItem('user').then(res => {
    //   res = JSON.parse(res);
    //   console.log(res, ' ressssssssssss');
    setUser(route.params)
    // });
  }

  useEffect(() => {
    _getUser()
  }, [])

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <MyStatusBar backgroundColor="white" />
        <View style={styles.container}>
          <View style={{ marginHorizontal: 18, flex: 1 }}>
            <View style={{ flex: 1 }}>
              <SmallerText content={'Hi ' + user.givenName + ','} />

              <View style={{ marginTop: -20 }}>
                <SmallerText content="Looks like you are a first time Approachable user! My name is Matt Williams and my co-founder's name is Ebuka Egbunam. We both will personally like to say thank you and welcome to a community that aims to bring the world closer together" />
              </View>
              {/* <View style={{marginTop: -20}}>
                <SmallerText content="Thanks for joining Approachable!  We're adding people gradually to make sure nothing breaks, so we're placing you on the waitlist. Make sure you keep your notifications on, and when its your turn we'll send you a code to enter that will let you in." />
              </View>
              <View style={{marginTop: -20}}>
                <SmallerText content="Looking foward to having great times together!" />
              </View> */}

              {/* <View style={{marginTop: -20, alignItems: 'center'}}>
                <RegularBoldText content="Enter your 10-digit code to sign in" />
                <NormalTextField
                  placeholder="Enter Code here"
                  moreStyles={{width: '90%'}}
                  value={code}
                  onChangeText={text => setCode(text)}
                />
              </View> */}
            </View>

            <View style={{ flex: 0.3, marginBottom: 40, alignItems: 'center' }}>
              {/* <NormalButton
                text="Submit"
                onPress={() => _verifyCode(code)} //clode app
                inActive={true}
                hollow
              /> */}

              <NormalButton
                text="Welcome !! "
                onPress={() => _verifyCode(code)} //clode app
                inActive={true}
                hollow
              />

              <TouchableOpacity onPress={() => openUrl(approachableUrl)}>
                <RegularText
                  content="Click here to learn more about us!"
                  moreStyles={{ color: '#1183ca', fontSize: 12 }}
                />
              </TouchableOpacity>
            </View>
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
