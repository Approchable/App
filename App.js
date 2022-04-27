import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import LandingPage from './src/screens/Onboarding/LandingPage';
import NormalButton from './src/components/Buttons';
import Name from './src/screens/Onboarding/Name';
import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Sucess from './src/screens/Onboarding/Sucess';
import {CategoryProvider} from './src/context/CategorieContext';
import {UserContext, UserProvider} from './src/context/UserContext';
import {Provider, useSelector} from 'react-redux';
import AppHeader from './src/components/Utility/AppHeader';
import {store} from './src/store/index';
import Explore from './src/screens/Explore/Explore.js';



export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <CategoryProvider>
          <MyStatusBar backgroundColor="white" />
          <AppHeader moreStyles={{flex: 0.1}} />
          <SafeAreaProvider>
            <SafeAreaView style={{...styles.container, height: 40}}>
              <View style={{...styles.container}}>
                <RootNavigator />
                {/* <Explore /> */}
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </CategoryProvider>
      </UserProvider>
    </Provider>
  );
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  container: {
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
