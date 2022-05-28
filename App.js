import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import RootNavigator from './src/navigation/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CategoryProvider } from './src/context/CategorieContext'
import { UserProvider } from './src/context/UserContext'
import { Provider } from 'react-redux'

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
