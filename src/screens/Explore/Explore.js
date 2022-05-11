import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
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
import {
  ImageSet,
  Routes,
  screenWidth,
  ColorSet,
  TabType,
} from '../../components/config/Constant'

import Post, { PostModal } from '../../components/Post'
import AppHeader from '../../components/Utility/AppHeader'
import { useSelector } from 'react-redux'
import { getPosts } from '../../store/posts/posts'
import SkeletonContent from 'react-native-skeleton-content'
import MyStatusBar from '../../components/MyStatusBar'
import { sendJoinRequest } from '../../store/Requests/Requests'
import { useFocusEffect } from '@react-navigation/native'

//GetPostsReducer
function Explore({ navigation }) {
  var posts = useSelector((state) => state.GetPostsReducer.posts)
  var loading = useSelector((state) => state.GetPostsReducer.loading)
  var error = useSelector((state) => state.GetPostsReducer.error)
  //loading = true
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalPost, setModalPost] = useState(null)

  const onRefresh = () => {
    _getPosts()
  }
  const dispatch = useDispatch()

  const _getPosts = () => {
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
  }, [navigation])

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#F6F6F6" />
      <AppHeader moreStyles={{ flex: 0.1 }} />
      <View style={{ flex: 1, borderRadius: 16 }}>
        {loading ? (
          <ExploreLoader loading={loading} />
        ) : (
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
                postId={item.postId}
                onPress={() => {
                  handleJoin(item)
                }}
                usersWhoRequested={item.usersWhoRequested}
              />
            )}
          />
        )}

        <JoinModal
          visible={modalVisible}
          onCancel={() => handleCancel()}
          postObject={modalPost}
        />
      </View>
    </View>
  )
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
        }}>
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
