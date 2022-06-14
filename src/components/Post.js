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
import moment from 'moment'
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
  setCurrentReportPost,
  handleModalOpen,
  
}) {
  return (
    <View style={styles.PostView}>
      <PostHeader
        userName={userName}
        location={location}
        addressResult={addressResult}
        profileImage={profileImage}
        moreStyles={{
          marginBottom: 8,
          marginTop: 16,
        }}
        setCurrentReportPost={setCurrentReportPost}
        handleModalOpen={handleModalOpen}
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
      />
    </View>
  )
}

export function PostModal({ post, onPressSend, setComment, duration }) {
  const dispatch = useDispatch()
  if (post === null || post === undefined) {
    return null
  }
  const [description, setDescription] = useState(null)
  const [buttonActive, setButtonActive] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const handleButtonActive = () => {
    // if (description === null || description === '') {
    //   setButtonActive(false);
    // } else {
    //   setButtonActive(true);
    // }
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
        <PostTiming post={post} duration={duration} />

        <PostFooter
          startDateTime={post.startDateTime}
          endDateTime={post.endDateTime}
          showJoinButton={false}
        />
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}>
          {post.screeningQuestion ? (
            <Text style={{ marginBottom: 10, fontWeight: '500', fontSize: 15 }}>
              {post.screeningQuestion}
            </Text>
          ) : null}
          <NormalTextField
            placeholder={
              post.screeningQuestion
                ? 'Response Required'
                : 'Break the ice with a comment'
            }
            moreStyles={{ marginBottom: 60 }}
            onChangeText={(text) => setComment(text)}
            autoFocus={false}
          />
          <NormalButton
            text={'Send Request'}
            onPress={onPressSend}
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
  setCurrentReportPost = null,
  handleModalOpen = null,
}) {
  return (
    <View
      style={{
        ...styles.PostHeaderView,
        flexDirection: 'row',
        ...moreStyles,


        justifyContent: 'space-between',
      //  backgroundColor: 'red'
      }}>
      <View style={{ flexDirection: 'row' }}>
        <PostProfileImage imageUrl={profileImage} />
        <View style={{ marginLeft: 10 , maxWidth: '85%' , backgroundColor: 'red'}}>
          <PostUserName userName={userName} />
          <PostLocation
            location={location}
            addressResult={addressResult}
            showJoinButton
          />
        </View>
      </View>

      <ExploreReport
        moreStyles={{}}
        setCurrentReportPost={setCurrentReportPost}
        handleModalOpen={handleModalOpen}
      />
    </View>
  )
}

function PostLocation({ location, addressResult }) {
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState(addressResult)

  // perfom expensive calculation once
  // useMemo(async () => {
  //   if (location === null || location === '' || location === undefined) {
  //     setAddress('No Location!')
  //     return
  //   }
  //   let { status } = await Location.requestForegroundPermissionsAsync()
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied')
  //     Alert.alert('Error', 'Permission to access location was denied')
  //     return
  //   }
  //   let addressResult = await Location.reverseGeocodeAsync(location.coords)

  //   setAddress(String(addressResult[0].name))
  //   setLoading(false)
  // }, [location.coords])

  return (
    <View style={styles.PostLocationView}>
      <SmallerText
        content={addressResult}
        moreStyles={{ marginBottom: -3, marginTop: -3 , marginRight: 80 }}
      />
    </View>
  )
}
function PostDescription({ description }) {
  return (
    <View style={styles.PostDescriptionView}>
      <SmallerText
        moreStyles={{ marginBottom: 8, marginTop: 4 , }}
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
      <LoadingScreen visible={loading} />
      <Image
        style={styles.postProfileImage}
        source={{ uri: imageUrl }}
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

function PostTiming({ post, duration }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
        }}>
        <Image
          style={{ marginRight: 5 }}
          source={require('../assets/images/assets/Clock.png')}
        />
        <Text>{`${moment
          .unix(post.startDateTime.seconds)
          .format('LT')} - ${moment
          .unix(post.endDateTime.seconds)
          .format('LT')}`}</Text>
      </View>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
        }}>
        <Image
          style={{ marginRight: 5 }}
          source={require('../assets/images/assets/flash.png')}
        />
        <Text>80%</Text>
      </View>

      <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ marginRight: 5 }}
          source={require('../assets/images/assets/MapPin.png')}
        />
        <Text>
          {duration > 20
            ? `${Math.round(duration)} mins drive`
            : `${Math.round(duration)} mins walk`}
        </Text>
      </View>
    </View>
  )
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
    // console.log(startDateTime , endDateTime , "end date time in posts");
    // startDateTime = new Date(startDateTime)
    // endDateTime = new Date(endDateTime)
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
        <View // View to hold clock image
        >
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

  const checkIfUserRequested = async () => {
    const user = await AsyncStorage.getItem('user')
    const userId = JSON.parse(user).id
    console.log('user id is', userId)

    if (usersWhoRequested.includes(userId)) {
      setisUserRequested(true)
      setMessage('Request Sent')
    } else {
      setisUserRequested(false)
      setMessage('Join')
    }
  }

  useEffect(() => {
    checkIfUserRequested()
  }, [])
  if (isUserRequested == true) {
    return (
      <View style={styles.PostJoinButtonView}>
        <NormalButton
          text={message}
          onPress={onPress}
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
    // ngoId : 113992437978529065350
    // ebuka egbunam : 101432345899135768743
    //ebuka egb:107841417840884772453
  } else {
    return (
      <View style={styles.PostJoinButtonView}>
        <NormalButton
          text={message}
          onPress={onPress}
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
}) {
  return (
    <View style={{ ...styles.PostFooterView, flexDirection: 'row' }}>
      <PostTime
        time="time test"
        startDateTime={startDateTime}
        endDateTime={endDateTime}
      />
      {showJoinButton && (
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
