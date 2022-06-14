import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Account from '../screens/Profile/Account'
import Profile from '../screens/Profile/Profile'


const AccountStackNavigator = createNativeStackNavigator()

export default function AccountStack() {
  return (
    <AccountStackNavigator.Navigator initialRouteName="Account">
      <AccountStackNavigator.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />

      <AccountStackNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </AccountStackNavigator.Navigator>
  )
}
