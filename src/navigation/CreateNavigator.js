import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatePost1 from '../screens/Create/CreatePost1';
import CreatePost2 from '../screens/Create/CreatePost2';
import CreatePost3 from '../screens/Create/CreatePost3';

const CreateStackNavigator = createNativeStackNavigator();

export default function CreateStack() {
  return (
    <CreateStackNavigator.Navigator initialRouteName="CreatePost1">
      <CreateStackNavigator.Screen
        name="CreatePost1"
        component={CreatePost1}
        options={{
          headerShown: false,
        }}
      />

      <CreateStackNavigator.Screen
        name="CreatePost2"
        component={CreatePost2}
        options={{
          headerShown: false,
        }}
      />
        <CreateStackNavigator.Screen
        name="CreatePost3"
        component={CreatePost3}
        options={{
          headerShown: false,
        }}
      />
    </CreateStackNavigator.Navigator>
  );
}
