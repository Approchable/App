import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Profile from '../screens/Profile/Profile';
import CreatePost1 from '../screens/Create/CreatePost1';
import Explore from '../screens/Explore/Explore';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icons, Icon} from '../components/Utility/Icons';
import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import CreateStack from './CreateNavigator';
import ChatStack from './ChatStackNavigation/ChatStackNavigator'
import Chat from '../screens/Chat/Chat';
import Connections from '../screens/Chat/Connections';

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
    route: 'Create',
    label: 'Create',
    type: Icons.AntDesign,
    activeIcon: 'pluscircle',
    inActiveIcon: 'pluscircle',
    component: CreateStack,
  },
  // {
  //   route: 'Connections',
  //   label: 'Connections',
  //   type: Icons.FontAwesome, //TODO: we need to replace the icon with actual in figma
  //   activeIcon: 'comments',
  //   inActiveIcon: 'comments',
  //   component: Connections,
  // },
  {
    route: 'Profile',
    label: 'Profile',
    type: Icons.Octicons,
    activeIcon: 'person',
    inActiveIcon: 'person',
    component: Profile,
  },
];
const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      activeColor="#696969"
      inactiveColor="#D3D3D3"
      barStyle={{
        height: 70,
        // marginHorizontal: 60,
        elevation: 0,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0}, // change this for more shadow
        shadowOpacity: 0.4,
        shadowRadius: 0,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
      }}
      screenOptions={{
        headerShown: false,
      }}>
      
      {TabArr.map((item, index, route) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const TabButton = props => {
 
  const {item, onPress} = props;
  const focused = props.focused;
  const viewRef = useRef(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate({
          0: {scale: 0.5,},
          1: {scale: 1.2, },
        });
      } else {
        viewRef.current.animate({
          0: {scale: 1.2, },
          1: {scale: 1, },
        });
      }
    }, [focused]);

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
      </Animatable.View>
    </TouchableOpacity>
  );
};

const getColor = (route, focused) => {
 
  if (route === 'Create') {
    return '#44BFBA';
  } else {
    return focused ? '#696969' : '#D3D3D3';
  }
  return 'green';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});