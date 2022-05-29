import React, { useState, useEffect, useMemo } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { RegularBoldText } from '../../components/Texts'
import { NormalButton } from '../../components/Buttons'
import EmptyCreatePost from '../../assets/images/assets/EmptyCreatePost.svg'
import { useDispatch } from 'react-redux'
import SucessLogo from '../../assets/images/assets/SucessLogo.svg'
import { NavigateToCreate } from '../../store/actions'
import Post, { PostModal } from '../../components/Post'
import AppHeader from '../../components/Utility/AppHeader'
import { useSelector } from 'react-redux'
import { getPosts } from '../../store/posts/posts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyStatusBar from '../../components/MyStatusBar'
import { sendJoinRequest } from '../../store/Requests/Requests'
import * as Random from 'expo-random'
import uuid from 'react-native-uuid'
import ReportModal from '../../components/ReportModal'
import SkeletonContent from 'react-native-skeleton-content'
import LocationSearchBar from '../../components/LocationSearch'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {
  screenWidth,
} from '../../components/config/Constant'
//GetPostsReducer
function Explore({ navigation }) {

  // var posts = useMemo(() => {
  //   return useSelector((state) => state.GetPostsReducer.posts)
  // }, [posts])
   //var posts = useSelector((state) => state.GetPostsReducer.posts)

  var posts = useSelector((state) => state.GetPostsReducer.posts)
  var loading = useSelector((state) => state.GetPostsReducer.loading)
  var error = useSelector((state) => state.GetPostsReducer.error)

  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [modalPost, setModalPost] = useState(null)
  const [currentReportPost, setCurrentReportPost] = useState(null)
  const onRefresh = () => {
    setRefreshing(true)
    _getPosts()

    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  const handleModalOpen = () => {
    setReportModalVisible(true)
  }
  const onCancelReportModal = () => {
    setReportModalVisible(false)
  }
  const _getPosts = async () => {
    // dispatch fetch new post to properly update old posts
    dispatch(getPosts())
  }

  const handleJoin = (postObject) => {
    setModalVisible(true)
    setModalPost(postObject)
  }

  const handleCancel = () => {
    _getPosts()
    setModalVisible(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focsed on explore ')
      // _getPosts()
    })
    _getPosts()
  }, [navigation])

  return (
    <View style={styles.container}>
    <View style = {{ marginTop: 50}}>
    {/* <LocationSearchBar/> */}

    <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => {
          console.log('data', data)
          console.log('details', details)
        }}
        getDefaultValue={() => {
          return '' // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDNEZdKGtGmuL6jFRd4w4rK_JN1HeS4FYs',
          language: 'en', // language of the results
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
        }}
        // filterReverseGeocodingByTypes={[
        //   'locality',
        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200}
      />

    </View>
   
      {/* <MyStatusBar backgroundColor="#F6F6F6" />
      <AppHeader moreStyles={{ flex: 0.1 }} />
      <View style={{ flex: 1, borderRadius: 16 }}>
        {loading ? (
          <ExploreLoader loading={loading} />
        ) : (
         <>
        <LocationSearchBar/>
          <FlatList
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              borderRadius: 16,
            }}
            data={posts}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            refreshing={loading}
            renderItem={({ item }) => (
              <Post
                post={item}
                userName={item.user.name}
                title={item.headline}
                description={item.description}
                imageUrl={item.imageUrl}
                location={item.location}
                screeningQuestion={item.screeningQuestion || ''}
                startDateTime={item.startDateTime}
                endDateTime={item.endDateTime}
                addressResult={item.addressResult}
                profileImage={item.user.photoUrl}
                handleModalOpen={handleModalOpen}
                setCurrentReportPost={setCurrentReportPost}
                postId={item.postId}
                onPress={() => {
                  handleJoin(item)
                }}
                usersWhoRequested={item.usersWhoRequested}
              />
            )}
          />
          </>
        )}

          <JoinModal
            visible={modalVisible}
            onCancel={() => handleCancel()}
            postObject={modalPost}
          />
          <ReportModal
            currentReportPost={currentReportPost}
            visible={reportModalVisible}
            onCancel={onCancelReportModal}
          />
        </View> */}
      </View>
    )
}

function NoPost({ navigation }) {

  const NavigateToCreateInExplore = () => {
    navigation.navigate('Create')
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          //height: 300,
          marginTop: 90,
          marginHorizontal: 16,
          justifyContent: 'center',

          flex: 1,
          alignItems: 'center',
        }}
      >
        <EmptyCreatePost witdth="100%" />
      </View>
      <View style={{ flex: 0.8 }}>
        <RegularBoldText
          content="No hangouts yet? Be the first to post!"
          moreStyles={{ textAlign: 'center' }}
        />

        <View style={{ flex: 0.3, marginHorizontal: 60, marginTop: -15 }}>
          <NormalButton
            hollow={false}
            text="Create Hangout"
            onPress={() => NavigateToCreateInExplore()}
            inActive={true}
          />
        </View>
      </View>
    </View>
  )
}

 const JoinModal = ({ visible, postObject, onCancel }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const handleSendRequest = (post , comment="") => {
    dispatch(sendJoinRequest(post , comment))
     onCancel()
  }
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('user')
    return JSON.parse(user).id
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          ...styles.modal,
        }}
      >
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

const ExploreLoader = (props) => {
  const { loading } = props

  const itemArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  if (loading) {
    return (
      <ScrollView>
        {itemArr.map((item) => {
          return (
            <SkeletonContent
              key={item.id}
              containerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                width: screenWidth.width85,
                margin: 10,
              }}
              layout={[
                // long line
                {
                  width: 44,
                  height: 44,
                  resizeMode: 'contain',
                  borderRadius: 22,
                  alignItems: 'center',
                  // marginBottom: 10,
                  marginLeft: 15,
                },
                {
                  children: [
                    {
                      width: screenWidth.width80,
                      height: 40,
                      marginBottom: 6,
                      marginLeft: 10,
                      marginTop: 10,
                    },
                    {
                      width: screenWidth.width80,
                      height: 200,
                      marginLeft: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    },
                  ],
                },
              ]}
              isVisible={true}
              isLoading={true}
              animationType="pulse"
              animationDirection="horizontalRight"
            />
          )
        })}
      </ScrollView>
    )
  } else {
    return <></>
  }
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
export default Explore
