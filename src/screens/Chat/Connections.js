import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { NormalButton } from '../../components/Buttons'
import { HeaderText } from '../../components/Texts'
import CategoryItem from '../../components/CategoryItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { getConnections, getConnectionUser, logout } from '../../store/actions'
import { NormalTextField } from '../../components/TextField'
import {
  ImageSet,
  Routes,
  screenWidth,
  ColorSet,
  TabType,
} from '../../components/config/Constant'
import AppHeader from '../../components/Utility/AppHeader'
import MyStatusBar from '../../components/MyStatusBar'
import Loader from '../../components/Loader'
import { getConnectionById, getUserRequests } from '../../../firebase'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { getRequests } from '../../store/Requests/Requests'
import moment from 'moment'
import { dateDifference } from '../../components/Utility/Helper'

const DataArray = [
  {
    name: 'Jane',
    lastMassage: 'Amet minim mollit non deser ull..',
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
  const requests = useSelector(
    (state) => state.getAllRequestsReducer.requests
  )
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
  const [isFetchedRequest, setIsFetchedRequest] = useState(true)
  const [connectionsArray, setConnectionsArray] = useState(DataArray)
  const [requestArray, setRequestsArray] = useState(requests)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getRequests()
      _getConnections()
      setTimeout(() => {
        setIsFetched(false)
      }, 2000)
    })
    return unsubscribe
  }, [])

  const _getConnections = async () => {
    dispatch(getConnections(conId))
  }

  const _getRequests = async () => {
    dispatch(getRequests())
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
      _getRequests()
      setIsFetchedRequest(true)
      setRequestTab(true)
      setConnectionTab(false)
      setRequestsArray(requests)
      setTimeout(() => {
        setIsFetchedRequest(false)
      }, 2000)
    }
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
          <Image style={styles.dotIcon} source={ImageSet.dot} />
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
                    <Image style={styles.userImage} source={ImageSet.profile} />
                    <View>
                      <Text style={styles.userName}>{item.name}</Text>
                      <View style={styles.lastMessageView}>
                        <Text numberOfLines={1} style={styles.lastMessageText}>
                          {item.lastMassage}
                        </Text>
                        <Text style={styles.time}>{'  ' + item.time}</Text>
                      </View>
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
              // console.log('time ====>>>> ', time);

              return (
                <SkeletonContent
                  key={index}
                  containerStyle={styles.skeletonContentStyle}
                  isLoading={isFetchedRequest}
                  isVisible={true}
                  animationType="pulse"
                  animationDirection="horizontalRight"
                  layout={[styles.userIconShimmer, { children: [styles.titleShimmer, styles.messageShimmer], }, styles.countShimmer]}>
                  <TouchableOpacity activeOpacity={0.5} style={styles.requestsView}>
                    {/* {item.lastMassage &&
                      <Image style={styles.dotIconForNewRequests} source={ImageSet.dot} />
                    } */}
                    <Image style={styles.userImage} source={{ uri: data.photoUrl }} />
                    <View>
                      <Text style={styles.userName}>{data.givenName}</Text>
                      <View style={styles.lastMessageView}>
                        <Text numberOfLines={1}
                          style={[
                            styles.lastMessageText,
                            { width: item.lastMassage ? screenWidth.width60 : screenWidth.width65, }
                          ]}>
                          {item.comments ? item.comments : data.givenName + ' ' + "is Approachable! start the chat."}
                        </Text>
                        <Text style={styles.time}>{'12h'}</Text>
                      </View>
                    </View>
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
      {/* <Loader isVisible={loading} /> */}
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
    width: screenWidth.width65,
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
  },
  connectionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderBottomColor: ColorSet.chatPopupGray,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  messageCountView: {
    width: 20,
    height: 20,
    backgroundColor: ColorSet.defaultTheme,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    borderBottomColor: ColorSet.chatPopupGray,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  dotIconForNewRequests: {
    width: 8,
    height: 8,
    resizeMode: 'contain',
    marginTop: 5,
    marginRight: 10
  },
})
