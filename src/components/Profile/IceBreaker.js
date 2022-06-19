import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import { HeaderText } from '../Texts';

export function IceBreaker({user}) {


    return (
        <>     
        <HeaderText content="Ice Breaker" moreStyles={{fontSize: 18}} />

            <View style={styles.IceBreaker}>

             <Text style={styles.IceBreakerTitle}>{ user.iceBreaker !== null ? user.iceBreaker.label : null}</Text> 
     
            <Text style={styles.IceBreakerText}>{ user.iceBreaker !== null ? user.iceBreaker.value : null}</Text>
       
           </View>

        </>

    );
  }  

  const styles = StyleSheet.create({

    IceBreaker: {
     padding: 20,
     width: '100%',
     backgroundColor: '#F6F6F6',
     borderRadius: 8,
     marginBottom: 10,
     flex: 0,
     justifyContent: 'center'
    },
    IceBreakerText: {
      fontSize: 14,
      color: '#696969',
      fontWeight: "500"
    },
    IceBreakerTitle: {
        fontSize: 14,
        color: '#44BFBA',
        fontWeight: "400",
        marginBottom: 15
      },

  });
  