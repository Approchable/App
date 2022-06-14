import {View, Text, StyleSheet, Dimensions, ImageBackground} from 'react-native';


export function ProfilePicture({user}) {
    return (
        <>     
      <ImageBackground imageStyle={{ borderRadius: 12}}  style={[styles.profilePicture,styles.afterMargin]} resizeMode="cover"  source={{ uri: "https://i.pinimg.com/474x/a3/ac/1e/a3ac1ed5abaedffd9947face7901e14c.jpg" }}>
        <View style={styles.profileDetails}>
         <Text style={styles.profileHeader}>{user.name}</Text>
         <Text style={styles.profileSub}>Wells St, Chicago</Text>
        </View>
        </ImageBackground>
        </>

    );
  }

  const styles = StyleSheet.create({

    profilePicture: {
     padding: '5%',
     width: '100%',
     height: Dimensions.get('screen').height * 0.3,
     borderRadius: 12,
     marginBottom: 30,
     flex: 0,
     justifyContent: 'flex-end'
    },
    afterMargin: {
      marginBottom: 30
    },
    profileDetails: {
      padding: '5%',
      backgroundColor: 'white',
      borderRadius: 8
    },
    profileHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: '#030E01',
    marginBottom: 10
    },
    profileSub: {
      fontSize: 14,
      color: '#989898'
    }
  });
  