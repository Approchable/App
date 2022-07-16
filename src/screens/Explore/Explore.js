import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SkeletonContent from 'react-native-skeleton-content'

import { RegularBoldText } from '../../components/Texts'
import { NormalButton } from '../../components/Buttons'
import EmptyCreatePost from '../../assets/images/assets/EmptyCreatePost.svg'
import SucessLogo from '../../assets/images/assets/SucessLogo.svg'
import { NavigateToCreate } from '../../store/actions'
import Post, { PostModal } from '../../components/Post'
import AppHeader from '../../components/Utility/AppHeader'
import MyStatusBar from '../../components/MyStatusBar'
import { sendJoinRequest } from '../../store/Requests/Requests'
import ReportModal from '../../components/ReportModal'
import { screenWidth } from '../../components/config/Constant'
import { getUserDataById } from './/..//..//..//firebase'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getPosts } from '../../store/posts/posts'

//GetPostsReducer
function Explore({ navigation }) {
  // var posts = useMemo(() => {
  //   return useSelector((state) => state.GetPostsReducer.posts)
  // }, [posts])
  //var posts = useSelector((state) => state.GetPostsReducer.posts)

  var posts = useSelector((state) => {
    var posts = state.GetPostsReducer.posts

    posts = posts.filter((post) => {
      return post.startDateTime.toDate() > new Date()
    })

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt
    })

    posts.map((post) => {
      console.log('Posts time ==>>', post.startDateTime.toDate() > new Date())
    })

    return posts
  })
  var loading = useSelector((state) => state.GetPostsReducer.loading)
  var error = useSelector((state) => state.GetPostsReducer.error)

  //sort post by timestamp

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

  const handleJoin = async (postObject) => {
    const newUserData = await getUserDataById(user.id)

    console.log('new User', newUserData)

    // check if post object is  updated
    if (newUserData.isProfileCompleted) {
      setModalVisible(true)
      setModalPost(postObject)
    } else {
      // show alert to users

      Alert.alert(
        "You can't join this post just yet!",
        'You need to complete your profile first',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('The profie completion flow was canceled')
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('ProfileFlow')
            },
          },
        ]
      )
    }
  }

  const _retriveUser = async () => {
    var currUser = await AsyncStorage.getItem('user')
    var currUser = JSON.parse(currUser)

    setUser(currUser)
  }

  useEffect(() => {
    _retriveUser()
  }, [])

  const handleCancel = () => {
    _getPosts()
    setModalVisible(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focsed on explore ')
      // _getPosts()
    })
    _retriveUser()
    _getPosts()
  }, [navigation])

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#F6F6F6" />
      <AppHeader moreStyles={{ height: 50 }} />
      <View style={{ flex: 1, borderRadius: 16 }}>
        {loading ? (
          <ExploreLoader loading={loading} />
        ) : (
          <>
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
                  onPress={async () => {
                    await handleJoin(item)
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
      </View>
    </View>
  )
}

export function NoPost({ navigation }) {
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
        }}>
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

export const JoinModal = ({ visible, postObject, onCancel }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const handleSendRequest = (post, comment = '') => {
    dispatch(sendJoinRequest(post, comment))
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
        }}>
        <ModalBarTop post={postObject} />

        <PostModal
          setComment={setComment}
          post={postObject}
          onPressSend={() => {
            handleSendRequest(postObject, comment)
          }}
        />
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalBG} />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export const ExploreLoader = (props) => {
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
      }}></View>
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
