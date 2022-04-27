import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
};

export const Icon = ({type, name, color, size = 24, style}) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

export function GoogleIcon() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
      }}>
      <Image
        source={require('../../assets/images/assets/google.png')}
        style={{width: 24, height: 24}}
      />
    </View>
  );
}

export function AppleIcon() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
      }}>
      <Image
        source={require('../../assets/images/assets/apple.png')}
        style={{width: 24, height: 24}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// function GenericIcon({imageURL, width, height}) {
//   return (
//     <View
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '24',
//         height: '24',
//       }}>
//       <Image source={require('')} style={{width: width, height: height}} />
//     </View>
//   );
// }
