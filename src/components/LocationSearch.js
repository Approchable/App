import { View, Text, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import React from 'react'

export default function LocationSearchBar() {
  const googleApiKey = 'AIzaSyDNEZdKGtGmuL6jFRd4w4rK_JN1HeS4FYs'
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        // currentLocation={true}
        returnKeyType={'default'}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
        }}
        

        query={{
          key: googleApiKey,
          language: 'en',
          components: 'country:us',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 60,
  },
})
