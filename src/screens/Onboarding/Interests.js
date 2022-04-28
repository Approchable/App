import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {NormalButton} from '../../components/Buttons';
import Center from '../../components/Utility/Center';
import {HeaderText, RegularText, SmallerText} from '../../components/Texts';
import LandingPage from '../Onboarding/LandingPage';
import HowItWorks from './HowItWorks';
import Animated, {set} from 'react-native-reanimated';
import {useState, useEffect, useContext, useRef} from 'react';
import {writeUserData} from '../../../firebase';
import CategoryItem from '../../components/CategoryItem';
import {CategorieContext} from '../..//context/CategorieContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext, UserProvider} from '../../context/UserContext';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {useDispatch} from 'react-redux';
import {login} from '../../store/actions';
import MyStatusBar from '../../components/MyStatusBar';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Interests({navigation, route}) {
  var [user, setUser] = useContext(UserContext);
  let {result, lastName, firstname} = route.params;
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();

  const width = (Dimensions.get('window').width - 36) / 3.5;
  const CategorieArr = [
    'adventure & exploration',
    'arts & culture',
    'career & business',
    'creativity',
    'entertainment',
    'food & drink',
    'health & fitness',
    'night out',
    'outdoors',
    'pets & animals',
    'religion & spirituality',
    'studying & co-work',
    'sports & recreation',
    'technology & science',
  ];
  const [categories, setCategories] = useContext(CategorieContext);

  const handlePressCategories = newVal => {
    console.log(newVal);
    console.log("categories",categories);
    

    setCategories([...categories, newVal]);
  };

  const ref = React.useRef();

  const [buttonActive, setButtonActive] = useState(false);

  const handleNextButton = () => {
    if (categories.length > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

  const handleSavingUser = async () => {
    console.log("categoriessssss" , categories)
    // save user interest and expo token to firebase as well
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      var finalId = '';
      var name = '';
      var finalResult = {};

      if (result.type === 'apple') {
        const {id} = result;
        finalId = id.replaceAll('.', '');
        console.log('finalId', finalId);

        finalResult['id'] = finalId;
        finalResult['familyName'] = lastName;
        finalResult['givenName'] = firstname;
        finalResult['expoPushToken'] = token;
        finalResult['name'] = firstname + ' ' + lastName;
        finalResult['appleId'] = id;
        finalResult['signUpType'] = 'apple';
        console.log(finalResult, 'apple');
      } else {
        finalResult = result.user;
        finalResult['expoPushToken'] = token;
        finalResult['signUpType'] = 'google';
        console.log(finalResult, 'google');
        finalId = finalResult.id;
      }
      finalResult['interests'] = categories;

      navigation.navigate('Waitlist' , finalResult);
 
    });
  };
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    handleNextButton();
  }, [categories]);

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 10,
          // flex: 1,
          // backgroundColor: 'red',
          flexWrap: 'wrap',
        }}>
        <HeaderText content="What do you like?" />
        <SmallerText content="Select below to help us find the people and hangouts for you" />
      </View>

      <View
        ref={ref}
        style={{
          flex: 1,
          alignItems: 'left',
          marginHorizontal: 16,
          flexGrow: 1,
          marginBottom: 50,
          justifyContent: 'flex-end',
          // backgroundColor: 'blue',
        }}>
        <ScrollView style={{marginBottom: -15}}>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {CategorieArr.map((item, index) => (
              <CategoryItem
                content={item}
                width={width}
                onPress={() => handlePressCategories(item)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={{marginBottom: 20, flex: 0.3, marginHorizontal: 16}}>
        <NormalButton
          text="Next"
          onPress={
            () => (buttonActive ? handleSavingUser() : null) //navigation.navigate('Sucess')
          }
          inActive={buttonActive}
          moreStyles={{marginTop: 40}}
        />
      </View>
      </View>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    textAlign: 'left',
    marginVertical: 5,
  },

  regular: {
    color: '#696969',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 32,
    marginVertical: 4,
  },
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
