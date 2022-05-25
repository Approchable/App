import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Location from 'expo-location'
import { SmallerText } from './Texts'
import { Icon, Icons } from './Utility/Icons'
import { NormalButton } from './Buttons'
import { NormalTextField } from './TextField.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { getusersWhoRequested } from '../store/Requests/Requests'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ExploreReport } from './Report'
import { ImageSet } from '..//components//config//Constant'
var dayjs = require('dayjs')

export default function Post({
  userName,
  title,
  description,
  imageUrl,
  location,
  addressResult,
  profileImage,
  startDateTime,
  endDateTime,
  onPress,
  postId,
  usersWhoRequested,
  handleModalOpen,
  setCurrentReportPost,
  post,
}) {
  
  return (
    <View style={styles.PostView}>
      <PostHeader
        userName={userName}
        postId={postId}
        location={location}
        addressResult={addressResult}
        profileImage={profileImage}
        handleModalOpen={handleModalOpen}
        setCurrentReportPost={setCurrentReportPost}
        moreStyles={{
          marginBottom: 8,
          marginTop: 16,
        }}
      />
      {/* <PostUserName userName={userName} /> */}
      <PostTitle title={title} />
      <PostDescription description={description} />
      <PostImage imageUrl={imageUrl} />
      <PostFooter
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        onPress={onPress}
        showJoinButton={true}
        postId={postId}
        usersWhoRequested={usersWhoRequested}
        post={post}
      />
    </View>
  )
}

export function PostModal({ post, onPressSend, setComment }) {
  const dispatch = useDispatch()
  if (post === null || post === undefined) {
    return null
  }
  const [description, setDescription] = useState(null)
  const [buttonActive, setButtonActive] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const handleSendingRequest = () => {
    onPressSend(post)
  }
  const handleButtonActive = () => {
    setButtonActive(true)
  }
  useEffect(() => {
    handleButtonActive()
  }, [description])
  
  return (
    <KeyboardAwareScrollView extraHeight={60}>
      <View style={styles.PostView}>
        <PostHeader
          userName={post.user.name}
          location={post.location}
          addressResult={post.addressResult}
          profileImage={post.user.photoUrl}
          moreStyles={{
            marginBottom: 8,
            marginTop: 16,
          }}
        />
        <PostTitle title={post.headline} />
        <PostDescription description={post.description} />
        <PostImage imageUrl={post.imageUrl} />
        <PostFooter
          startDateTime={post.startDateTime}
          endDateTime={post.endDateTime}
          showJoinButton={false}
          post={post}
        />
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}>
          <NormalTextField
            placeholder="Break the ice with a comment"
            moreStyles={{ marginBottom: 60 }}
            onChangeText={(text) => setComment(text)}
            autoFocus={false}
          />
          <NormalButton
            text={'Send Request'}
            onPress={handleSendingRequest}
            inActive={buttonActive}
            hollow={true}
            moreStyles={{
              marginBottom: 60,
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

function PostHeader({
  userName,
  location,
  addressResult = 'No location',
  profileImage,
  moreStyles,
  handleModalOpen,
  setCurrentReportPost,
  postId,
}) {
  return (
    <KeyboardAwareScrollView extraHeight={100}>
      <View
        style={{
          ...styles.PostHeaderView,
          flexDirection: 'row',
          ...moreStyles,

          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <PostProfileImage imageUrl={profileImage} />
          <View style={{ marginLeft: 10 }}>
            <PostUserName userName={userName} />
            <PostLocation
              location={location}
              addressResult={addressResult}
              showJoinButton
            />
          </View>
        </View>

        <ExploreReport
          objectToReport={{ postId, userName }}
          handleModalOpen={handleModalOpen}
          setCurrentReportPost={setCurrentReportPost}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

function PostLocation({ location, addressResult }) {
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState(addressResult)

  // perfom expensive calculation once
  useMemo(async () => {
    if (location === null || location === '' || location === undefined) {
      setAddress('No Location!')
      return
    }
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      Alert.alert('Error', 'Permission to access location was denied')
      return
    }
    let addressResult = await Location.reverseGeocodeAsync(location.coords)
   
    setAddress(String(addressResult[0].name))
    setLoading(false)
  }, [location.coords])

  return (
    <View style={styles.PostLocationView}>
      <SmallerText
        content={address}
        moreStyles={{ marginBottom: -3, marginTop: -3 }}
      />
    </View>
  )
}
function PostDescription({ description }) {
  return (
    <View style={styles.PostDescriptionView}>
      <SmallerText
        moreStyles={{ marginBottom: 8, marginTop: 4 }}
        content={description}></SmallerText>
    </View>
  )
}
function PostTitle({ title }) {
  return (
    <View style={styles.PostTitleView}>
      <Text style={styles.PostTitleText}>{title}</Text>
    </View>
  )
}
function PostUserName({ userName }) {
  return (
    <View style={styles.PostUserNameView}>
      <Text style={styles.PostUserNameText}>@{userName}</Text>
    </View>
  )
}

function PostProfileImage({ imageUrl }) {
  const [loading, setLoading] = useState(true)

  return (
    <View style={styles.PostProfileImageView}>
     
      <Image
        style={styles.postProfileImage}
        source={{ uri: imageUrl }}
        defaultSource={ImageSet.profile}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  )
}

function PostImage({ imageUrl }) {
  // chnage image here to fast image from  https://github.com/DylanVann/react-native-fast-image for cahed and faster reloads
  const [loading, setLoading] = useState(true)
  if (imageUrl === null || imageUrl === '' || imageUrl === undefined) {
    return <></>
  } else {
    return (
      <View style={styles.PostImageView}>
        <LoadingScreen visible={loading} />
        <Image
          style={styles.PostImage}
          source={{ uri: imageUrl }}
          fadeDuration={300}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    )
  }
}

function LoadingScreen({ visible }) {
  return (
    visible === true && (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    )
  )
}

function PostTime({ startDateTime, endDateTime }) {
  if (
    startDateTime !== null ||
    startDateTime !== '' ||
    startDateTime !== undefined
  ) {
    startDateTime = dayjs(startDateTime.toDate())
  }

  if (endDateTime === null || endDateTime === '' || endDateTime === undefined) {
    endDateTime = dayjs(new Date())
  } else {
    endDateTime = dayjs(endDateTime.toDate())
  }

  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const formatDateToDayJs = dayjs(startDateTime)

  const [startRelativeTime, setStartRelativeTime] = useState(
    dayjs().to(formatDateToDayJs)
  )
  const [endRelativeTime, setEndRelativeTime] = useState(
    dayjs().to(formatDateToDayJs)
  )

  const [startTimeFormated, setStartTimeFormated] = useState('00:00')
  const [endTimeFormated, setEndTimeFormated] = useState('00:00')

  const [startTimeGreaterThanEndTime, setStartTimeGreaterThanEndTime] =
    useState(true)
  const getStartTime = () => {
    if (
      startDateTime === null ||
      startDateTime === '' ||
      startDateTime === undefined
    ) {
      setStartRelativeTime(dayjs().to(Date.now()))
      return
    }
    const startTime = dayjs(startDateTime)
    setStartRelativeTime(dayjs().to(startTime))
  }

  const formatTime = (time) => {
    if (time === undefined || time === null || time === '') {
      return null
    }
    var timeFormat = dayjs(time)
    return timeFormat.format('h:mm a')
  }
  const formatAllTimes = () => {
    setStartTimeFormated(formatTime(startDateTime))
    setEndTimeFormated(formatTime(endDateTime))
  }
  const isStartTimegreaterThanCurrentTime = () => {
    const startTime = dayjs(startDateTime)
    return dayjs().isAfter(startTime)
  }

  const getColor = (state) => {
    return true
  }
  useEffect(() => {
    getStartTime()
    setStartTimeGreaterThanEndTime(isStartTimegreaterThanCurrentTime())
    formatAllTimes()
  }, [])

  return (
    <View
      style={{
        ...styles.PostTimeView,
        height: 40,

        justifyContent: 'center',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Icon
            type={Icons.Entypo}
            name={'back-in-time'}
            color={startTimeGreaterThanEndTime == false ? '#F18D33' : '#696969'}
            size={24}
          />
        </View>
        <View style={{ justifyContent: 'center', marginLeft: 8 }}>
          <Text
            style={{
              ...styles.PostTimeText,
            }}>
            {startTimeFormated}
          </Text>
        </View>

        {startTimeGreaterThanEndTime == false && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ alignItems: 'center' }}> - </Text>
            <Text style={styles.PostTimeText}>{endTimeFormated}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

function PostJoinButton({ onPress, postId, usersWhoRequested }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isUserRequested, setisUserRequested] = useState(false)
  const [message, setMessage] = useState('')

  
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('user')
    return JSON.parse(user).id
  }

  const onclickJoin = (userWhoWantsToJoin) => {
    onPress()
    //usersWhoRequested.push(userWhoWantsToJoin)
  }
  const checkIfUserRequested = async () => {
    const user = await AsyncStorage.getItem('user')
    const userId = JSON.parse(user).id
   

    if (usersWhoRequested.includes(userId)) {
      setisUserRequested(true)
      setMessage('Request Sent')
    } else {
      setisUserRequested(false)
      setMessage('Join')
    }
  }

  useEffect(async() => {
    await checkIfUserRequested()
  }, [])
  if (isUserRequested == true) {
    return (
      <View style={styles.PostJoinButtonView}>
        <NormalButton
          text={message}
          onPress={() => null}
          moreStyles={{
            height: 36,
            paddingLeft: 25,
            paddingRight: 25,
            width: null,
          }}
          textStyles={{
            fontSize: 14,
            lineHeight: 24,
          }}
          buttonActive={false}
          hollow
          loading={isLoading}
          inActive={false}
        />
      </View>
    )
  } else {
    return (
      <View style={styles.PostJoinButtonView}>
        <NormalButton
          text={message}
          onPress={() => onclickJoin(getUserId())}
          moreStyles={{
            height: 36,
            paddingLeft: 25,
            paddingRight: 25,
            width: 96,
          }}
          textStyles={{
            fontSize: 14,
            lineHeight: 24,
          }}
          buttonActive={true}
          hollow
          loading={isLoading}
        />
      </View>
    )
  }
}

function PostFooter({
  startDateTime,
  endDateTime,
  onPress,
  showJoinButton,
  postId,
  usersWhoRequested,
  post,
}) {
  const [currUser, setCurrUser] = useState(null)
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('user')
    return JSON.parse(user).id
  }
  const userCreatedPost = async () => {
    const userId = await getUserId()
    setCurrUser(userId)
    return userId == post.user.id
  }
  const shouldShowJoinButton =  () => {
    if (currUser == null) {
      return true
    }
    const sameUser = () => {
      return currUser == post.user.id
    }
   

    if (sameUser()) {
      return false
    }
    if(showJoinButton){
      return true
    }
    return false 
  }
  useEffect(async () => {
    await userCreatedPost()
  }, [])
  return (
    <View style={{ ...styles.PostFooterView, flexDirection: 'row' }}>
      <PostTime
        time="time test"
        startDateTime={startDateTime}
        endDateTime={endDateTime}
      />
      {shouldShowJoinButton() && (
        <PostJoinButton
          onPress={onPress}
          postId={postId}
          usersWhoRequested={usersWhoRequested}
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  PostView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
  },
  PostUserNameText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#030E01',
  },
  PostUserNameView: {},
  PostTitleView: {},
  PostTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#030E01',
  },
  PostDescriptionView: {},
  PostDescriptionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#030E01',
  },
  PostProfileImageView: {},
  PostImage: {
    height: 200,
    width: '100%',
    borderRadius: 12,
  },
  postProfileImage: {
    height: 52,
    width: 52,
    borderRadius: 25.5,
    borderWidth: 0,
  },
  PostImageView: {},
  PostFooterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
})
