import {View, Image, StyleSheet, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function BackButton({actionHandler}) {
    return (
      <>
      <TouchableOpacity onPress={actionHandler}>
      <View style={styles.back}>
      <Image  source={require('../assets/images/assets/backIcon.png')} />
      </View> 
      </TouchableOpacity>

      </>
    );
  }


  
const styles = StyleSheet.create({
    back: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ECEEF2',
      width: 54,
      height: 54,
      borderRadius: 8,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: "center",
      marginBottom: 10
    },
  
  
  });