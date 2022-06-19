import {Text, View, ScrollView, StyleSheet, Dimensions, SafeAreaView,TouchableOpacity, Pressable} from 'react-native';
import AppHeader from '../../components/Utility/AppHeader';
import {NormalButton} from '../../components/Buttons';
import React, {useState, useEffect} from 'react';
import {HeaderText} from '../../components/Texts';
import CategoryItem from '../../components/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {logout} from '../../store/actions';
import MyStatusBar from '../../components/MyStatusBar';
import { Interests } from '../../components/Profile/Interests';
import { ProfilePicture } from '../../components/Profile/profilePicture';
import { About } from '../../components/Profile/About';
import { IceBreaker } from '../../components/Profile/IceBreaker';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';


const width = (Dimensions.get('window').width - 36) / 3.5;


export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const _retriveUser = async () => {
    console.log("getting ittt")
    var currUser = await AsyncStorage.getItem('user');
    var currUser = JSON.parse(currUser);
    console.log(currUser);
    setUser(currUser);
  };
  const _deleteAccount = async () => {
    console.log('deleting user');
    dispatch(logout());
  };

  useEffect(() => {
    _retriveUser();
  }, [isFocused]);


  return user ? (
    <UserExists navigation={navigation} user={user} deleteUser={_deleteAccount} />
  ) : (
    <NoUser />
  );
}

function NoUser() {
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#44BFBA" />
    </View>
  );
}

function UserExists({navigation, user, deleteUser}) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
   
    dispatch(logout());
  }

  
  return (
    <SafeAreaView style={styles.container}>
    <MyStatusBar backgroundColor="black" />
    <ScrollView>
    <AppHeader moreStyles={{height: 50 }} />
      <View style={{flex: '1', marginHorizontal: 16, marginTop: 10}}>
        <ProfilePicture user={user}/>
        <NormalButton
          text="Edit Profile"
          onPress={() => { navigation.navigate('ProfileFlow')}}
          inActive={true}
          style={styles.afterMargin}
        />
        <View style={{height:20}}></View>
        <About user={user}/> 
        <View style={{height:20}}></View>
        { user.iceBreaker ?  <IceBreaker user={user}/>  : null }
        <View style={{height:20}}></View>
        { user.interests ? <Interests user={user} width={width}/> : null }
      </View>

      <View
        style={{
          ...styles.mainView,
          justifyContent: 'flex-end',
          marginVertical: 20,
          marginHorizontal: 16,
        }}>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  afterMargin: {
    marginBottom: 30
  },

});
