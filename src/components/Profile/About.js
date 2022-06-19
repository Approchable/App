import { useEffect, useState } from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import { HeaderText } from '../Texts';

export function About({user}) {


    return (
        <>     
        { user.pronouns && user.ethnicity != null ? <HeaderText content="About Me" moreStyles={{fontSize: 18}} />  : null }

     { user.pronouns != null ?  <View style={styles.about}>
       <View style={{flex:0,justifyContent:'space-between',flexDirection:'row',alignItems: 'center'}}>
       <Image style={{marginRight:10}} source={require('../../assets/images/assets/arrow-line-up.png')} />
       <Text style={styles.aboutText}>Pronouns</Text>
       </View>
       <View>
       <Text style={styles.aboutText}>{ user.pronouns != null ? user.pronouns : null }</Text>
       </View>
      </View> : null }

     { user.ethnicity != null ? <View style={styles.about}>
       <View style={{flex:0,justifyContent:'space-between',flexDirection:'row',alignItems: 'center'}}>
       <Image style={{marginRight:10}} source={require('../../assets/images/assets/barbell.png')} />
       <Text style={styles.aboutText}>Ethnicity</Text>
       </View>
       <View>
       <Text style={styles.aboutText}>{ user.ethnicity != null ? user.ethnicity : null }</Text>
       </View>
      </View> : null }

        </>

    );
  }  

  const styles = StyleSheet.create({

    about: {
     padding: 20,
     width: '100%',
     backgroundColor: '#F6F6F6',
     borderRadius: 8,
     marginBottom: 10,
     flex: 0,
     justifyContent: 'space-between',
     flexDirection: "row",
     alignItems: 'center'
    },
    aboutText: {
      fontSize: 14,
      color: '#696969',
      fontWeight: "500"
    },

  });
  