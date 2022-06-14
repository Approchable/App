import {Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { NormalButton } from '../../../components/Buttons';
import { HeaderText } from '../../../components/Texts';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useState } from 'react';
import { BackButton } from '../../../components/BackButton';



const width = (Dimensions.get('window').width - 36) / 3.5;

export function AddPronouns({backHandler, nextHandler, actionHandler}) {
    const [pronoun , setPronoun] = useState("She/her")
    const radioProps = [
        { label: 'She/her', value: 'She/her' },
        { label: 'He/him', value: 'He/him' },
        { label: 'They/them', value: 'They/them' },
        { label: 'I prefer not to say', value: 'I prefer not to say' }
      ];

      const saveAndProceed = () => {
        actionHandler(pronoun)
        nextHandler()
       }

  return (
    <>
    <View style={styles.container}>
        <View>
        <BackButton actionHandler={backHandler} /> 
        <HeaderText content="What are your pronouns?" moreStyles={{fontSize: 27}} />
        <View style={{height:10}}></View> 
    <View style={styles.pronounsRow}>
    <RadioForm
                  buttonColor="#ECEEF2"
                  buttonSize={15}
                  radioStyle={{paddingTop:25}}
                  selectedButtonColor="#44BFBA"
                  radio_props={radioProps}
                  initial={0}
                  animation={false}
                  onPress={(value) => {setPronoun(value)}}
                  labelStyle={{color:"#696969"}}
                />
    </View>
        </View>

        <View>
        <NormalButton
            text={'Next'}
            onPress={saveAndProceed}
            inActive={true}
            hollow={true}
            moreStyles={{
              marginBottom: 20,
            }}
          />
          <NormalButton
          text="Skip"
          onPress={nextHandler}
          inActive={true}
    
        />
        </View>
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
    justifyContent:'space-between',
    height:Dimensions.get('screen').height * 0.8,
  },

  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: "#696969",
    marginBottom: 10
  },
  pronounsRow:{
  flex: 0,
  flexDirection: 'column',
  justifyContent: "space-between",
  flexWrap: 'wrap'
  },

  pronounsCol: {
      flex: 0,
  width: "48%",
  height: Dimensions.get('screen').height * 0.18,
  backgroundColor: "#44bfba1a",
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: "center",
  marginBottom: 20
  },
  deletePhotos:{
  position: 'absolute',
  top:-10,
  right: -10,
  }

});

