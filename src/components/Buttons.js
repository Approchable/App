import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Regular,
  Poppins_700Bold,
  Poppins_700Normal,
  P,
} from '@expo-google-fonts/poppins';
import {SocialIcon} from 'react-native-elements';
import {GoogleIcon , AppleIcon} from './Utility/Icons';

export function NormalButton({text, hollow, moreStyles, onPress, inActive}) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Regular,
    Poppins_700Normal,
  });

  if (inActive == false) {
    return (
      <TouchableOpacity
        style={{
          ...styles.containerInactive,
          ...moreStyles,
        }}
        onPress={onPress}>
        <Text
          style={{...styles.textInactive, 
          //fontFamily: 'Poppins_500Regular'
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          ...styles.container,
          backgroundColor: hollow ? '#44BFBA' : 'white',
          borderColor: hollow ? 'white' : '#44BFBA',
          ...moreStyles,
        }}
        onPress={onPress}>
        <Text
          style={{
            ...styles.text,
            color: hollow ? 'white' : '#44BFBA',
            fontFamily: 'Poppins_500Regular',
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export function GoogleButtonWithIcon({onPress , position}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.GoogleButton}>
        <GoogleIcon />
  
      <Text
          style={{
            marginLeft: 10,
            color: '#757575',
            fontFamily: 'Poppins_700Normal',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 20,
            
          }}>
         
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function AppleButtonWithIcon({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.GoogleButton , backgroundColor:'black'}}>
        <AppleIcon/>
  
      <Text
          style={{
            marginLeft: 10,
            color: 'white',
            fontFamily: 'Poppins_700Normal',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 20,
          }}>
          {' '}
          Continue with Apple
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  GoogleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    
    borderColor: '#ECEEF2',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44BFBA',
    height: 50,

    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
  },
  text: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_500Regular',
  },

  containerInactive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF2',
    height: 50,
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ECEEF2',
  },
  textInactive: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_500Regular',
  },
});
