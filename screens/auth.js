import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { Colors } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import initFirebase from "../config";

const image = {
  uri: "https://images.rawpixel.com/image_600/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZmMjk1OS1pbWFnZS1rd3Z4M2EzMS5qcGc.jpg",
};

const Stack = createNativeStackNavigator();

export default function Auth({ navigation }) {
  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");
  const auth = initFirebase.auth();
  const database = initFirebase.database();
  const ref_connecte = database.ref("isConnected");
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}
        blurRadius={15}
      >
        <View style={styles.view2style}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#9E3602",
            }}
          >
            Authentification
          </Text>
          <TextInput
            onChange={(email) => {
              setEmail(email.nativeEvent.text);
            }}
            placeholder="Entrer le mail"
            placeholderTextColor={Colors.white}
            color={Colors.white}
            keyboardType="email-address"
            style={styles.textinputstyle}
          ></TextInput>
          <TextInput
            onChange={(pwd) => {
              setpwd(pwd.nativeEvent.text);
            }}
            placeholder="Entrer le password"
            placeholderTextColor={Colors.white}
            color={Colors.white}
            secureTextEntry={true}
            style={styles.textinputstyle}
          ></TextInput>
          <Button
            onPress={() => {
              auth
                .signInWithEmailAndPassword(email, pwd)
                .then(() => {
                  ref_connecte
                    .child(email.split("@")[0])
                    .set({ isConnected: true });
                  navigation.replace("home");
                })
                .catch((err) => {
                  alert(err);
                });
            }}
            title="Login"
            color="#F99D78"
            textcolor="#fff"
            accessibilityLabel="Learn more about this purple button"
          />
          <TouchableOpacity
            style={{
              marginRight: 20,
              width: "100%",
              alignItems: "flex-end",
            }}
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            <Text style={{ color: "white" }}>create a new user</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ddf0e4",
    alignItems: "center",
    justifyContent: "center",
  },
  textstyle: {
    backgroundColor: "red",
  },
  view2style: {
    height: "100%",
    width: "100%",

    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  textinputstyle: {
    backgroundColor: "#0001",
    height: 50,
    width: 220,
    margin: 7,
    padding: 7,
    borderRadius: 30,
    borderColor: Colors.white,
    borderWidth: 1,
  },
});
