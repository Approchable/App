import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { ImageSet, googleApiKey } from './config/Constant'

export default function LocationSearchBar({ onClickLocation, moreStyles }) {
  const [isSearching, setIsSearching] = useState(false)
  const [location, setLocation] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [addressText, setAddressText] = useState('')

  const ref = useRef()

  const getCurrentLocation = async () => {
    setLoadingLocation(true)
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      Alert.alert('Error', 'Permission to access location was denied')
      return
    }
    let locationResult = await Location.getCurrentPositionAsync({})
    console.log('location', locationResult)
    setLocation(locationResult)
    let addressResult = await Location.reverseGeocodeAsync(
      locationResult.coords
    )
    // console.log('addressResult', addressResult);
    const addressString = String(addressResult[0].name)
    setLoadingLocation(false)
    setAddressText(addressString)
    ref.current?.setAddressText(addressString)
  }

  const clearText = () => {
    setAddressText('')
    ref.current?.setAddressText('')
    setIsSearching(false)
  }

  useEffect(() => {
    // ref.current?.setAddressText('Location')
  }, [])

  return (
    <>
      {loadingLocation ? (
        <ActivityIndicator size="large" color="#44BFBA" />
      ) : (
        <View
          style={
            isSearching
              ? { ...styles.seraching, ...moreStyles }
              : { ...styles.notSeraching, ...moreStyles }
          }>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={(row) => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              const locationData = details.geometry.viewport.northeast ||
                details.geometry.location ||
                details.geometry.viewport.southwest || { lat: 0, lng: 0 }

              const location = {
                location: {
                  coords: {
                    latitude: locationData.lat,
                    longitude: locationData.lng,
                    accuracy: 0,
                    altitude: 0,
                    altitudeAccuracy: 0,
                    heading: 0,
                    speed: 0,
                  },
                  address: details.formatted_address || '',
                  vicinity: details.vicinity || '',
                  adressCompoenents: details.address_components || [],
                  placeId: details.place_id || '',
                },
              }

              setLocation(location.location)
              setIsSearching(false)
              onClickLocation(location)
            }}
            getDefaultValue={() => {
              return '' // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: googleApiKey,
              language: 'en', // language of the results
              components: 'country:us',
            }}
            styles={{
              description: {
                fontWeight: 'bold',
                color: '#44BFBA',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              textInput: {
                backgroundColor: 'white',
                height: 44,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ECEEF2',
                paddingLeft: 16,
                paddingVertical: 10,
                fontFamily: 'Poppins_400Regular',
                borderRightWidth: 0,
              },
            }}
            renderRightButton={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity // clear text
                    style={{
                      width: 44,
                      height: 44,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#ECEEF2',
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopRightRadius: 8,
                      marginLeft: -5,
                    }}
                    onPress={async () => {
                      console.log('Clearing text')
                      clearText()
                    }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={ImageSet.X}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity // get location
                    style={{
                      width: 44,
                      height: 44,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#ECEEF2',
                      borderLeftWidth: 0,
                      borderTopRightRadius: 8,
                      // borderRightWidth: 0,
                      marginLeft: -5,
                    }}
                    onPress={async () => {
                      console.log(
                        'Get current location and fill input field with it'
                      )
                      await getCurrentLocation()
                    }}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={ImageSet.location}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
            numberOfLines={3}
            textInputProps={{
              onChangeText: (text) => {
                // console.log(text)
                if (text.length > 2 && isSearching === false) {
                  setIsSearching(true)
                }
                if (text.length === 0 && isSearching === true) {
                  setIsSearching(false)
                }
              },
              onfocus: () => {
                console.log('onfocus')
              },
              onBlur: () => {
                setIsSearching(false)
              },
              numberOfLine: 3,
            }}
            //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
            }}
            // filterReverseGeocodingByTypes={[
            //   'locality',
            // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 60,
  },
  seraching: {
    height: 400,
  },
  notSeraching: {
    height: 44,
  },
})
