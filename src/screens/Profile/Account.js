import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView} from 'react-native'
import { ColorSet, ImageSet, screenHeight, screenWidth } from "../../components/config/Constant"
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export default function Account() {
  const [user, setUser] = useState(null)
  const navigation = useNavigation();
  const _retriveUser = async () => {
    var currUser = await AsyncStorage.getItem('user')
    var currUser = JSON.parse(currUser)
    console.log(currUser)
    setUser(currUser)
  }
  useEffect(() => {
    _retriveUser()
  }, [])
  const goToProfile=()=>navigation.navigate('Profile')
  const menu=[
      {name:'My Hangouts',icon:'arrow'},
      {name:'Block List',icon:'arrow'},
      {name:'Community Guidelines',icon:'redirect'},
      {name:'Privacy Policy',icon:'redirect'},
      {name:'Settings',icon:'arrow'},
    
  ]
  const MenuOptions=(name,icon)=>{
      return(
      <TouchableOpacity style={styles.options}>
         <Text>{name}</Text>
         <Image style={styles.icon} source={ImageSet.ArrowRight} />
      </TouchableOpacity>
      )
  }
  const UserExists =()=>{
    return (
        <View>
          <TouchableOpacity style={styles.profileSection} onPress={goToProfile}>
            <Image style={styles.profileImage} source={{uri:user?.photoUrl}} />
             <View style={styles.profileIdentity}>
                <View>
                    <Text style={styles.name}>{user?.name}, 21</Text>
                    <Text style={styles.address}>Wells St, Chicago</Text>
                </View>
                <Image style={styles.icon} source={ImageSet.ArrowRight} />
              </View>
          </TouchableOpacity>
        </View>
      )
  }
const NoUser=()=>{
    return (
        <View
          style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#44BFBA" />
        </View>
      )
}

  return user ? (
    <UserExists />
  ) : (
    <NoUser />
  )


}

const styles = StyleSheet.create({
    profileSection:{
        backgroundColor: '#F6F6F6',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:20,
        borderRadius:8,
        marginBottom:10
    },
    profileIdentity:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },

    profileImage:{
     width:50,
     height:50,
     borderRadius:8
    },
    options:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:8
    }
})