import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { NormalButton } from '../../components/Buttons'
import React, { useState, useEffect } from 'react'
import { HeaderText, RegularBoldText } from '../../components/Texts'
import CategoryItem from '../../components/CategoryItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { logout } from '../../store/actions'
import { NormalTextField } from '../../components/TextField'
import {
  ColorSet,
  ImageSet,
  MessageTypeStatus,
  RequestStatus,
  Routes,
  screenHeight,
  screenWidth,
} from '../../components/config/Constant'
import MyStatusBar from '../../components/MyStatusBar'
import {
  createNewConnectionWithSystemMessage,
  getAllMessagesForConnectionId,
  getUserDataById,
  sendChatMessage,
  updateRequestStatus,
} from '../../../firebase'
import Loader from '../../components/Loader'
import {
  getCurrentDate,
  getTimeFromMilliseconds,
} from '../../components/Utility/Helper'
import moment from 'moment'
import { Button } from 'react-native-elements'
import ChatHeader from '../../components/Chat/ChatHeader'
import RequestHangout from '../../components/Chat/RequestHangout'
import ChatBox from '../../components/Chat/ChatBox'
import uuid from 'react-native-uuid'

const width = (Dimensions.get('window').width - 36) / 3.5

const Chat = ({ route, navigation }) => {
  const connection = route.params.connection
  const request = route.params.request
  const isRequestRoute = route.params.isRequestRoute

  //TODO: Need to fetch the current user from secure items or aysnc storage
  const [user, setUser] = useState('')
  const [connectedUser, setConnectedUser] = useState()
  const [messageArray, setMessageArray] = useState([])
  // const [participentId, setParticipentId] = useState(connections.participent_id[0]);
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [isSendMsgEnabled, setIsSendMsgEnabled] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [connectionId, setConnectionId] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData()
      getChat()
      console.log('isRequestRoute =====>>>> ', isRequestRoute)
      if (isRequestRoute) {
        setIsSendMsgEnabled(true)
      } else {
        setIsSendMsgEnabled(false)
      }
    })
    return unsubscribe
  }, [])


  const getCurrentUserData = async () => {
    var user = await AsyncStorage.getItem('user')
    console.log("Current User Info --> ", user)
    const u = JSON.parse(user)
    console.log('user id is', u.id)
    setUser(u)
  }

  const getUserData = async () => {
    if (!isRequestRoute) {
      setLoading(true)
      // console.log('connection chat screen 1234 ===>>> ', connection)
      const participentId = connection.participants_id.find(
        (i) => i != user && user.id
      )
      // console.log('get other user Id ===>>> ', participentId)
      const userData = await getUserDataById(participentId)
      // console.log('userData ===>>> ', userData)
      if (userData) {
        setConnectedUser(userData)
      }
      setLoading(false)
    } else {

      // is from the request route
      // console.log('connection request screen 1234 ===>>> ', request)
      const userSendingReq = request.userSendingRequest
      // console.log('connection sending req screen ===>>> ', userSendingReq)
      const postObject = request.postObject
      // console.log('postObject ===>>> ', request.postObject)
      setConnectedUser(userSendingReq)
    }
  }

  const getChat = async () => {
    if (!isRequestRoute) {
      const connectionId = connection.id
      const chat = await getAllMessagesForConnectionId(connectionId)
      if (chat) {
        // console.log('chat ============== : ', chat);
        setMessageArray(chat)
      }
    } else {
      //
    }
  }

  const updateChat = async (messageObj) => {
    var newChat = []
    newChat = messageArray
    console.log('newChat ======================>>>> ', newChat);
    // newChat.push(messageObj)
    // setMessageArray(newChat)
  }

  const onClickSend = () => {
    // let currentTime = getCurrentTime();
    const today = getCurrentDate()
    const conId = isRequestRoute ? connectionId : connection.id
    const msgId = `${uuid.v4()}`
    const isRead = false
    const isDeleted = false
    const mediaFiles = []
    const sentAt = today
    const msgText = message
    console.log("Current UserInfo on Click Send  ---> ", user.id)
    const senderId = user.id //TODO: Get current user ID

    //checking if message text is not empty
    if (msgText != '') {
      // sending message to database
      const newMessage = {
        id: msgId,
        connectionId: conId,
        isDeleted: isDeleted,
        isRead: isRead,
        mediaFiles: mediaFiles,
        message: msgText,
        sentAt: sentAt,
        senderId: senderId,
        type: MessageTypeStatus.user,
      }
      // sendChatMessage(newMessage)
      updateChat(newMessage) // TODO: Might need to get updated messages from firestorer
      setMessage('')
    }
  }

  const onBackButton = async () => {
    route.params.onGoBack();
    const goback = navigation.goBack()
    // console.log('goback ===========>>> ', goback);
  }


  const onRequestAcceptBtnAction = async () => {
    setLoading(true)
    const randomConnectionId = `${uuid.v4()}`

    // 1. Update the request status to `accepted
    await updateRequestStatus(request.userReciving.id, request.requestID, RequestStatus.accepted)

    // 2. create new connection with system message
    await createNewConnectionWithSystemMessage(request, randomConnectionId)
    setTimeout(async () => {

      // set connection ID for futurre chat messages
      const chat = await getAllMessagesForConnectionId(randomConnectionId)
      if (chat) {
        // console.log('chat ============== : ', chat);
        setMessageArray(chat)
        setLoading(false)
      }
    }, 2000);

    // 3. Update UI
    setConnectionId(randomConnectionId)
    setAccepted(true)
    setIsSendMsgEnabled(false)
    getCurrentUserData()
  }


  // console.log('isSendMsgEnabledddddd =>', isSendMsgEnabled)
  const postObject = request.postObject

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <MyStatusBar backgroundColor="white" />
        <View style={{ flex: 1 }}>
          <ChatHeader
            isSendMsgEnabled={isSendMsgEnabled}
            onBackButton={onBackButton}
            name={connectedUser && connectedUser.name}
          />
          <View style={[styles.chatSection]}>
            <ScrollView
              contentContainerStyle={styles.scrollViewMain}>
              {isSendMsgEnabled && (
                <>
                  <RequestHangout
                    headline={postObject.headline}
                    description={postObject.description}
                    name={connectedUser && connectedUser.givenName}
                    source={{ uri: connectedUser && connectedUser.photoUrl }}
                    comment={request.comment}
                    screeningQuestion={postObject.screeningQuestion}
                    screeningAnswer={request.screeningAnswer}
                    accepted={accepted}
                    rejected={rejected}
                    onAccepted={onRequestAcceptBtnAction}
                  // onRejected={() => setRejected(true)}
                  />
                </>)}
              {!isSendMsgEnabled &&
                messageArray.map((item, index) => {
                  let today = moment().format('YYYY-MM-DD')
                  let yesterday = moment().add(-1, 'days').format('YYYY-MM-DD')
                  const time = moment(item.date).format('ddd, MMMM DD')
                  return (
                    <View key={index}>
                      <View
                        style={[styles.centerJustify, { marginVertical: 5 }]}>
                        <Text style={styles.dateLabelText}>
                          {item.date == today
                            ? 'Today'
                            : item.date == yesterday
                              ? 'Yesterday'
                              : time}
                        </Text>
                      </View>
                      {/* {item.unRead == true && (
                      <View style={styles.unReadMessagesIndication}>
                        <View style={styles.border} />
                        <Text style={styles.dateLabelText}>Unread messages</Text>
                        <View style={styles.border} />
                      </View>
                    )} */}
                      {item.messages.map((subItem, index) => {
                        const msgTime = getTimeFromMilliseconds(subItem.sentAt.seconds)
                        return (
                          <View key={index}>
                            {subItem.type === MessageTypeStatus.systemRequestAccept && (
                              subItem.requestData.postObject &&
                              <RequestHangout
                                headline={subItem.requestData.postObject.headline}
                                description={subItem.requestData.postObject.description}
                                name={connectedUser && connectedUser.givenName}
                                source={{ uri: connectedUser && connectedUser.photoUrl }}
                                comment={subItem.requestData.comment}
                                screeningQuestion={subItem.requestData.postObject.screeningQuestion}
                                screeningAnswer={subItem.requestData.screeningAnswer}
                                accepted={true}
                                rejected={false}
                                onAccepted={onRequestAcceptBtnAction}
                              // onRejected={() => setRejected(true)}
                              />
                            )}
                            {subItem.type === MessageTypeStatus.systemRequestAccept && (
                              <View style={{ alignItems: 'center' }}>
                                <View style={styles.rightMessageView}>
                                  <View style={[styles.rightMessageText, { backgroundColor: ColorSet.chatLeftPopupGray, paddingHorizontal: 20 }]}>
                                    <Text
                                      style={[
                                        styles.dateLabelText,
                                        { marginRight: 10 },
                                      ]}>
                                      {subItem.sentAt && getTimeFromMilliseconds(subItem.sentAt)}
                                    </Text>
                                    <Text style={styles.messagesText}>
                                      {`Start the chat with ${connectedUser.givenName}`}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            )}
                            {subItem.type === MessageTypeStatus.user && (
                              subItem.sender && subItem.sender.id === user.id ? (
                                <View style={styles.rightMessageView}>
                                  <View style={styles.rightMessageText}>
                                    <Text
                                      style={[
                                        styles.dateLabelText,
                                        { marginRight: 10 },
                                      ]}>
                                      {msgTime}
                                    </Text>
                                    <Text style={styles.messagesText}>
                                      {subItem.message}
                                    </Text>
                                  </View>
                                </View>
                              ) : (
                                <View style={styles.leftMessageView}>
                                  <View style={styles.leftMessageText}>
                                    <Text style={styles.messagesText}>
                                      {subItem.message}
                                    </Text>
                                    <Text style={[styles.dateLabelText, { marginLeft: 10 },]}>
                                      {msgTime}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        )
                      })}
                    </View>
                  )
                })}
            </ScrollView>
          </View>
          <ChatBox
            onChangeText={(text) => setMessage(text)}
            isSendMsgEnabled={isSendMsgEnabled}
            isMessage={message}
            onClickSend={() => onClickSend()}
          />
        </View>
      </KeyboardAvoidingView>
      <Loader isVisible={loading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorSet.lightGray,
  },
  scrollViewMain: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  topBar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  centerJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth.width30,
  },
  regularText: {
    color: ColorSet.textBlack,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    marginLeft: 10,
  },
  chatSection: {
    flex: 1,
    backgroundColor: ColorSet.white,
  },

  dateLabelText: {
    color: ColorSet.gray,
    fontSize: 10,
    lineHeight: 18,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    alignSelf: 'flex-end',
  },
  messagesText: {
    color: ColorSet.textBlack,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    minWidth: screenWidth.width5,
    maxWidth: screenWidth.width75,
  },
  rightMessageView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  rightMessageText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorSet.chatRightPopupGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    minWidth: screenWidth.width10,
    maxWidth: screenWidth.width90,
  },
  leftMessageView: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  leftMessageText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorSet.chatLeftPopupGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    minWidth: screenWidth.width5,
    maxWidth: screenWidth.width90,
  },
  border: {
    height: 1,
    backgroundColor: ColorSet.gray,
    width: screenWidth.width25,
  },
  unReadMessagesIndication: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },

})

export default Chat
