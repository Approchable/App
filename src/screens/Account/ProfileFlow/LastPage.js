import {Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { NormalButton } from '../../../components/Buttons';
import { HeaderText } from '../../../components/Texts';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useState } from 'react';
import { BackButton } from '../../../components/BackButton';



const width = (Dimensions.get('window').width - 36) / 3.5;

export function LastPage({initialValue, radioProps, backHandler, nextHandler, actionHandler}) {


      const saveAndProceed = () => {

        nextHandler()
       }

  return (
    <>
    <View style={styles.container}>

        <NormalButton
            text={'Finish'}
            onPress={saveAndProceed}
            inActive={true}
            hollow={true}
            moreStyles={{
              marginBottom: 20,
            }}
          />

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

