import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { NormalButton } from '../../components/Buttons'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import MyStatusBar from '../../components/MyStatusBar'

export default function Name({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  let { type } = route.params

  let { result, familyName, givenName } = route.params

  if (type === 'apple') {
    familyName = familyName || ''
    givenName = givenName || ''
  }
  const [firstname, setFirstName] = useState(givenName)
  const [lastName, setLastName] = useState(familyName)
  const [buttonActive, setButtonActive] = useState(false)

  const firstNameRef = useRef(null)
  // tells me how many renders i am having.. fix this later with useMemo

 
  useEffect(() => {
   console.log(firstname)
   // check if first name's lengh is greater than 1 
    if (firstname.length >= 1) {
      setButtonActive(true)
    }
    else {
      setButtonActive(false)
    }

  
  }, [firstname])
 
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              lineHeight: 36,
              fontFamily: 'Poppins_700Bold',
              fontWeight: '700',
              textAlign: 'left',
              marginVertical: 24,
            }}>
            What's your name?
          </Text>
          <FowardNormalTextField // firstname
            ref = {firstNameRef}
            value={firstname}
            placeholder="Add first Name(Required)"
            onChangeText={(text) => setFirstName(text)}
          />
          <FowardNormalTextField // lastname
            placeholder="Add last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View
          style={{
            ...styles.mainView,
            justifyContent: 'flex-end',
            marginVertical: 20,
          }}>
          <NormalButton // next button
            text="Next"
            onPress={() =>{

              if(buttonActive){


               
                navigation.navigate('Interests', {
                    result,
                    lastName,
                    firstname,
                  })
              }
              
            }
            
            }
            inActive={buttonActive}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  placeholderStyle: {},
  mainView: {
    flex: 1,

    marginHorizontal: 16,
  },
  textInputView: {
    marginVertical: 5,
  },
})

function NormalTextField({ placeholder, onChangeText, onDelete, value } , ref) {
  
  

  
  return (
    <View style={styles.textInputView}>
      <TextInput
        ref={ref}
        value={value}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        paddingStyle={styles.paddingStyle}
        onKeyPress={(e) => {
          e.nativeEvent.key === 'Backspace' ? null : null
        }}
      />
    </View>
  )
}

const FowardNormalTextField = React.forwardRef(NormalTextField) // forwardRef is used to access the ref of the component
