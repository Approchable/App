import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
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
const CategorieArr = [
  'Self development',
  'Creativity',
  'Music',
  'Sports',
  ' Games',
];
const width = (Dimensions.get('window').width - 36) / 3.5;
export default function Profile() {
  var [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const _retriveUser = async () => {
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
  }, []);

  return user ? (
    <UserExists user={user} deleteUser={_deleteAccount} />
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

function UserExists({user, deleteUser}) {
  return (
    <SafeAreaView style={styles.container}>
    <MyStatusBar backgroundColor="white" />
    <AppHeader moreStyles={{height: 50 }} />
      <View style={{flex: '1', marginHorizontal: 16, marginTop: 10}}>
        <HeaderText content={user.name} moreStyles={{fontSize: 27}} />
        <HeaderText content="Interests" moreStyles={{fontSize: 18}} />
        <View style={{flexWrap: 'wrap', flexDirection: 'row', marginLeft: -5}}>
          {user.interests.map((person, index) => (
            <CategoryItem
              content={person}
              width={width}
              onPress={() => null}
              moreStyles={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 50,
                margin: 5,
                width: null,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#E5E5E5',
              }}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          ...styles.mainView,
          justifyContent: 'flex-end',
          marginVertical: 20,
          marginHorizontal: 16,
        }}>
        <NormalButton
          text="Delete Account"
          onPress={() => deleteUser()}
          inActive={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
