import React from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'

const Loader = (props) => {
  const { isVisible } = props

  return (
    <Modal
      onRequestClose={() => {}}
      animationType={'fade'}
      transparent={true}
      visible={isVisible}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}
      >
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    </Modal>
  )
}

export default Loader
