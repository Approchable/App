import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

const STATUSBAR_HEIGHT = StatusBar.currentHeight

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  container: {
    flex: 1,
  },
})

export default MyStatusBar
