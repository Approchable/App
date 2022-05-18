import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import RootNavigator from './src/navigation/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Sucess from './src/screens/Onboarding/Sucess'
import { CategoryProvider } from './src/context/CategorieContext'
import { UserContext, UserProvider } from './src/context/UserContext'
import { Provider, useSelector } from 'react-redux'
import AppHeader from './src/components/Utility/AppHeader'
import { store } from './src/store/index'

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <CategoryProvider>
          <SafeAreaProvider>
            <View style={{ ...styles.container }}>
              <RootNavigator />
            </View>
          </SafeAreaProvider>
        </CategoryProvider>
      </UserProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
