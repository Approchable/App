import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sucess from '../screens/Onboarding/Sucess';
import Explore from '../screens/Explore/Explore';

const Welcome = createNativeStackNavigator();

export default function WelcomeStack() {
  return (
    <Welcome.Navigator initialRouteName="Explore">
      <Welcome.Screen
        name="Sucess"
        component={Sucess}
        r
        options={{
          headerShown: false,
        }}
      />
      <Welcome.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
        }}
      />
    </Welcome.Navigator>
  );
}
