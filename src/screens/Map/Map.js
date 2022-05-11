import React, {useState, useEffect, useRef} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import moment from 'moment';
import { getRegion } from '../../components/config/map';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,} from 'react-native';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

function Map() {
 
  const [sendButton,setSendButton]=useState(false)
  const [messageText,setMessageText]=useState(false)
   const [messages, setMessage] = useState([
     {id:1, message:"hi",latitude:"12222", longitude:"123345"},
     {id:2, message:"hi",latitude:"12222", longitude:"123345"},
     {id:3, message:"hi",latitude:"12222", longitude:"123345"}
   ]);
   const [userlocation,setUserLocation] =useState({})
   const map =useRef(null)
   const marker =useRef(null)
  useEffect(() => {
  getLocation()
  },[]);


  const getLocation = async () => {
 
     let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});

      setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
       } );



      //  map.animateToRegion(getRegion(location.coords.latitude, location.coords.longitude, 16000));
    }
  }


  const onChangeText=(messageText) => {
   if(messageText) {
    setMessageText(messageText)
    setSendButton(true)
   }
   else{
    setSendButton(false)
     console.log("please put a location")
   }
   
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
         onChangeText={messageText => onChangeText(messageText)}
          value={messageText}
        />
        <View style={{ ...styles.sendButton, ...(sendButton ? styles.sendButtonActive : {}) }}>
        
          <TouchableOpacity >
            <MaterialIcons name="search" size={32} color="#030E01" />
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        ref={map}
        style={styles.map}
        initialRegion={getRegion(48.860831, 2.341129, 160000)}
      >
        {messages.map((message, index) => {
          let { latitude, longitude, text, timestamp } = message;

          return (
            <Marker
              ref={marker}
              key={index}
              identifier={'marker_' + index}
              coordinate={{ latitude, longitude }}
            >
              <Callout>
                <View>
                  <Text>{text}</Text>
                  <Text style={{ 'color': '#999' }}>{moment(timestamp).fromNow()}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
    </View>
 
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  inputWrapper: {
    width: '100%',
    position: 'absolute',
    padding: 10,
    top: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT,
    left: 0,
    zIndex: 100
  },
  input: {
    height: 46,
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  sendButton: {
    position: 'absolute',
    top: 17,
    right: 20,
    opacity: 0.4
  },
  sendButtonActive: {
    opacity: 1
  }
});

export default Map;
