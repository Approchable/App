import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export default function Center({ children }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </View>
  )
}
