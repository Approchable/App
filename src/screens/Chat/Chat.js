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
import React, { useState, useEffect, createRef } from 'react'
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
  updateIsReadStatus,
  updateLastMessage,
  updateRequestStatus,
  updateUnreadMessageCount,
  fireStore,
} from '../../../firebase'

import { Button } from 'react-native-elements'
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist'
import Loader from '../../components/Loader'
import {
  getCurrentDate,
  getTimeFromMilliseconds,
} from '../../components/Utility/Helper'
import moment from 'moment'
import ChatHeader from '../../components/Chat/ChatHeader'
import RequestHangout from '../../components/Chat/RequestHangout'
import ChatBox from '../../components/Chat/ChatBox'
import uuid from 'react-native-uuid'

import { collection, doc, onSnapshot, getDocs } from 'firebase/firestore'

const myRef = createRef()

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
  const [postObject, setPostObject] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCurrentUserData()
      console.log('isRequestRoute ====>>>> ', isRequestRoute)
      if (isRequestRoute) {
        setIsSendMsgEnabled(true)
        setConnectedUser(request.userSendingRequest)
        setPostObject(request.postObject)
      } else {
        getChat()
        setConnectedUser(connection.userSendingRequest)
        updateUnreadMessageCountHandler()
        setIsSendMsgEnabled(false)
      }
    })
    return unsubscribe
  }, [])

  useEffect(async () => {
    var conId = isRequestRoute ? connectionId : connection.id
    const messageCollectionRef = collection(
      fireStore,
      'connections',
      conId,
      'messages'
    )

    const unsub = onSnapshot(messageCollectionRef,  (snapshot) => {
      console.log("gettign new data")
      getChat()
    })
    return unsub
  }, [])

  const getCurrentUserData = async () => {
    var user = await AsyncStorage.getItem('user')
    const u = JSON.parse(user)
    console.log('user id is', u.id)
    setUser(u)
  }

  const getChat = async () => {
    if (!isRequestRoute) {
      const conId = connection.id
      const chat = await getAllMessagesForConnectionId(conId)
      if (chat) {
        setMessageArray(chat)
      }
    } else {
      //
    }
  }

  const updateUnreadMessageCountHandler = async () => {
    const conId = isRequestRoute ? connectionId : connection.id
    await updateUnreadMessageCount(connection, user.id)
  }

  const updateChat = async () => {
    const conId = isRequestRoute ? connectionId : connection.id
    const chat = await getAllMessagesForConnectionId(conId)
    if (chat) {
      setMessageArray(chat)
    }
  }

  const updateLastMessageOfConnection = async (connection, messageObj) => {
    await updateLastMessage(connection, messageObj, user.id)
  }

  const onClickSend = () => {
    const today = getCurrentDate()
    const conId = isRequestRoute ? connectionId : connection.id
    const msgId = `${uuid.v4()}`
    const isRead = false
    const isDeleted = false
    const mediaFiles = []
    const sentAt = today
    const msgText = message.trim()
    const senderId = user.id

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
      sendChatMessage(newMessage)
      updateChat()
      updateLastMessageOfConnection(connection, newMessage)
      setMessage('')
    }
  }

  const onBackButton = async () => {
    if (isRequestRoute) {
      route.params.onGoBack()
      const goback = navigation.goBack()
    } else {
      navigation.goBack()
    }
  }

  const onRequestAcceptBtnAction = async () => {
    setLoading(true)
    const randomConnectionId = `${uuid.v4()}`

    // 1. Update the request status to `accepted
    await updateRequestStatus(
      request.userReciving.id,
      request.requestID,
      RequestStatus.accepted
    )

    // 2. create new connection with system message
    await createNewConnectionWithSystemMessage(request, randomConnectionId)

    setTimeout(async () => {
      // set connection ID for futurre chat messages
      const chat = await getAllMessagesForConnectionId(randomConnectionId)
      if (chat) {
        setMessageArray(chat)
        setLoading(false)
      }
    }, 2000)

    // 3. Update UI
    setConnectionId(randomConnectionId)
    setAccepted(true)
    setIsSendMsgEnabled(false)
    getCurrentUserData()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <MyStatusBar backgroundColor="white" />
        <View style={{ flex: 1 }}>
          <ChatHeader
            isSendMsgEnabled={isSendMsgEnabled}
            onBackButton={onBackButton}
            name={connectedUser && connectedUser.name}
          />
          <View style={[styles.chatSection]}>
            <AutoScrollFlatList
              ref={myRef}
              threshold={20}
              data={messageArray}
              renderItem={({ item, index }) => {
                return (
                  <>
                    {!isSendMsgEnabled &&
                      messageArray.map((item, index) => {
                        let today = moment().format('YYYY-MM-DD')
                        let yesterday = moment()
                          .add(-1, 'days')
                          .format('YYYY-MM-DD')
                        const time = moment(item.date).format('ddd, MMMM DD')
                        return (
                          <View key={index}>
                            <View
                              style={[
                                styles.centerJustify,
                                { marginVertical: 5 },
                              ]}>
                              <Text style={styles.dateLabelText}>
                                {item.date == today
                                  ? 'Today'
                                  : item.date == yesterday
                                  ? 'Yesterday'
                                  : time}
                              </Text>
                            </View>
                            {item.messages.map((subItem, index) => {
                              const msgTime = getTimeFromMilliseconds(
                                subItem.sentAt.seconds
                              )
                              var firstUnread = item.messages.find(
                                ({ isRead, senderId, type }) =>
                                  type === MessageTypeStatus.user &&
                                  senderId !== user.id &&
                                  isRead == false
                              )
                              var conId = isRequestRoute
                                ? connectionId
                                : connection.id
                              if (
                                subItem.type === MessageTypeStatus.user &&
                                subItem.senderId !== user.id
                              ) {
                                updateIsReadStatus(subItem.id, conId)
                              }
                              return (
                                <View key={index}>
                                  {subItem.type ===
                                    MessageTypeStatus.systemRequestAccept &&
                                    subItem.requestData.postObject && (
                                      <RequestHangout
                                        headline={
                                          subItem.requestData.postObject
                                            .headline
                                        }
                                        description={
                                          subItem.requestData.postObject
                                            .description
                                        }
                                        name={
                                          connectedUser &&
                                          connectedUser.givenName
                                        }
                                        source={{
                                          uri:
                                            connectedUser &&
                                            connectedUser.photoUrl,
                                        }}
                                        comment={subItem.requestData.comment}
                                        screeningQuestion={
                                          subItem.requestData.postObject
                                            .screeningQuestion
                                        }
                                        screeningAnswer={
                                          subItem.requestData.screeningAnswer
                                        }
                                        accepted={true}
                                        rejected={false}
                                        onAccepted={onRequestAcceptBtnAction}
                                        // onRejected={() => setRejected(true)}
                                      />
                                    )}
                                  {subItem.type ===
                                    MessageTypeStatus.systemRequestAccept && (
                                    <>
                                      <View style={{ alignItems: 'center' }}>
                                        <View style={styles.rightMessageView}>
                                          <View
                                            style={[
                                              styles.rightMessageText,
                                              {
                                                backgroundColor:
                                                  ColorSet.chatLeftPopupGray,
                                                paddingHorizontal: 20,
                                              },
                                            ]}>
                                            <Text
                                              style={[
                                                styles.dateLabelText,
                                                { marginRight: 10 },
                                              ]}>
                                              {subItem.sentAt &&
                                                getTimeFromMilliseconds(
                                                  subItem.sentAt
                                                )}
                                            </Text>
                                            <Text style={styles.messagesText}>
                                              {`Start the chat with ${connectedUser.givenName}`}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>

                                      <View
                                        style={styles.unReadMessagesIndication}>
                                        <View style={styles.border} />
                                        <Text style={styles.dateLabelText}>
                                          Start of your conversation
                                        </Text>
                                        <View style={styles.border} />
                                      </View>
                                    </>
                                  )}
                                  {subItem.type === MessageTypeStatus.user &&
                                    (subItem.senderId === user.id ? (
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
                                      <>
                                        {subItem.isRead == false &&
                                          firstUnread.id === subItem.id && (
                                            <View
                                              style={
                                                styles.unReadMessagesIndication
                                              }>
                                              <View style={styles.border} />
                                              <Text
                                                style={styles.dateLabelText}>
                                                Unread messages
                                              </Text>
                                              <View style={styles.border} />
                                            </View>
                                          )}
                                        <View style={styles.leftMessageView}>
                                          <View style={styles.leftMessageText}>
                                            <Text style={styles.messagesText}>
                                              {subItem.message}
                                            </Text>
                                            <Text
                                              style={[
                                                styles.dateLabelText,
                                                { marginLeft: 10 },
                                              ]}>
                                              {msgTime}
                                            </Text>
                                          </View>
                                        </View>
                                      </>
                                    ))}
                                </View>
                              )
                            })}
                          </View>
                        )
                      })}
                  </>
                )
              }}
              keyExtractor={(index) => index}
            />
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
              </>
            )}
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
