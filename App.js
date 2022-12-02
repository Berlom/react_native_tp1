import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./screens/auth";
import Register from "./screens/register";
import Home from "./screens/home";
import Chat from "./screens/chat";

const Stack = createNativeStackNavigator();

export default function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth">
        <Stack.Screen name="auth" component={Auth} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
