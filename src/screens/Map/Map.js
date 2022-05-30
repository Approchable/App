import React, { useEffect, useLayoutEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import { markers, mapDarkStyle, mapStandardStyle } from './mapData';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import JoinModal from '../../components/JoinModal';
import SkeletonContent from 'react-native-skeleton-content'
import MapLoader from '../../components/MapLoader';
import MapCard from '../../components/MapCard';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 156;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {

  const initialMapState = {
    markers  
  };
  const initialRegion = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.2,
    longitudeDelta: 0.1, 
  }

  const [state, setState] = React.useState(initialMapState);
  const [location, setLocation] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalPost, setModalPost] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [showMapCard, setShowMapCard] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [userRegion, setUserRegion] = React.useState(initialRegion)

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);


  const handleJoin = (postObject) => {
    setModalVisible(true)
    setModalPost(postObject)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          // const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              latitude: state.markers[index].location.coords.latitude,
              longitude: state.markers[index].location.coords.longitude,
              latitudeDelta: userRegion.latitudeDelta,
              longitudeDelta: userRegion.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

   console.log('scalex', scale)
    return { scale };
  });

  const onMarkerPress = (mapEventData, index) => {
    setCurrentIndex(index)
    setShowMapCard(true)
    setLoading(true)
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    setTimeout(() => {
      setLoading(false)
    }, 2000);
    

  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  useLayoutEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      setLocation(location);
      setUserRegion({...userRegion,latitude: location.coords.latitude, longitude: location.coords.longitude});
    })();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getLastKnownPositionAsync();
    setLocation(location);
  }

  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);


  return (

    <View style={styles.container}>

      {location === null ? <View style={styles.loader}><Text>Getting Location...</Text></View> : null}
      {userRegion.latitude === null ? <View style={styles.loader}><Text>Getting Location...</Text></View> :
      <View>
       <MapView ref={_map} style={styles.map} region={{ latitude: location != null ? location.coords.latitude : userRegion.latitude, longitude: location != null ? location.coords.longitude : userRegion.longitude, latitudeDelta: location != null ? 0.2 : 0.01, longitudeDelta: location != null ? 0.1 : 0.01 }}>
        {location != null ?
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
            <View style={[styles.markerWrap]}>
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'transparent',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/images/assets/position.json')}
              />
            </View>
          </Marker> : null}
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const activeMarker = {
            borderWidth:2,
            borderColor: "#44BFBA",
          };
          return (
            <Marker key={index} coordinate={{"latitude": marker.location.coords.latitude,"longitude": marker.location.coords.longitude}} onPress={(e) => onMarkerPress(e, index)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={{ position: "absolute", top: 0, right: 0, backgroundColor: "#F18D33", borderRadius: "12px", padding: 5, zIndex: 3, elevation: 3, marginTop: -10, marginRight: -30 }}>
                  <Text style={{ color: "white" }}>in {marker.timing}</Text>
                </Animated.View>
                <Animated.Image
                  source={{ uri: marker.user.photoUrl }}
                  style={[styles.marker, index=== currentIndex  ? activeMarker :null]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>)
        })}
      </MapView>


      <TouchableOpacity style={[styles.actionBox, styles.search]}>
        <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/assets/search.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBox, styles.filter]}>
        <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/assets/filter.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBox, styles.send]} onPress={getUserLocation}>
        <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/assets/send.png')} />
      </TouchableOpacity>


      <ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.placesContainer}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        
      >
     { showMapCard ?  state.markers.map((marker, index) => {
          return (
            
            <TouchableOpacity key={index} onPress={()=>{handleJoin(marker)}}>
            <View style={styles.places}>
            {loading ? 
            <MapLoader/> : 
            <MapCard marker={marker} />
               }
            </View>
            </TouchableOpacity>

          )
        }) : null }

      </ScrollView>
      <JoinModal
        visible={modalVisible}
        onCancel={() => handleCancel()}
        postObject={modalPost}
      />
    </View>
}
      </View>
     
  );
}


export default MapScreen;

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    opacity: 0.8,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    elevation: 50,
    zIndex: 50
  },
  container: {
    flex: 1,
  },
  actionBox: {
    right: width * 0.06,
    position: 'absolute',
    borderWidth: 1,
    borderColor: "#ECEEF2",
    borderRadius: 8,
    backgroundColor: "white",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  search: {
    top: height * 0.1,
  },
  filter: {
    top: height * 0.5,
  },
  send: {
    top: height * 0.58,
  },
  placesContainer: {
    top: height * 0.7,
    position: 'absolute',
    elevation: 10,
    paddingHorizontal: 10,
  },
  places: {
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  markerWrap: {
    position: 'relative',
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,

  },
  marker: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
 
  },
})