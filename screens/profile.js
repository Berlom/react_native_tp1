import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { Colors } from "react-native-paper";
import initFirebase from "../config";

export default function Profile() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");

  const database = initFirebase.database();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 1.5,
      }}
    >
      <Text
        style={{ fontSize: 48, fontWeight: "bold", color: Colors.blueGrey500 }}
      >
        Profile
      </Text>

      <Image
        source={require("../assets/profile.png")}
        style={{
          resizeMode: "contain",
          height: 200,
          width: 200,
        }}
      />

      <TextInput
        onChange={(nom) => {
          setNom(nom.nativeEvent.text);
        }}
        placeholder="Entrer votre nom"
        placeholderTextColor={Colors.black}
        color={Colors.black}
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChange={(prenom) => {
          setPrenom(prenom.nativeEvent.text);
        }}
        placeholder="Entrer votre prénom"
        placeholderTextColor={Colors.black}
        color={Colors.black}
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChange={(pseudo) => {
          setPseudo(pseudo.nativeEvent.text);
        }}
        placeholder="Entrer votre Pseudo"
        placeholderTextColor={Colors.black}
        color={Colors.black}
        style={styles.textinputstyle}
      ></TextInput>
      <Button
        onPress={() => {
          database.ref("profils").child("profil").set({
            nom: nom,
            prenom: prenom,
            pseudo: pseudo,
          });
        }}
        title="Save"
        color={Colors.blueGrey700}
        textcolor="#fff"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textinputstyle: {
    backgroundColor: "#0001",
    height: 50,
    width: 220,
    margin: 7,
    padding: 7,
    borderRadius: 30,
    borderColor: Colors.black,
    borderWidth: 1,
  },
});
