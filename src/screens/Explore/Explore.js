import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {RegularBoldText} from '../../components/Texts';
import {NormalButton} from '../../components/Buttons';
import EmptyCreatePost from '../../assets/images/assets/EmptyCreatePost.svg';
import {useDispatch} from 'react-redux';
import SucessLogo from '../../assets/images/assets/SucessLogo.svg';
import {NavigateToCreate} from '../../store/actions';
import Post from '../../components/Utility/Post';
import AppHeader from '../../components/Utility/AppHeader';
import {useSelector} from 'react-redux';
import {getPosts} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStatusBar from '../../components/MyStatusBar';
//GetPostsReducer
function Explore() {
  var posts = useSelector(state => state.GetPostsReducer.posts);
  var loading = useSelector(state => state.GetPostsReducer.loading);
  var error = useSelector(state => state.GetPostsReducer.error);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    _getPosts();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const dispatch = useDispatch();

  console.log('===========================');
  console.log('loading', loading, 'error', error);

  const [user, setUser] = useState(null);

  const _getPosts = async () => {
    dispatch(getPosts());
  };

  useEffect(() => {
    _getPosts();
    console.log(posts);
  }, []);

  const postCount = 0;
  const Postdata = {
    userName: 'Linda',
    title: "Linda's Hangout",
    description:
      'I’m at Nick’s Pub for happy hour, and would love to make some new friends while i’m here. Open to going anywhere nearby.',
  };
  if (loading == true) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    );
  } else if (posts.length > 0 && loading == false) {
    return (
      <View style={styles.container}>
        {/* <MyStatusBar backgroundColor="white" />
        <AppHeader moreStyles={{flex: 0.1}} /> */}
        <MyStatusBar backgroundColor="#F6F6F6" />
        <AppHeader moreStyles={{flex: 0.1}} />
        <View style={{flex : 1 , borderRadius: 16 ,}}>
          <FlatList
          style = {{
            marginTop: 0,
            backgroundColor: "white",
            borderRadius: 16,
          }}
            data={posts}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
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
                onPress={() => {
                  console.log('Pressing a post');
                }}
              />
            )}
          />
        </View>
      </View>
    );
  } else {
    return <NoPost />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});
export default Explore;

function NoPost() {
  const dispatch = useDispatch();

  const postCount = 0;

  const NavigateToCreateInExplore = () => {
    dispatch(NavigateToCreate());
  };

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
      <View style={{flex: 0.8}}>
        <RegularBoldText
          content="No hangouts yet? Be the first to post!"
          moreStyles={{textAlign: 'center'}}
        />

        <View style={{flex: 0.3, marginHorizontal: 60, marginTop: -15}}>
          <NormalButton
            hollow={false}
            text="Create Hangout"
            onPress={() => NavigateToCreateInExplore()}
            inActive={true}
          />
        </View>
      </View>
    </View>
  );
}
