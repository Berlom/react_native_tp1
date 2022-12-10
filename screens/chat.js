import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Animated,
} from "react-native";
import { Chip, Colors } from "react-native-paper";
import initFirebase from "../config";

export default function Chat({ route, navigation }) {
  const { user } = route.params;

  const database = initFirebase.database();
  const conversationUsers = [
    initFirebase.auth().currentUser.providerData[0].email,
    user.email,
  ];

  const textInputRef = useRef();
  const ref_isTyping = database.ref("isTyping");
  const ref_isConnected = database.ref("isConnected");
  const ref_messages = database.ref("messages");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ref_isTyping
      .child(
        user.email.split("@")[0] +
          " isTypingTo " +
          initFirebase.auth().currentUser.email.split("@")[0]
      )
      .on("value", (dataSnapshot) => {
        let d = dataSnapshot?.val();
        if (d) setIsTyping(d[Object?.keys(d)[0]]);
      });
    return () => {
      ref_isTyping.off();
    };
  }, []);

  useEffect(() => {
    ref_isConnected
      .child(user.email.split("@")[0])
      .on("value", (dataSnapshot) => {
        let d = dataSnapshot?.val();
        if (d) setIsConnected(d[Object?.keys(d)[0]]);
      });
    return () => {
      ref_isConnected.off();
    };
  }, []);

  useEffect(() => {
    ref_messages.on("value", (dataSnapshot) => {
      let d = dataSnapshot.val();
      setConversation(
        Object.keys(d).map((value) => {
          if (
            !conversationUsers.includes(d[value].sender) ||
            !conversationUsers.includes(d[value].receiver)
          )
            return;
          return {
            message: d[value].message,
            sender: d[value].sender,
            receiver: d[value].receiver,
          };
        })
      );
    });

    return () => {
      ref_messages.off();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Text style={{ paddingLeft: 10, paddingTop: 10, fontSize: 26 }}>
        {user.prenom + " " + user.nom}
      </Text>
      <Text style={{ paddingLeft: 80, fontSize: 16 }}>
        {isConnected ? "Connecté" : "Déconnecté"}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 10,
        }}
      >
        <FlatList
          data={conversation}
          renderItem={({ item }) => {
            if (item)
              return (
                <View>
                  {item.receiver == user.email ? (
                    <View
                      style={{
                        backgroundColor: "#0078fe",
                        padding: 10,
                        marginLeft: "45%",
                        borderRadius: 5,

                        marginTop: 5,
                        marginRight: "5%",
                        maxWidth: "50%",
                        alignSelf: "flex-end",
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "#fff" }}>
                        {item.message}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: "#dedede",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 5,
                        marginLeft: "5%",
                        maxWidth: "50%",
                        alignSelf: "flex-start",
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "#fff" }}>
                        {item.message}
                      </Text>
                    </View>
                  )}
                </View>
              );
            return;
          }}
        />
        {isTyping ? (
          <View>
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 16,
                color: Colors.blueGrey700,
              }}
            >
              is typing
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <TextInput
          style={{
            backgroundColor: "#0001",
            height: 50,
            minWidth: "100%",
            borderColor: Colors.white,
            borderWidth: 1,
          }}
          placeholder="Enter your Message"
          ref={textInputRef}
          onFocus={() => {
            //User is typing
            ref_isTyping
              .child(
                initFirebase.auth().currentUser.email.split("@")[0] +
                  " isTypingTo " +
                  user.email.split("@")[0]
              )
              .set({ isTyping: true });
          }}
          onBlur={() => {
            //user stop typing
            ref_isTyping
              .child(
                initFirebase.auth().currentUser.email.split("@")[0] +
                  " isTypingTo " +
                  user.email.split("@")[0]
              )
              .set({ isTyping: false });
          }}
          onChange={(e) => {
            setMessage(e.nativeEvent.text);
          }}
        ></TextInput>
        <Button
          title="Send"
          disabled={message === ""}
          onPress={() => {
            ref_messages.child("message-" + ref_messages.push().key).set({
              message: message,
              receiver: user.email,
              sender: initFirebase.auth().currentUser.email,
            });
            textInputRef.current.clear();
          }}
        ></Button>
      </View>
    </View>
  );
}
