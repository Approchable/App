import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { getConnections, getConnectionUser, logout } from '../../store/actions'
import { ImageSet, Routes, screenWidth, ColorSet, TabType, } from '../../components/config/Constant'
import MyStatusBar from '../../components/MyStatusBar'
import { getConnectionById, updateRequestStatus } from '../../../firebase'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { getRequests } from '../../store/Requests/Requests'
import { dateDifference } from '../../components/Utility/Helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DataArray = [
  {
    name: 'Jane',
    lastMassage: 'hi!',
    time: '2h',
    count: 8,
  },
  {
    name: 'Leslie',
    lastMassage: 'In general, everything is fine, but..',
    time: '14h',
    count: 1,
  },
  {
    name: 'Kristin',
    lastMassage: 'Amet minim mollit non desseermo..',
    time: '14h',
    count: 0,
  },
  {
    name: 'Dianne',
    lastMassage: 'Amet minim mollit non desseermo..',
    time: '12h',
    count: 0,
  },
]
const RequestsDataArray = [
  {
    name: 'Kristin',
    lastMassage: 'That sounds fun! I’d love to join That sounds fun! I’d love to join That sounds fun! I’d love to join ',
    time: '14h',
  },
  {
    name: 'Ralph',
    lastMassage: null,
    time: '14h',
  },
  {
    name: 'Jane',
    lastMassage: null,
    time: '14h',
  },
]

export default function Connections({ navigation }) {
  const requests = useSelector((state) => state.getAllRequestsReducer.requests)
  const connections = useSelector(
    (state) => state.GetConnectionsReducer.connections
  )


  const connectedUser = useSelector(
    (state) => state.getConnectionUserReducer.connectedUser
  )
  // const loading = useSelector((state) => state.GetConnectionsReducer.loading)
  const [conId, setConId] = useState('conid_12345680')
  const [conId2, setConId2] = useState('101432345899135768743')
  const [connectionTab, setConnectionTab] = useState(true)
  const [requestTab, setRequestTab] = useState(false)
  const [isFetched, setIsFetched] = useState(true)
  const [isFetchedRequest, setIsFetchedRequest] = useState(false)
  const [requestStatus, setRequestStatus] = useState(true)
  const [connectionsArray, setConnectionsArray] = useState(DataArray)
  const [requestArray, setRequestsArray] = useState(requests)
  const [currentUserId, setCurrentUserId] = useState(undefined);

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getRequests()
      _getConnections()
      checkStatus()
      setTimeout(() => {
        setIsFetched(false)
      }, 2000)
    })
    _getRequests()
    checkStatus()
    return unsubscribe
  }, [])


  const _getConnections = async () => {
    dispatch(getConnections(conId))
  }

  const _getRequests = async () => {

    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).id;

    if (userId) {
      console.log(`trying to fetch the current logged in user(${userId}) requests`);
      dispatch(getRequests(userId))
    } else {
      console.log(`unable to fetch current logged in user ID.`);
    }
  }

  const onClickChatButton = async () => {
    _getConnections()
    // console.log('conId ===>>>  ', conId)
    const connections = await getConnectionById(conId)
    if (connections) {
      // console.log('connections new 1 ====>> ', connections)
      navigation.navigate(Routes.Chat, { data: connections })
    } else {
      // console.log('connections new 2 ====>> ', connections)
    }
  }

  const onClickRequestButton = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).id;
    // TODO : Change the docId of the requests to same as relative requestID 
    // const requestId = '392884e6-601c-4614-aea6-858102a897c8'
    const requestId = 'Q2s6R0llkdPlbIY7Ga4x'
    updateRequestStatus(userId, requestId)
    navigation.navigate(Routes.Chat, { routeCheck: false, data: connections })
  }

  const tabsChangingHandler = (tabType) => {
    if (tabType == TabType.connections) {
      setIsFetched(true)
      setConnectionTab(true)
      setRequestTab(false)
      setTimeout(() => {
        setIsFetched(false)
      }, 2000)
    }
    if (tabType == TabType.requests) {
      setIsFetchedRequest(true)
      setRequestTab(true)
      setConnectionTab(false)
      setRequestsArray(requests)
      setTimeout(() => {
        setIsFetchedRequest(false)
      }, 2000)
    }
  }

  const checkStatus = async () => {
    // if (requestArray.length > 0) {
    // console.log('=============== this function working fine ===============');
    setIsFetchedRequest(true)

    for (let i = 0; i < requestArray.length; i++) {
      console.log('i.requestStatus ======>>> ', requestArray[i].requestStatus);
      if (requestArray[i].requestStatus == 'pending') {
        console.log('===============  pending  ');
        setRequestStatus(true)
      } else {
        console.log('===============  opened  ');
        setRequestStatus(false)
      }
    }
    // }
    setTimeout(() => {
      setIsFetchedRequest(false)
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      <View style={styles.textInputView}>
        <Image style={styles.searchIcon} source={ImageSet.search} />
        <TextInput
          // value={value}
          style={styles.textInput}
          placeholder={'Search'}
        // onChangeText={onChangeText}
        />
        <Image style={styles.filterIcon} source={ImageSet.filter} />
      </View>
      <View style={styles.tabView}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.tabs,
            {
              borderColor: connectionTab ? ColorSet.defaultTheme : ColorSet.dimGray,
              borderBottomWidth: connectionTab && 1.5
            },
          ]}
          onPress={() => tabsChangingHandler(TabType.connections)}>
          <Text
            style={[
              styles.tabsText,
              { color: connectionTab ? ColorSet.defaultTheme : ColorSet.dimGray },
            ]}>
            Connections
          </Text>
          <Image style={styles.dotIcon} source={ImageSet.dot} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.tabs,
            {
              borderColor: requestTab ? ColorSet.defaultTheme : ColorSet.dimGray,
              borderBottomWidth: requestTab && 1.5
            },
          ]}
          onPress={() => tabsChangingHandler(TabType.requests)}>
          <Text
            style={[
              styles.tabsText,
              { color: requestTab ? ColorSet.defaultTheme : ColorSet.dimGray },
            ]}>
            Requests
          </Text>
          {requestStatus && <Image style={styles.dotIcon} source={ImageSet.dot} />}
        </TouchableOpacity>
      </View>

      {connectionTab ? (
        connectionsArray.length > 0 ? (
          <View style={styles.mainView}>
            {connectionsArray.map((item, index) => {
              return (
                <SkeletonContent
                  key={index}
                  containerStyle={styles.skeletonContentStyle}
                  isLoading={isFetched}
                  isVisible={true}
                  animationType="pulse"
                  animationDirection="horizontalRight"
                  layout={[styles.userIconShimmer, { children: [styles.titleShimmer, styles.messageShimmer], }, styles.countShimmer]}>
                  <TouchableOpacity activeOpacity={0.5} style={styles.connectionsView}>
                    <View style={styles.centerRowAlign}>
                      <Image style={styles.userImage} source={ImageSet.profile} />
                      <View>
                        <Text style={styles.userName}>{item.name}</Text>
                        <View style={styles.lastMessageView}>
                          <Text numberOfLines={1} style={styles.lastMessageText}>
                            {item.lastMassage}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.time}>{'  ' + item.time}</Text>
                    </View>
                    {(item.count && (
                      <View style={styles.messageCountView}>
                        <Text style={styles.messageCount}>
                          {item.count && item.count}
                        </Text>
                      </View>
                    )) || <View style={{ width: screenWidth.width5 }} />}
                  </TouchableOpacity>
                </SkeletonContent>
              )
            })}
          </View>
        ) : (
          <View style={styles.noMessageView}>
            <Image style={styles.noMessageIcon} source={ImageSet.noMessage} />
            <Text style={styles.noMessageText}>No messages yet</Text>
          </View>
        )
      ) : null}

      {requestTab ? (
        requestArray.length > 0 ? (
          <View style={styles.mainView}>
            {requestArray.map((item, index) => {
              const data = item.userSendingRequest
              const time = dateDifference(item.createdAt.seconds)
              const status = item.requestStatus
              // console.log('request status ====>>>> ', status);
              return (
                <SkeletonContent
                  key={index}
                  containerStyle={styles.skeletonContentStyle}
                  isLoading={isFetchedRequest}
                  isVisible={true}
                  animationType="pulse"
                  animationDirection="horizontalRight"
                  layout={[styles.userIconShimmer, { children: [styles.titleShimmer, styles.messageShimmer], }, styles.countShimmer]}>
                  <TouchableOpacity
                    onPress={onClickRequestButton}
                    activeOpacity={0.5} style={styles.requestsView}>
                    <View style={[styles.centerRowAlign]}>
                      {status == 'pending' && <Image style={styles.dotIconForNewRequests} source={ImageSet.dot} />}
                      <Image style={styles.userImage} source={{ uri: data.photoUrl }} />
                      <View>
                        <Text style={styles.userName}>{data.givenName}</Text>
                        <View style={[styles.lastMessageView,]}>
                          <Text numberOfLines={1}
                            style={[
                              styles.lastMessageText,
                              {
                                width: time == 'just now' ? screenWidth.width55 : status == 'pending' ? screenWidth.width60 : screenWidth.width65
                              }
                            ]}>
                            {item.comments ? item.comments : data.givenName + ' ' + "is Approachable! start the chat."}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.time}>{time}</Text>
                  </TouchableOpacity>
                </SkeletonContent>
              )
            })}
          </View>
        ) : (
          <View style={styles.noMessageView}>
            <Image style={styles.noMessageIcon} source={ImageSet.noMessage} />
            <Text style={styles.noMessageText}>No requests yet</Text>
          </View>
        )
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputView: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    borderColor: ColorSet.chatPopupGray,
  },
  searchIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  textInput: {
    width: screenWidth.width65,
    height: 40,
  },
  filterIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  tabView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomColor: ColorSet.chatPopupGray,
    borderBottomWidth: 1,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth.width40,
    paddingVertical: 10,
  },
  tabsText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
  dotIcon: {
    width: 5,
    height: 5,
    resizeMode: 'contain',
    marginTop: 5,
  },
  userImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderRadius: 150,
    marginRight: 10
  },
  userName: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  lastMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessageText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: ColorSet.gray,
    width: screenWidth.width55,
  },
  time: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: ColorSet.gray,
    alignSelf: 'flex-end',
  },
  connectionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: ColorSet.chatPopupGray,
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: screenWidth.width85
  },
  centerRowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jSpaceBetween: {
    justifyContent: 'space-between',
    width: '100%'
  },
  messageCountView: {
    minWidth: 20,
    maxWidth: 100,
    height: 20,
    backgroundColor: ColorSet.defaultTheme,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  messageCount: {
    fontSize: 12,
    color: ColorSet.white,
  },
  noMessageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessageIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  noMessageText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: ColorSet.dimGray,
  },
  mainView: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  skeletonContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: screenWidth.width85,
    margin: 10,
  },
  userIconShimmer: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    borderRadius: 22,
    alignItems: 'center',
  },
  titleShimmer: {
    width: screenWidth.width65,
    height: 15,
    marginBottom: 6,
    marginLeft: 10,
  },
  messageShimmer: {
    width: screenWidth.width65,
    height: 15,
    marginLeft: 10,
  },
  countShimmer: {
    width: 25,
    height: 25,
    borderRadius: 10,
    marginLeft: 10,
  },

  //Request tab styling starts from here

  requestsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: ColorSet.chatPopupGray,
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: screenWidth.width85
  },
  dotIconForNewRequests: {
    width: 8,
    height: 8,
    resizeMode: 'contain',
    marginTop: 5,
    marginRight: 10
  },

})
