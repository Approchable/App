import {
    View,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    ScrollView,Text
  } from 'react-native'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { PostModal } from "./Post"
import { sendJoinRequest } from '../store/Requests/Requests'
import ModalBarTop from './ModalBarTop'
const JoinModal = ({ visible, postObject, onCancel }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('') 
    const handleSendRequest = (post , comment="") => {
      console.log('add join dispacth function here')
      dispatch(sendJoinRequest(post , comment))
      onCancel()
    }
  
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View
          style={{
            ...styles.modal,
          }}>
          <ModalBarTop post={postObject} />
           
          <PostModal
            setComment={setComment}
            post={postObject}
            onPressSend={() => {
              handleSendRequest(postObject , comment)
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.modalBG} />
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    modal: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      zIndex: 1000,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
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

  export default JoinModal;