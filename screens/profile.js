import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Colors } from "react-native-paper";
import initFirebase from "../config";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const database = initFirebase.database();
  const storage = initFirebase.storage();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const imgToBlob = async (uri) => {
    const blob = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const uploadImage = async (uri) => {
    //convertir image to blob
    const blob = await imgToBlob(uri);
    //save blob into reference
    const refImage = storage.ref().child("imagesProfiles").child("image.jpg");
    await refImage.put(blob);
    //get download url
    const url = await refImage.getDownloadURL();
    return url;
  };
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

      <TouchableOpacity onPress={pickImageAsync}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{
              resizeMode: "contain",
              height: 200,
              width: 200,
              borderRadius: 200 / 2,
            }}
          />
        ) : (
          <Image
            source={require("../assets/profile.png")}
            style={{
              resizeMode: "contain",
              height: 200,
              width: 200,
              borderRadius: 200 / 2,
            }}
          />
        )}
      </TouchableOpacity>

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
        onPress={async () => {
          if (selectedImage) {
            const url = await uploadImage(selectedImage);

            const ref_profile = database.ref("profils");
            const key = ref_profile.push().key;
            ref_profile.child("profil" + key).set({
              nom: nom,
              prenom: prenom,
              pseudo: pseudo,
              image: url,
            });
          }
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
