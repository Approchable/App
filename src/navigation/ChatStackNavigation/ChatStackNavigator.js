import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../../screens/Chat/Chat'
import Connections from '../../screens/Chat/Connections'

const ChatStackNavigator = createNativeStackNavigator()

export default function ChatStack() {
  return (
    <ChatStackNavigator.Navigator initialRouteName="Chat">
      {/* <ChatStackNavigator.Screen
        name="ChatHome"
        component={Connections}
        options={{
          headerShown: false,
        }}
      /> */}
      <ChatStackNavigator.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
    </ChatStackNavigator.Navigator>
  )
}
