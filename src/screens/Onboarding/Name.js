import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import {NormalButton} from '../../components/Buttons';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import MyStatusBar from '../../components/MyStatusBar';

export default function Name({route, navigation}) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  let {type} = route.params;

  let {result, familyName, givenName} = route.params;

  if (type === 'apple') {
    familyName = familyName || '';
    givenName = givenName || '';
  }
  const [firstname, setFirstName] = useState(givenName);
  const [lastName, setLastName] = useState(familyName);
  const [buttonActive, setButtonActive] = useState(false);
  // tells me how many renders i am having.. fix this later with useMemo

  console.log(result);
  function checkTextInputs() {
    console.log('firstname lenght', firstname.length);
    if (firstname.length <= 1) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  }
  useEffect(() => {
    updateFirstNameandCheckTextInputs(givenName);
    updateLastNameandCheckTextInputs(familyName);
  }, []);
  function updateFirstNameandCheckTextInputs(name) {
    givenName = name;
    setFirstName(prev => {
      prev = name;

      console.log(name);
      console.log(firstname);
      checkTextInputs();
    });
    setFirstName(name);
  }
  function updateLastNameandCheckTextInputs(name) {
    familyName = name;

    setLastName(name);
    // checkTextInputs();
  }
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Text
            style={{
              ...HeadingStyle,
              fontFamily: 'Poppins_700Bold',
              fontWeight: '700',
              textAlign: 'left',
              marginVertical: 24,
            }}>
            What's your name?
          </Text>
          <NormalTextField
            value={firstname}
            placeholder="Add first Name(Required)"
            onChangeText={text => updateFirstNameandCheckTextInputs(text)}
            onDelete={() => console.log('deletikkkdfng')}
          />
          <NormalTextField
            placeholder="Add last Name"
            value={lastName}
            onChangeText={text => updateLastNameandCheckTextInputs(text)}
          />
        </View>

        <View
          style={{
            ...styles.mainView,
            justifyContent: 'flex-end',
            marginVertical: 20,
          }}>
          <NormalButton
            text="Next"
            onPress={() =>
              buttonActive
                ? navigation.navigate('Interests', {
                    result,
                    lastName,
                    firstname,
                  })
                : null
            }
            inActive={buttonActive}
          />
        </View>
      </View>
    </SafeAreaView>
  );
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
});

function NormalTextField({placeholder, onChangeText, onDelete, value}) {
  var ref = useRef('null');
  return (
    <View style={styles.textInputView}>
      <TextInput
        ref={ref}
        value={value}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        paddingStyle={styles.paddingStyle}
        onKeyPress={e => {
          e.nativeEvent.key === 'Backspace' ? null : null;
        }}
      />
    </View>
  );
}
