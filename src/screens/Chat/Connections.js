import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NormalButton } from '../../components/Buttons';
import React, { useState, useEffect } from 'react';
import { HeaderText } from '../../components/Texts';
import CategoryItem from '../../components/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { logout } from '../../store/actions';
import { NormalTextField } from '../../components/TextField';
import { Routes } from '../../components/config/Constant';
import AppHeader from '../../components/Utility/AppHeader';
import MyStatusBar from '../../components/MyStatusBar';

const width = (Dimensions.get('window').width - 36) / 3.5;

export default function Connections({ navigation }) {
  var [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  const onClickChatButton = async () => {
    console.log('LOG =====>>>> onClickChatButton handler is working properly');
    navigation.navigate(Routes.ChatRoom)
  };


  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      <AppHeader moreStyles={{ height: 50 }} />
      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <HeaderText content="Connections" moreStyles={{ fontSize: 24 }} />
      </View>
      <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
        <NormalTextField
          placeholder="enter id to connect"
          moreStyles={{ marginTop: -18 }}
        // onChangeText={text => setHeadline(text)}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginVertical: 20,
          paddingHorizontal: 20,
        }}>

        <NormalButton
          text="Chat"
          onPress={onClickChatButton}
          inActive={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
