import React from 'react'
import { Modal, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
function ModalWrapper({ children, handleCancel, ...rest }) {
  return (
    <Modal {...rest}>
      <View
        style={{
          ...styles.modal,
        }}
      >
        <ModalBarTop />
        {children}
      </View>
      <TouchableWithoutFeedback onPress={handleCancel}>
        <View style={styles.modalBG} />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const ModalBarTop = () => {
  return (
    <View
      style={{
        backgroundColor: '#ECEEF2',
        height: 4,
        width: 70,
        borderRadius: 13,
        alignSelf: 'center',
        marginTop: 10,
      }}
    ></View>
  )
}
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  modalBG: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 900, // change this to height of screen later
  },
})
export default ModalWrapper
