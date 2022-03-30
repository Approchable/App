import {View, Pressable, Text, StyleSheet} from 'react-native';
import {
  NormalButton,
  GoogleButtonWithIcon,
  AppleButtonWithIcon,
} from '../../components/Buttons';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import Center from '../../components/Utility/Center';
import HeadingStyle from '../../components/Utility/Styles/TextStyles';
import {Platform} from 'react-native';
import LandingPageImage from '../../assets/images/assets/LandingPageImage.svg';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import {HeaderText} from '../../components/Texts';
import * as AppleAuthentication from 'expo-apple-authentication';
export default function LandingPage({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const [googleSubmitting, setGoogleSubmitting] = useState(false); // use this for loading indicator
  const AndriodClientID =
    '724006010963-9p0s32i5i7httcsnqfdls7ffnc6vkkvl.apps.googleusercontent.com';
  const IOSClientID =
    '724006010963-pbh207t1saug4n1cuscoufiodd73pjf6.apps.googleusercontent.com';
  const initAsync = () => {
    try {
      GoogleSignIn.initAsync({
        clientId: Platform.OS === 'ios' ? IOSClientID : AndriodClientID,
      });
    } catch (e) {}
  };

  const handleAppleAuth = async () => {
    try {
      AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      }).then(credential => {
       
        const {email, familyName, givenName} = credential;
        const result = {email: email, id: credential.user};
        const type = 'apple';
        result["type"] = type;
       

        setTimeout(() =>
          navigation.navigate('Name', {result, familyName, givenName, type}), 1000
        );
      });
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
        console.log('Error occured');
      } else {
        // handle other errors
      }
    }
  };

  const signOutApple = async () => {
    const ebukaId = '001364.1a655f1ef31342e59f99743f70d156a6.1735';
    try {
      AppleAuthentication.refreshAsync({
        user: ebukaId,
      }).then(credential => {});

      console.log(' referesh', credential);
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
        console.log('Error occured tyring to sign out');
      } else {
        // handle other errors
      }
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleSubmitting(true);
    console.log('test sign in');

    const config = {
      iosClientId:
        '724006010963-pbh207t1saug4n1cuscoufiodd73pjf6.apps.googleusercontent.com',
      androidClientId:
        '724006010963-9p0s32i5i7httcsnqfdls7ffnc6vkkvl.apps.googleusercontent.com',
      iosStandaloneAppClientId:
        '724006010963-er1i8nf3hsoeibm6vg8m01au6gqq8bhb.apps.googleusercontent.com',

      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then(result => {
        const {type, user} = result;
        if (type === 'success') {
          console.log('result', result);
          const {familyName, givenName} = user;
          
          const type = 'google';
          result["type"] = 'google';
          setTimeout(() =>
            navigation.navigate('Name', {result, familyName, givenName, type}),
          );

          return result.accessToken;
        } else {
          return {cancelled: true};
        }
      })
      .catch(error => {
        console.log('Hi i got an error trying to sign in');
        console.log(error);
        setGoogleSubmitting(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Center />

        {/* <HeaderText content="Approachable" /> */}
      </View>

      <View
        style={{
          height: 430,
          alignItems: 'center',
          // marginRight: 18,
        }}>
        <LandingPageImage witdth="100%" />
      </View>
      <View
        style={{
          ...styles.container,
          marginHorizontal: 16,

          width: windowWidth * 0.9,
          alignItems: 'center',
          justifyContent: 'flex-end',
          // marginLeft: 30,
          marginBottom: 20,
        }}>
        <View style={{width: windowWidth * 0.9, marginVertical: 8}}>
          <GoogleButtonWithIcon
            onPress={() => handleGoogleSignIn(navigation)}
          />
        </View>
        <View style={{width: windowWidth * 0.9, marginVertical: 8}}>
          <AppleButtonWithIcon onPress={() => handleAppleAuth()} />
        </View>
      </View>
    </View>
  );
  //}
}

//keytool -keystore path-to-debug-or-production-keystore -list -v

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
