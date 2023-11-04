import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./components/config";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const createData = async () => {
    await addDoc(collection(db, "users"), { username, email })
      .then(() => console.log("Data created"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Firebase CRUD</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={createData}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
