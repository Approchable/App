import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NormalButton} from '../../components/Buttons';
import React, {useState, useEffect} from 'react';
import {HeaderText, RegularBoldText} from '../../components/Texts';
import CategoryItem from '../../components/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {logout} from '../../store/actions';
import {NormalTextField} from '../../components/TextField';
import {
  ColorSet,
  ImageSet,
  Routes,
  screenWidth,
} from '../../components/config/Constant';
import MyStatusBar from '../../components/MyStatusBar';
// import { SafeAreaView } from 'react-native-safe-area-context';

const width = (Dimensions.get('window').width - 36) / 3.5;
export default function Chat({navigation}) {
  const [message, setMessage] = useState('');
  const [messageArray, setMessageArray] = useState([
    {
      isSender: true,
      message: 'Amet minim mollit non deserunt ull..?',
      time: '11:15',
      unRead: false,
      today: true,
    },
    {
      isSender: false,
      message: 'is something bothering you?',
      time: '11:15',
      unRead: false,
      today: false,
    },
    {
      isSender: false,
      message:
        'In general, everything is fine, but sometimes there is a feeling of anxiety I will try',
      time: '12:45',
      unRead: true,
      today: false,
    },
  ]);
  const [inputHeight, setInputHeight] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onClickSend = () => {
    let currentTime = getCurrentTime();
    if (message != '') {
      var newMessage = {
        isSender: true,
        message: message,
        time: currentTime,
        unRead: false,
        today: false,
      };
    }
    setMessageArray([...messageArray, newMessage]);
    setMessage('');
  };

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return hours + ':' + minutes;
  };

  const onBackButton = async () => {
    console.log('LOG =====>>>> onClickChatButton handler is working properly');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <MyStatusBar backgroundColor="white" />

      <View style={{flex: 1}}>
        <View style={[styles.topBar]}>
          <View style={[styles.center]}>
            <TouchableOpacity onPress={onBackButton}>
              <Image style={[styles.backButton]} source={ImageSet.back} />
            </TouchableOpacity>
            <Text style={[styles.regularText]}>Leslie</Text>
          </View>

          <View style={[styles.leftIcons]}>
            <TouchableOpacity //onPress={onBackButton}
            >
              <Image style={[styles.icon]} source={ImageSet.phone} />
            </TouchableOpacity>
            <TouchableOpacity //onPress={onBackButton}
            >
              <Image style={[styles.icon]} source={ImageSet.camera} />
            </TouchableOpacity>
            <TouchableOpacity //onPress={onBackButton}
            >
              <Image style={[styles.icon]} source={ImageSet.warning} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.chatSection]}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 10,
            }}>
            {messageArray.map((item, index) => {
              return (
                <View key={index}>
                  {item.today == true && (
                    <View style={[styles.centerJustify, {marginVertical: 5}]}>
                      <Text style={styles.dateLabelText}>Today</Text>
                    </View>
                  )}
                  {item.unRead == true && (
                    <View style={styles.unReadMessagesIndication}>
                      <View style={styles.border} />
                      <Text style={styles.dateLabelText}>Unread messages</Text>
                      <View style={styles.border} />
                    </View>
                  )}
                  {(item.isSender == true && (
                    <View style={styles.rightMessageView}>
                      <View style={styles.rightMessageText}>
                        <Text style={[styles.dateLabelText, {marginRight: 10}]}>
                          {item.time}
                        </Text>
                        <Text style={styles.messagesText}>{item.message}</Text>
                      </View>
                    </View>
                  )) || (
                    <View style={styles.leftMessageView}>
                      <View style={styles.leftMessageText}>
                        <Text style={styles.messagesText}>{item.message}</Text>
                        <Text style={[styles.dateLabelText, {marginLeft: 10}]}>
                          {item.time}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.bottomBar}>
          <View style={styles.inputView}>
            <TouchableOpacity style={styles.flexEnd}>
              <Image style={[styles.icon]} source={ImageSet.plus} />
            </TouchableOpacity>
            <TextInput
              value={message}
              multiline={true}
              onChangeText={text => setMessage(text)}
              // =====>>>>> when user type a message more then 1 line the height will increase as the user type more line
              onContentSizeChange={event => {
                setInputHeight(event.nativeEvent.contentSize.height);
              }}
              placeholder={'Start typing'}
              placeholderTextColor={ColorSet.gray}
              style={[
                styles.textInput,
                {
                  height: Math.max(25, inputHeight),
                  width:
                    (message == '' && screenWidth.width60) ||
                    screenWidth.width70,
                },
              ]}
            />
            {(message == '' && (
              <View style={styles.sendIconView}>
                <TouchableOpacity style={styles.flexEnd}>
                  <Image style={[styles.icon]} source={ImageSet.mic} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexEnd}>
                  <Image style={[styles.icon]} source={ImageSet.send} />
                </TouchableOpacity>
              </View>
            )) || (
              <TouchableOpacity
                onPress={() => onClickSend()}
                style={styles.flexEnd}>
                <Image style={[styles.icon]} source={ImageSet.send} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorSet.lightGray,
  },
  topBar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  centerJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth.width30,
  },
  regularText: {
    color: ColorSet.textBlack,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    marginLeft: 10,
  },
  backButton: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  chatSection: {
    flex: 1,
    backgroundColor: ColorSet.white,
  },
  textInput: {
    maxHeight: 100,
    paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  dateLabelText: {
    color: ColorSet.gray,
    fontSize: 10,
    lineHeight: 18,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    alignSelf: 'flex-end',
  },
  messagesText: {
    color: ColorSet.textBlack,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    minWidth: screenWidth.width30,
    maxWidth: screenWidth.width75,
  },
  rightMessageView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  rightMessageText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorSet.chatRightPopupGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    minWidth: screenWidth.width30,
    maxWidth: screenWidth.width90,
  },
  leftMessageView: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  leftMessageText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorSet.chatLeftPopupGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    minWidth: screenWidth.width30,
    maxWidth: screenWidth.width90,
  },
  border: {
    height: 1,
    backgroundColor: ColorSet.gray,
    width: screenWidth.width25,
  },
  unReadMessagesIndication: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  bottomBar: {
    marginVertical: 20,
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: ColorSet.white,
    width: screenWidth.width95 - 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sendIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth.width25,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
});
