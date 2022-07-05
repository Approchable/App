import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import CreatePost1 from '../screens/Create/CreatePost1'
import Explore from '../screens/Explore/Explore'
import Map from '../screens/Map/Map'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Icons, Icon } from '../components/Utility/Icons'
import React, { useEffect, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import CreateStack from './CreateNavigator'
import AccountStack from './AccountNavigator'
import ChatStack from './ChatStackNavigation/ChatStackNavigator'
import Chat from '../screens/Chat/Chat'
import Connections from '../screens/Chat/Connections'

const TabArr = [
  {
    route: 'Explore',
    label: 'Explore',
    type: Icons.AntDesign,
    activeIcon: 'home',
    inActiveIcon: 'home',
    component: Explore,
  },
  {
    route: 'Map',
    label: 'Map',
    type: Icons.FontAwesome,
    activeIcon: 'map-pin',
    inActiveIcon: 'map-pin',
    component: Map,
  },
  {
    route: 'Create',
    label: 'Create',
    type: Icons.AntDesign,
    activeIcon: 'pluscircle',
    inActiveIcon: 'pluscircle',
    component: CreateStack,
  },
  {
    route: 'Connections',
    label: 'Connections',
    type: Icons.FontAwesome, //TODO: we need to replace the icon with actual in figma
    activeIcon: 'comments',
    inActiveIcon: 'comments',
    component: Connections,
  },
  {
    route: 'Account',
    label: 'Account',
    type: Icons.Octicons,
    activeIcon: 'person',
    inActiveIcon: 'person',
    component: AccountStack,
  },
]
const Tab = createMaterialBottomTabNavigator()

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      activeColor="#696969"
      inactiveColor="#D3D3D3"
      barStyle={{
        // height: 80,
        // marginHorizontal: 60,
        elevation: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 }, // change this for more shadow
        shadowOpacity: 0.4,
        shadowRadius: 0,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
      }}
      shifting={false}
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => {
          
          const { focused, color, size } = props
          // You can return any component that you like here!
          const item = TabArr.find((item) => item.route === route.name)
          return <TabButton {...props} item={item} />
        },

      })}>
      {TabArr.map((item, index, route) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            
            options={
              {
                // tabBarLabel: item.label,
                // tabBarIcon: (props) => <TabButton {...props} item={item} />,
                // make tabbar label vsisble on all labels
              }
            }
          />
        )
      })}
    </Tab.Navigator>
  )
}

const TabButton = (props) => {
  const { item, onPress } = props
  const focused = props.focused
  const viewRef = useRef(null)

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5 },
        1: { scale: 1.2 },
      })
    } else {
      viewRef.current.animate({
        0: { scale: 1.2 },
        1: { scale: 1 },
      })
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          //color={focused ?"#696969" : "#D3D3D3"}
          color={getColor(item.route, focused)}
        />
        {/* <Text> Hellp</Text> */}
      </Animatable.View>
    </TouchableOpacity>
  )
}

const getColor = (route, focused) => {
  if (route === 'Create') {
    return '#44BFBA'
  } else {
    return focused ? '#696969' : '#D3D3D3'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
