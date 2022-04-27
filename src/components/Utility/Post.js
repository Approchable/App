import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {SmallerText} from '../Texts';
import {Icon, Icons} from './Icons';
import {NormalButton} from '../Buttons';

var dayjs = require('dayjs');

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
      />
    </View>
  );
}

function PostHeader({
  userName,
  location,
  addressResult = 'No location',
  profileImage,
  moreStyles,
}) {
  return (
    <View
      style={{...styles.PostHeaderView, flexDirection: 'row', ...moreStyles}}>
      <PostProfileImage imageUrl={profileImage} />
      <View style={{marginLeft: 10}}>
        <PostUserName userName={userName} />
        <PostLocation location={location} addressResult={addressResult} />
      </View>
    </View>
  );
}

function PostLocation({location, addressResult}) {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(addressResult);

  useEffect(() => {
    getLocationAndTurnToAdress();
  }, []);

  const getLocationAndTurnToAdress = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert('Error', 'Permission to access location was denied');
      return;
    }
    let addressResult = await Location.reverseGeocodeAsync(location.coords);
    // console.log('addressResult', addressResult);
    setAddress(String(addressResult[0].name));
    setLoading(false);
  };
  return (
    <View style={styles.PostLocationView}>
      <SmallerText
        content={addressResult}
        moreStyles={{marginBottom: -3, marginTop: -3}}
      />
    </View>
  );
}
function PostDescription({description}) {
  return (
    <View style={styles.PostDescriptionView}>
      <SmallerText
        style={styles.PostDescriptionText}
        content={description}></SmallerText>
    </View>
  );
}
function PostTitle({title}) {
  return (
    <View style={styles.PostTitleView}>
      <Text style={styles.PostTitleText}>{title}</Text>
    </View>
  );
}
function PostUserName({userName}) {
  return (
    <View style={styles.PostUserNameView}>
      <Text style={styles.PostUserNameText}>@{userName}</Text>
    </View>
  );
}

function PostProfileImage({imageUrl}) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.PostProfileImageView}>
      <LoadingScreen visible={loading} />
      <Image
        style={styles.postProfileImage}
        source={{uri: imageUrl}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

function PostImage({imageUrl}) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.PostImageView}>
      <LoadingScreen visible={loading} />
      <Image
        style={styles.PostImage}
        source={{uri: imageUrl}}
        fadeDuration={300}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

function LoadingScreen({visible}) {
  return (
    visible === true && (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    )
  );
}

function PostTime({startDateTime, endDateTime}) {
  console.log(startDateTime, endDateTime);
  var relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);
  const formatDateToDayJs = dayjs(startDateTime);

  const [startRelativeTime, setStartRelativeTime] = useState(
    dayjs().to(formatDateToDayJs),
  );
  const [endRelativeTime, setEndRelativeTime] = useState(
    dayjs().to(formatDateToDayJs),
  );

  const [startTimeFormated, setStartTimeFormated] = useState('00:00');
  const [endTimeFormated, setEndTimeFormated] = useState('00:00');

  const [startTimeGreaterThanEndTime, setStartTimeGreaterThanEndTime] =
    useState(true);
  const getStartTime = () => {
    const startTime = dayjs(startDateTime);
    setStartRelativeTime(dayjs().to(startTime));
  };

  const formatTime = time => {
    if (time === undefined || time === null || time === '') {
      return null;
    }
    var timeFormat = dayjs(time);
    return timeFormat.format('h:mm a');
  };
  const formatAllTimes = () => {
    setStartTimeFormated(formatTime(startDateTime));
    setEndTimeFormated(formatTime(endDateTime));
  };
  const isStartTimegreaterThanCurrentTime = () => {
    const startTime = dayjs(startDateTime);
    return dayjs().isAfter(startTime);
  };

  const getColor = state => {
    return true;
  };
  useEffect(() => {
    getStartTime();
    setStartTimeGreaterThanEndTime(isStartTimegreaterThanCurrentTime());
    formatAllTimes();
  }, []);

  return (
    <View
      style={{
        ...styles.PostTimeView,
        height: 40,

        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Icon
            type={Icons.Entypo}
            name={'back-in-time'}
            color={startTimeGreaterThanEndTime == false ? '#F18D33' : '#696969'}
            size={24}
          />
        </View>
        <View style={{justifyContent: 'center', marginLeft: 8}}>
          <Text
            style={{
              ...styles.PostTimeText,
            }}>
            {startTimeFormated}
          </Text>
        </View>

        {startTimeGreaterThanEndTime == false && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{alignItems: 'center'}}> - </Text>
            <Text style={styles.PostTimeText}>{endTimeFormated}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function PostJoinButton({onPress}) {
  return (
    <View style={styles.PostJoinButtonView}>
      <NormalButton
        text={'join'}
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
      />
    </View>
  );
}

function PostFooter({startDateTime, endDateTime, onPress}) {
  return (
    <View style={{...styles.PostFooterView, flexDirection: 'row'}}>
      <PostTime
        time="time test"
        startDateTime={startDateTime}
        endDateTime={endDateTime}
      />
      <PostJoinButton onPress={onPress} />
    </View>
  );
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
    fontFamily: 'Poppins',
  },
  PostUserNameView: {},
  PostTitleView: {},
  PostTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#030E01',
    fontFamily: 'Poppins',
  },
  PostDescriptionView: {},
  PostDescriptionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#030E01',
    fontFamily: 'Poppins',
  },
  PostProfileImageView: {},
  PostImage: {
    height: 200,
    width: '100%',
    borderRadius: 12,
  },
  postProfileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0,
  },
  PostImageView: {},
  PostFooterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
