import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { ImageSet } from '../../components/config/Constant'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import MyStatusBar from '../../components/MyStatusBar'
import AppHeader from '../../components/Utility/AppHeader'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions'
export default function Account() {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const _retriveUser = async () => {
    var currUser = await AsyncStorage.getItem('user')
    var currUser = JSON.parse(currUser)
    console.log(currUser)
    setUser(currUser)
  }
  useEffect(() => {
    _retriveUser()
  }, [])
  const goToProfile = () => navigation.navigate('Profile')
  const menu = [
    { name: 'My Hangouts', icon: 'arrow' },
    { name: 'Block List', icon: 'arrow' },
    { name: 'Community Guidelines', icon: 'redirect' },
    { name: 'Privacy Policy', icon: 'redirect' },
    { name: 'Settings', icon: 'arrow' },
    // { name: 'Logout', icon: 'arrow' },
  ]
  function _deleteAccount() {
    console.log('deleting user')
    dispatch(logout())
  }
  const MenuOptions = ({ name, icon, func }) => {
    return (
      <TouchableOpacity style={styles.options}>
        <Text style={styles.menuText}>{name}</Text>
        <Image
          source={icon == 'arrow' ? ImageSet.rightCaret : ImageSet.redirect}
        />
      </TouchableOpacity>
    )
  }
  const UserExists = () => {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#F6F6F6" />
        <AppHeader moreStyles={{ height: 50 }} />
        <View style={{ flex: '1', marginHorizontal: 16, marginTop: 10 }}>
          <TouchableOpacity style={styles.profileSection} onPress={goToProfile}>
            <Image
              style={styles.profileImage}
              source={{ uri: user?.photoUrl }}
            />
            <View style={styles.profileIdentity}>
              <View style={{ marginRight: 10 }}>
                <Text style={styles.name}>{user?.name}, 21</Text>
                <Text style={styles.address}>Wells St, Chicago</Text>
              </View>
              <Image
                style={{ width: 10, height: 18 }}
                source={ImageSet.rightCaret}
              />
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {menu.map(({ name, icon, func }) => (
                <MenuOptions name={name} icon={icon} func={func} />
              ))}
              <TouchableOpacity style={styles.options} onPress={_deleteAccount}>
                <Text style={styles.menuText}>Logout</Text>
                <Image source={ImageSet.rightCaret} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
  const NoUser = () => {
    return (
      <View
        style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#44BFBA" />
      </View>
    )
  }

  return user ? <UserExists /> : <NoUser />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileSection: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    marginVertical: 40,
  },
  profileIdentity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    width: '60%',
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 32,
    color: '#030E01',
  },
  address: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#989898',
  },
  menuText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#696969',
  },
})
