import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import { HeaderText } from '../Texts';

export function IceBreaker({user}) {

    const IceBreaker = [
        {
            title: "I am known for ...",
            value: "Passionate about music"
        },
        {
            title: "",
            value: "I love chatting about food!"
        },
        {
            title: "Never haver have I ever...",
            value: "Travelled out of the country"
        },
    ]
    return (
        <>     
        <HeaderText content="Ice Breaker" moreStyles={{fontSize: 18}} />

     { IceBreaker.map((item, index) => {
         return (
            <View key={index} style={styles.IceBreaker}>

            { item.title.length > 0 ? <Text style={styles.IceBreakerTitle}>{item.title}</Text> : null }
     
            <Text style={styles.IceBreakerText}>{item.value}</Text>
       
           </View>
         );
     }) 
     }

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
  