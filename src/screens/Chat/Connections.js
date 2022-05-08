import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import { NormalButton } from '../../components/Buttons';
import { HeaderText } from '../../components/Texts';
import CategoryItem from '../../components/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { getConnections, getConnectionUser, logout } from '../../store/actions';
import { NormalTextField } from '../../components/TextField';
import { Routes } from '../../components/config/Constant';
import AppHeader from '../../components/Utility/AppHeader';
import MyStatusBar from '../../components/MyStatusBar';
import Loader from '../../components/Loader';
import { getConnectionById } from '../../../firebase';

const width = (Dimensions.get('window').width - 36) / 3.5;




export default function Connections({ navigation }) {
  const connections = useSelector(state => state.GetConnectionsReducer.connections);
  const connectedUser = useSelector(state => state.getConnectionUserReducer.connectedUser);
  const loading = useSelector(state => state.GetConnectionsReducer.loading);
  const [conId, setConId] = useState('conid_12345680');
  const [conId2, setConId2] = useState('101432345899135768743');

  const dispatch = useDispatch();



  const _getConnections = async () => {
    dispatch(getConnections(conId));
  }

  const onClickChatButton = async () => {
    _getConnections()
    console.log('conId ===>>>  ', conId);
    const connections = await getConnectionById(conId);
    if (connections) {
      console.log('connections new 1 ====>> ', connections);
      navigation.navigate(Routes.Chat, { data: connections })
    } else {
      console.log('connections new 2 ====>> ', connections);
    }
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
          value={conId}
          placeholder="enter id to connect"
          moreStyles={{ marginTop: -18 }}
          onChangeText={text => setConId(text)}
        />
      </View>
      <View>

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
      <Loader isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
