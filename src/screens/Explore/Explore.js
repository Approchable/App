import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { RegularBoldText } from '../../components/Texts'
import { NormalButton } from '../../components/Buttons'
import EmptyCreatePost from '../../assets/images/assets/EmptyCreatePost.svg'
import { useDispatch } from 'react-redux'
import SucessLogo from '../../assets/images/assets/SucessLogo.svg'
import { NavigateToCreate } from '../../store/actions'
import Post, { PostModal } from '../../components/Utility/Post'
import AppHeader from '../../components/Utility/AppHeader'
import { useSelector } from 'react-redux'
import { getPosts } from '../../store/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyStatusBar from '../../components/MyStatusBar'
import { sendJoinRequest } from '../../store/Requests/Requests'
import * as Random from 'expo-random'
import uuid from 'react-native-uuid'
import ReportModal from '../../components/ReportModal'
//GetPostsReducer
function Explore({ navigation }) {
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
    _getPosts()
  }, [])

  const postCount = 0
  const Postdata = {
    userName: 'Linda',
    title: "Linda's Hangout",
    description:
      'I’m at Nick’s Pub for happy hour, and would love to make some new friends while i’m here. Open to going anywhere nearby.',
  }
  if (loading == true) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}
      >
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    )
  } else if (posts.length > 0 && loading == false) {
    return (
      <View style={styles.container}>
        {/* <MyStatusBar backgroundColor="white" />
        <AppHeader moreStyles={{flex: 0.1}} /> */}
        <MyStatusBar backgroundColor="#F6F6F6" />
        <AppHeader moreStyles={{ flex: 0.1 }} />
        <View style={{ flex: 1, borderRadius: 16 }}>
          <FlatList
            style={{
              marginTop: 0,
              backgroundColor: 'white',
              borderRadius: 16,
            }}
            data={posts}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <Post
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
        </View>
      </View>
    )
  } else {
    return <NoPost navigation={navigation} />
  }
}

function NoPost({ navigation }) {
  const dispatch = useDispatch()

  const postCount = 0

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
  const handleSendRequest = (post) => {
    console.log('add join dispacth function here')
    dispatch(sendJoinRequest(post))
    onCancel()
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
          post={postObject}
          onPressSend={() => {
            handleSendRequest(postObject)
          }}
        />
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalBG} />
      </TouchableWithoutFeedback>
    </Modal>
  )
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
