import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native";
import { Colors } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./screens/auth";
import Register from "./screens/register";
import Home from "./screens/home";

const Stack = createNativeStackNavigator();

export default function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth">
        <Stack.Screen name="auth" component={Auth} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
