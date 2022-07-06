import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackButton } from '../../../components/BackButton'
import MyStatusBar from '../../../components/MyStatusBar'
import { HeaderText } from '../../../components/Texts'
import { getPostsFromFireStore } from '../../../../FirebaseFireStore'
import Post, { PostModal } from '../../../components/Post'
import { sendJoinRequest } from '../../../store/Requests/Requests'
import ReportModal from '../../../components/ReportModal'
import { ExploreLoader, JoinModal } from '../../Explore/Explore'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  ImageSet,
  Routes,
  screenWidth,
  ColorSet,
  TabType,
  RequestStatus,
} from '../../../components/config/Constant'
import SkeletonContent from 'react-native-skeleton-content'

export default function MyHangouts({ navigation }) {
  const [activeTab, setActiveTab] = useState(true)
  const [inActiveTab, setInActiveTab] = useState(false)

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="white" barStyle="dark-content" />
      <Header title={'My Hangouts'} navigation={navigation} />
      <TabHandler
        setInActiveTab={setInActiveTab}
        setActiveTab={setActiveTab}
        inActiveTab={inActiveTab}
        activeTab={activeTab}
      />
      <Posts active={activeTab} />
    </View>
  )
}

function Posts({ active }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [modalPost, setModalPost] = useState(null)
  const [currentReportPost, setCurrentReportPost] = useState(null)

  const handleModalOpen = () => {
    setReportModalVisible(true)
  }
  const onCancelReportModal = () => {
    setReportModalVisible(false)
  }

  const onRefresh = () => {
    setRefreshing(true)
    getPosts()

    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const handleJoin = (post) => {}

  const getPosts = async () => {
    setIsLoading(true)
    try {
      // get Current User
      var user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)

      const id = user.id
      // filter posts by user id
      const fetchedPosts = await getPostsFromFireStore()
      const filteredPosts = fetchedPosts.filter((post) => post.user.id === id)

      const oldPosts = filteredPosts.filter((post) => {
        const postDate = new Date(post.endDateTime.toDate())
        const currentDate = new Date()
        return postDate < currentDate
      })

      const currentPost = filteredPosts.filter((post) => {
        const postDate = new Date(post.endDateTime.toDate())
        const currentDate = new Date()
        return postDate > currentDate
      })


      if (active) {
        setPosts(currentPost)
      } else {
        setPosts(oldPosts)
      }

      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [active])
  return (
    <View style={{ flex: 1, borderRadius: 16 }}>
      {isLoading ? (
        <ExploreLoader loading={isLoading} />
      ) : (
       
        <>

        { 
            posts.length === 0 &&(
                <View style = {{ flex:1,justifyContent:"center" , alignItems: "center"}}>
                    <Text> No posts! Make a new Post</Text>
                </View>
            )
        }
      
          <FlatList
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              borderRadius: 16,
            }}
            data={posts}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            refreshing={isLoading}
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
  )
}

function Header({ navigation, title }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 8,
        marginHorizontal: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <BackButton
        actionHandler={() => {
          navigation.goBack()
        }}
        moreStyles={{
          marginTop: 10,
        }}
      />

      <HeaderText
        content={title}
        moreStyles={{
          marginLeft: 12,
          fontSize: 16,
          fontWeight: 'normal',
          lineHeight: 24,
        }}
      />
    </View>
  )
}

function TabHandler({ setActiveTab, setInActiveTab, activeTab, inActiveTab }) {
  const tabsChangingHandler = (tabType) => {
    if (tabType == TabType.active) {
      setActiveTab(true)
      setInActiveTab(false)
      setTimeout(() => {}, 2000)
    }
    if (tabType == TabType.inActive) {
      setInActiveTab(true)
      setActiveTab(false)

      setTimeout(() => {}, 2000)
    }
  }
  return (
    <View style={styles.tabView}>
      {/* Tab View */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.tabs,
          {
            borderColor: activeTab ? ColorSet.defaultTheme : ColorSet.dimGray,
            borderBottomWidth: activeTab ? 1.5 : 0,
          },
        ]}
        onPress={() => tabsChangingHandler(TabType.active)}>
        <Text
          style={[
            styles.tabsText,
            {
              color: activeTab ? ColorSet.defaultTheme : ColorSet.dimGray,
            },
          ]}>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.tabs,
          {
            borderColor: inActiveTab ? ColorSet.defaultTheme : ColorSet.dimGray,
            borderBottomWidth: inActiveTab ? 1.5 : 0,
          },
        ]}
        onPress={() => tabsChangingHandler(TabType.inActive)}>
        <Text
          style={[
            styles.tabsText,
            { color: inActiveTab ? ColorSet.defaultTheme : ColorSet.dimGray },
          ]}>
          Inactive
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
})
