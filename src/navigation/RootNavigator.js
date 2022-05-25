import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import OnboardingStack from './OnboardingNavigator'
import { useState, useContext, useEffect } from 'react'
import { UserContext, UserProvider } from '../context/UserContext'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WelcomeStack from './WelcomeNavigator'
import CreateNavigator from './CreateNavigator'
import { Provider, useSelector } from 'react-redux'
import { store } from '../store/index'
import { useDispatch } from 'react-redux'
import { Init, login } from '../store/actions'
import CreateStack from './CreateNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { verifyToken } from '../store/WaitList/Waitlist'
import ChatStack from './ChatStackNavigation/ChatStackNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../screens/Chat/Chat'
// import { createAppContainer, createSwitchNavigator } from '@react-navigation';

function OnboardingNavigator({ userToken, isCorrectToken }) {
  console.log('userToken in onboarding', userToken)

  if (userToken === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <OnboardingStack />
    </NavigationContainer>
  )
}

function AppNavigator() {
  var create = useSelector((state) => state.NavReducer.create)
  const AppStack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      {create === true ? (
        <CreateStack />
      ) : (
        // <BottomTabNavigator />
        <AppStack.Navigator initialRouteName="Main">
          <AppStack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  )
}
export default function RootNavigator() {
  const [user, setUser] = useContext(UserContext)
  //const [userToken , setUserToken] = useState(null);
  const [appReady, setAppReady] = useState(false)

  var userToken = useSelector((state) => state.AuthReducer.userId)
  var isCorrectWaitListCode = useSelector(
    (state) => state.WaitlistReducer.isCorrectToken
  )
  //console.log(isCorrectWaitListCode , "code waitlist reducer");
  // userToken = null
  // console.log('user', userToken);

  const dispatch = useDispatch()

  const checkForUserThroughredux = () => {
    dispatch(Init())
  }

  const verifyWaitListCode = async () => {
    try {
      var correctToken = await AsyncStorage.getItem('WaitlistToken')

      //console.log('===================correctToken===============', correctToken);
      if (correctToken !== null) {
        dispatch(verifyToken(correctToken))
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkForUserThroughredux()
    verifyWaitListCode()
  })

  const checkUserCredentials = async () => {
    console.log('Checkig for user using async ')
    try {
      AsyncStorage.getItem('user').then((userValue) => {
        console.log('user found', userValue)
        var userValueJSON = JSON.parse(userValue)
        setUser(userValueJSON)
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (userToken !== undefined && userToken !== null) {
    // if (isCorrectWaitListCode == true){
    return <AppNavigator />
  } else {
    // return <AppNavigator />;
    return <OnboardingNavigator userToken={userToken} />
  }
}
