import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Profile from "./profile";
import Accueil from "./accueil";
import Liste from "./liste";

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="accueil" component={Accueil} />
      <Tab.Screen name="liste" component={Liste} />
    </Tab.Navigator>
  );
}
