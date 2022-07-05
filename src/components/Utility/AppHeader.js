import { View, Text, StyleSheet, StatusBar, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { ImageSet} from '../../components/config/Constant'
import NavigationLogo from '../../assets/images/assets/NavigationLogo.svg'

export default function AppHeader({ moreStyles }) {
  return (
    <View style={{ ...styles.container, ...moreStyles }}>
      <View
        style={{
          height: 60,
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',

          backgroundColor: '#F6F6F6',
        }}>
        <View style={{ marginLeft: 16  ,}}>
          <Image style={{ width: 44, height: 44 }} source={ImageSet.logo} />
        </View>
      </View>
    </View>
  )
}

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
)

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F6F6F6',
    backgroundColor: 'white',
    // flex:1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
})
