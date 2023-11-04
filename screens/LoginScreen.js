import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class LoginScreen extends React.Component {
  state = {
    name: "",
  };

  continue = () => {
    this.props.navigation.navigate("Chat", { name: this.state.name });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{ marginTop: 64 }}>
          <Image
            source={require("../assets/chat.png")}
            style={{ width: 120, height: 120, alignSelf: "center" }}
          />
        </View>
        <View style={{ marginHorizontal: 32 }}>
          <Text style={styles.header}>Username</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            placeholder="Username"
            onChangeText={(name) => {
              this.setState({ name });
            }}
          />
          <View style={{ alignItems: "flex-end", marginTop: 64 }}>
            <TouchableOpacity style={styles.continue} onPress={this.continue}>
              <Ionicons name="arrow-forward-outline" size={35} color="white" />
              {/* <Text style={styles.buttonText}>Submit</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9F77",
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: "#7797",
    position: "absolute",
    left: -110,
    top: -40,
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    marginTop: 32,
  },
  input: {
    marginTop: 32,
    height: 50,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
