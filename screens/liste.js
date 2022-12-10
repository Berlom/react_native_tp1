import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Colors } from "react-native-paper";
import initFirebase from "../config";

export default function Liste({ navigation }) {
  //TODO get data from firebase
  const [data, setData] = useState([]);
  const database = initFirebase.database();
  const ref_profils = database.ref("profils");
  const ref_isConnected = database.ref("isConnected");
  useEffect(() => {
    ref_profils.on("value", (dataSnapshot) => {
      let d = dataSnapshot.val();
      setData(
        Object.keys(d).map((value) => {
          if (
            d[value].email !=
            initFirebase.auth().currentUser.providerData[0].email
          )
            return {
              nom: d[value].nom,
              prenom: d[value].prenom,
              pseudo: d[value].pseudo,
              image: d[value].image,
              email: d[value].email,
            };
        })
      );
    });

    return () => {
      ref_profils.off();
    };
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/400/900?random" }}
      style={styles.container}
    >
      <Text style={{ color: Colors.white, fontSize: 36 }}>Liste Screen</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item)
            return (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingVertical: 10,
                }}
              >
                {item.image === "" ? (
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                    source={require("../assets/profile.png")}
                  ></Image>
                ) : (
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                    source={{ uri: item.image }}
                  ></Image>
                )}
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 24,
                  }}
                >
                  {item.nom}
                </Text>
                <Text style={{ color: Colors.white }}>{item.prenom}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("chat", { user: item });
                  }}
                >
                  <Text style={{ color: Colors.white }}>{item.pseudo}</Text>
                </TouchableOpacity>
              </View>
            );
          return;
        }}
      />
      <Button
        title="Disconnect"
        onPress={() => {
          ref_isConnected
            .child(initFirebase.auth().currentUser.email.split("@")[0])
            .remove();
          navigation.replace("auth");
        }}
      ></Button>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
