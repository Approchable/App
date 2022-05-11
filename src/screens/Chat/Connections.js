import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
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
import { getConnectionById } from '../../../firebase'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'

const dataArray = [
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

export default function Connections({ navigation }) {
  const connections = useSelector(
    (state) => state.GetConnectionsReducer.connections
  )
  const connectedUser = useSelector(
    (state) => state.getConnectionUserReducer.connectedUser
  )
  const loading = useSelector((state) => state.GetConnectionsReducer.loading)
  const [conId, setConId] = useState('conid_12345680')
  const [conId2, setConId2] = useState('101432345899135768743')
  const [connectionTab, setConnectionTab] = useState(true)
  const [requestTab, setRequestTab] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [connectionsArray, setConnectionsArray] = useState(dataArray)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        setIsFetched(true)
      }, 3000)
      //_getConnections()
    })
    return unsubscribe
  }, [])

  const _getConnections = async () => {
    dispatch(getConnections(conId))
  }

  const onClickChatButton = async () => {
    _getConnections()
    console.log('conId ===>>>  ', conId)
    const connections = await getConnectionById(conId)
    if (connections) {
      console.log('connections new 1 ====>> ', connections)
      navigation.navigate(Routes.Chat, { data: connections })
    } else {
      console.log('connections new 2 ====>> ', connections)
    }
  }

  const tabsChangingHandler = (tabType) => {
    if (tabType == TabType.connections) {
      setConnectionTab(true)
      setRequestTab(false)
    }
    if (tabType == TabType.requests) {
      setRequestTab(true)
      setConnectionTab(false)
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
          style={[
            styles.tabs,
            {
              borderColor: connectionTab
                ? ColorSet.defaultTheme
                : ColorSet.textBlack,
            },
          ]}
          onPress={() => tabsChangingHandler(TabType.connections)}
        >
          <Text
            style={[
              styles.tabsText,
              {
                color: connectionTab
                  ? ColorSet.defaultTheme
                  : ColorSet.textBlack,
              },
            ]}
          >
            Connections
          </Text>
          <Image style={styles.dotIcon} source={ImageSet.dot} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabs,
            {
              borderColor: requestTab
                ? ColorSet.defaultTheme
                : ColorSet.textBlack,
            },
          ]}
          onPress={() => tabsChangingHandler(TabType.requests)}
        >
          <Text
            style={[
              styles.tabsText,
              {
                color: requestTab ? ColorSet.defaultTheme : ColorSet.textBlack,
              },
            ]}
          >
            Requests
          </Text>
          <Image style={styles.dotIcon} source={ImageSet.dot} />
        </TouchableOpacity>
      </View>
      {connectionTab ? (
        connectionsArray.length > 0 ? (
          <View
            style={{
              flex: 1,
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            {connectionsArray.map((item, index) => {
              return (
                <SkeletonContent
                  key={index}
                  containerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 65,
                    width: screenWidth.width85,
                    margin: 10,
                  }}
                  isLoading={!isFetched}
                  isVisible={true}
                  animationType="pulse"
                  animationDirection="horizontalRight"
                  layout={[
                    // long line
                    {
                      width: 44,
                      height: 44,
                      resizeMode: 'contain',
                      borderRadius: 22,
                      alignItems: 'center',
                      // marginBottom: 10,
                    },
                    {
                      children: [
                        {
                          width: screenWidth.width65,
                          height: 20,
                          marginBottom: 6,
                          marginLeft: 10,
                        },
                        {
                          width: screenWidth.width65,
                          height: 20,
                          marginLeft: 10,
                        },
                      ],
                    },
                    {
                      width: 25,
                      height: 25,
                      borderRadius: 10,
                      marginLeft: 10,
                    },
                  ]}
                >
                  <TouchableOpacity key={index} style={styles.connectionsView}>
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
      {requestTab ? <View></View> : null}
      <View></View>
      <Loader isVisible={loading} />
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
    // marginRight: 15,
    // backgroundColor: ColorSet.chatRightPopupGray
  },
  textInput: {
    width: screenWidth.width65,
    // backgroundColor: ColorSet.lightGray,
    height: 40,
  },

  filterIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    // backgroundColor: ColorSet.chatRightPopupGray
  },
  tabView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
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
  },
  connectionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
})
