import {View,Text, ScrollView, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { HeaderText } from '../../../components/Texts';
import MyStatusBar from '../../../components/MyStatusBar';
import { AddPhotos } from './AddPhotos';
import { AddPronouns } from './AddPronouns';
import { AddEthnicity } from './AddEthnicity';
import { AddIceBreaker } from './AddIceBreaker';
import { useState } from 'react';
import { set } from 'firebase/database';

const width = (Dimensions.get('window').width - 36) / 3.5;



export default function ProfileFlow({navigation}) {

  const newData = {
    images: [],
    pronouns: "",
    ethnicity: "",
    iceBreaker: ""
  }
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(newData);

  const setImages = (value) => {
    setFormData({ ...formData, images: value })
  }
  const setPronouns = (value) => {
    setFormData({ ...formData, pronouns: value })
  }
  const setEthnicity = (value) => {
    setFormData({ ...formData, ethnicity: value })
  }

  const setIceBreaker = (value) => {
    console.log(value)
    setFormData({ ...formData, iceBreaker: value })
    console.log(formData)
  }
 const backHandler = () => {
   let newStep = step - 1;
 setStep(newStep)
 }

 const nextHandler = () => {
   console.log("hey")
  let newStep = step + 1;
setStep(newStep)
}

const finishHandler = () => {
  navigation.navigate('Profile')
}


  return (
    <SafeAreaView style={styles.container}>
    <MyStatusBar backgroundColor="black" />
    <ScrollView>
      <View style={{flex: '1', marginHorizontal: 16, marginTop: 10}}>
        
        <View style={{height:10}}></View>
      {step === 1 ?  <AddPhotos backHandler={finishHandler} nextHandler={nextHandler} actionHandler= {setImages}/> : null }
      {step === 2 ? <AddPronouns backHandler={backHandler} nextHandler={nextHandler} actionHandler= {setPronouns}/> : null }
       {step === 3 ? <AddEthnicity backHandler={backHandler} nextHandler={nextHandler} actionHandler= {setEthnicity}/> : null }
       {step === 4 ? <AddIceBreaker backHandler={backHandler}  finishHandler={finishHandler} actionHandler= {setIceBreaker}/> : null }
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
