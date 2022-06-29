import {View,ImageBackground, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { HeaderText } from '../../../components/Texts';
import MyStatusBar from '../../../components/MyStatusBar';
import { AddPhotos } from './AddPhotos';
import { AddPronouns } from './AddPronouns';
import { AddEthnicity } from './AddEthnicity';
import { AddIceBreaker } from './AddIceBreaker';
import { useState, useEffect, useLayoutEffect  } from 'react';
import { set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {login} from '../../../store/auth/Auth';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { NormalButton } from '../../../components/Buttons';

const width = (Dimensions.get('window').width - 36) / 3.5;



export default function ProfileFlow({navigation}) {
  const dispatch = useDispatch(); 
  const isFocused = useIsFocused();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [pronounValue , setpronounValue] = useState(0)
  const [ethnicityValue , setEthnicityValue] = useState(0)
  const [finalStep, setFinalStep] = useState(false)

  const pronounsList = [
    { label: 'She/her', value: 'She/her' },
    { label: 'He/him', value: 'He/him' },
    { label: 'They/them', value: 'They/them' },
    { label: 'I prefer not to say', value: 'I prefer not to say' }
  ];
  const ethnicityList = [
    { label: 'American Indian', value: 'American Indian' },
    { label: 'Black / African Descent', value: 'Black / African Descent' },
    { label: 'East Asian', value: 'East Asian' },
    { label: 'Hispanic/Latino', value: 'Hispanic/Latino' },
    { label: 'Middle Eastern', value: 'Middle Eastern' },
    { label: 'Pacific Islander', value: 'Pacific Islander' },
    { label: 'South Asian', value: 'South Asian' },
    { label: 'I prefer not to say', value: 'I prefer not to say' }
  ];

  const _retriveUser = async () => {
    var currUser = await AsyncStorage.getItem('user');
    var currUser = JSON.parse(currUser);
    let temp = pronounsList.findIndex((x)=> {return x.label == currUser.pronouns});
    let temp2 = ethnicityList.findIndex((x)=> {return x.label == currUser.ethnicity});
    setpronounValue(temp)
    setEthnicityValue(temp2)
    setUser(currUser);
  };

  const setImages = (value) => {
    setUser({ ...user, profileImages: value })
  }
  const setPronouns = (value) => {
    setUser({ ...user, pronouns: value })
  }
  const setEthnicity = (value) => {
    setUser({ ...user, ethnicity: value })
  }

  const setIceBreaker = (value) => {
   let newUser = user;
   newUser["iceBreaker"] = value
   if(newUser.ethnicity !== null && newUser.iceBreaker !== null && newUser.interests !== null && newUser.pronouns !== null && newUser.profileImages.length > 0 ){
    newUser["isProfileCompleted"] = true
   }
  dispatch(login(newUser));
  navigation.navigate('Profile')
  }
 const backHandler = () => {
   let newStep = step - 1;
 setStep(newStep)
 }

 const nextHandler = () => {
  let newStep = step + 1;
setStep(newStep)
}

const cancelHandler = () => {
  navigation.navigate('Profile')
}


useEffect (() => {
  _retriveUser();
}, []);



  return (
    <SafeAreaView style={styles.container}>
    <MyStatusBar backgroundColor="black" />
    <ScrollView>
      <View style={{flex: '1', marginHorizontal: 16, marginTop: 10}}>
        
      {  
       user === null ?
      <Text>Loading...</Text>
      :
      <>
      <View style={{height:10}}></View> 
      {step === 1 ?  <AddPhotos user={user} backHandler={cancelHandler} nextHandler={nextHandler} actionHandler= {setImages}/> : null }
      {step === 2 ? <AddPronouns initialValue={pronounValue} radioProps={pronounsList}  user={user} backHandler={backHandler} nextHandler={nextHandler} actionHandler= {setPronouns}/> : null }
       {step === 3 ? <AddEthnicity initialValue={ethnicityValue} radioProps={ethnicityList}  user={user} backHandler={backHandler} nextHandler={nextHandler} actionHandler= {setEthnicity}/> : null }
       {step === 4 ? <AddIceBreaker user={user} backHandler={backHandler}  actionHandler= {setIceBreaker}/> : null }
      
      </>

      }
</View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  afterMargin: {
    marginBottom: 30
  },

});
