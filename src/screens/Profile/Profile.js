import {

  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


import AppHeader from '../../components/Utility/AppHeader'
import { NormalButton } from '../../components/Buttons'
import { HeaderText } from '../../components/Texts'
import CategoryItem from '../../components/CategoryItem'
import MyStatusBar from '../../components/MyStatusBar'

import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions'


const CategorieArr = [
  'Self development',
  'Creativity',
  'Music',
  'Sports',
  ' Games',
]
const width = (Dimensions.get('window').width - 36) / 3.5
export default function Profile() {
  const [user, setUser] = useState(null)
 
  const dispatch = useDispatch()
  const _retriveUser = async () => {
    var currUser = await AsyncStorage.getItem('user')
    var currUser = JSON.parse(currUser)
    console.log(currUser)
    setUser(currUser)
  }
  const _deleteAccount = async () => {
    console.log('deleting user')
    dispatch(logout())
  }

  useEffect(() => {
    _retriveUser()
  }, [])

  return user ? (
    <UserExists user={user} deleteUser={_deleteAccount} />
  ) : (
    <NoUser />
  )
}

function NoUser() {
  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#44BFBA" />
    </View>
  )
}

function UserExists({ user, deleteUser }) {
  const [showProfile, setShowProfile] = useState(false)
  console.log(user.photoUrl)
  return (
    <SafeAreaView style={styles.container}>
     
      <MyStatusBar backgroundColor="white" />
      <AppHeader moreStyles={{ height: 50 }} />

      <View style={{ flex: '1', marginHorizontal: 16, marginTop: 10 }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{position:'relative'}}>
          <Image style={styles.profileImage} source={{uri:user.photoUrl}} />
          <View style={styles.profileIdentity}>
            <Text style={styles.name}>{user.name}, 21</Text>
            <Text style={styles.address}>Wells St, Chicago</Text>
          </View>
        </View>

   
        <View
          style={{
            ...styles.mainView,
            justifyContent: 'flex-end',
            marginVertical: 20,
          }}
        >
        <NormalButton
          text="Edit Profile"
          onPress={() => deleteUser()}
          inActive={true}
        />
      </View>
      <View  style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <HeaderText content="My interests" moreStyles={{ fontSize: 18 }} />
          <TouchableOpacity>
          <Text style={styles.AddButton}>
             Add
          </Text>
          </TouchableOpacity>
   
        </View>
        <View
          style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: -5 }}>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  AddButton:{
    fontFamily: 'Poppins',
fontStyle: 'normal',
fontWeight: '500',
fontSize: 16,
lineHeight: 24,
textAlign: 'center',
color: '#44BFBA'
  },
  profileImage:{
    width: '100%',
    height: 280,
    backgroundColor:'grey',
    borderRadius:8,
   
  },
  profileIdentity:{
    position:'absolute',
     backgroundColor:'white',
     bottom:30,
     width:'90%',
     marginLeft:'5%',
     padding:10,
     borderRadius:8,

  },
  name:{
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 32,
    color: '#030E01'
  },
  address:{
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#989898'
    
  }
})
