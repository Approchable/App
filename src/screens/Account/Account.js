import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
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
  const communityGuidelinesUrl =  "https://www.approachable.ai/community-guidelines"
  const privacyPolicyUrl = "https://www.approachable.ai/privacy-policy"
  const goToProfile = () => navigation.navigate('Profile')
  const menu = [
    {
      name: 'My Hangouts',
      icon: 'arrow',
      onPress: () => navigation.navigate('MyHangouts'),
    },
    {
      name: 'Block List',
      icon: 'arrow',
      onPress: () => {
        null
      },
    },
    {
      name: 'Community Guidelines',
      icon: 'redirect',
      onPress: () => {
        openUrl(communityGuidelinesUrl)
      },
    },
    {
      name: 'Privacy Policy',
      icon: 'redirect',
      onPress: () => {
        openUrl(privacyPolicyUrl)
      },
    },
    {
      name: 'Settings',
      icon: 'arrow',
      onPress: () => {
        null
      },
    },
    {
      name: 'Logout',
      icon: 'arrow',
      onPress: () => {
        dispatch(logout())
      },
    },
  ]
  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url)
    if (isSupported) {
      await Linking.openURL(url)
    } else {
      Alert.alert('Error', 'Could not open url')
    }
  }
  function _deleteAccount() {
    console.log('deleting user')
    dispatch(logout())
  }
  const MenuOptions = ({ name, icon, func, onPress }) => {
    return (
      <TouchableOpacity style={styles.options} onPress={onPress}>
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
        <View style={{ flex: '1', marginHorizontal: 16, marginTop: 0 }}>
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
              {menu.map(({ name, icon, func, onPress }) => (
                <MenuOptions
                  name={name}
                  icon={icon}
                  func={func}
                  onPress={onPress}
                />
              ))}
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
    width: 90,
    height: 90,
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
