import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { NormalButton } from '../../components/Buttons'
import { Dimensions } from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import MyStatusBar from '../../components/MyStatusBar'

const windowWidth = Dimensions.get('window').width
export default function HowItWorks({ navigation }) {
  // let [fontsLoaded] = useFonts({
  //   'Poppins_700Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  // });
  // console.log('fonts loaded', fontsLoaded);
  // if (!fontsLoaded){
  //   return (
  //     <View>
  //       <Text> Loading fonts...</Text>
  //     </View>
  //   );
  // }
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              lineHeight: 36,
              textAlign: 'left',
              marginVertical: 4,
              fontFamily: 'Poppins_700Bold',
            }}>
            Here's how it works
          </Text>

          <Text
            style={{
              color: '#696969',
              textAlign: 'left',
              fontWeight: 'normal',
              fontSize: 14,
              lineHeight: 24,
              fontFamily: 'Poppins_400Regular',
              marginBottom: 32,
            }}>
            Amet minim mollit non deserunt ullamco est si t aliqua dolor do amet
            sint.Velit officia consequat duis enim velit mollit.Exercitation
            veniam conseq
          </Text>
          <NormalButton
            text="Sign in with exsisting account"
            hollow={false}
            onPress={() => navigation.navigate('Name')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    marginBottom: 0,
    marginHorizontal: 16,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
})
