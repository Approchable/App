import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import NavigationLogo from '../../assets/images/assets/NavigationLogo.svg';

export default function AppHeader({moreStyles}) {
  return (
    <View style={{...styles.container ,...moreStyles, }}>
      <View
        style={{
          height: 60,
          flex: 1,
          alignItems: 'left',
          justifyContent: 'center',
          marginLeft: 16,
          marginVertical: 4,
          
        }}>
        <NavigationLogo witdth="100%" />
      </View>
    </View>
  );
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F6F6F6',
    backgroundColor: 'white',
    flex:1,
  
    
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
