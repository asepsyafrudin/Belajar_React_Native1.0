import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  ApplicationProvider,
  Input,
  Layout,
  Text,
  Icon,
  Button,
  IconElement,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { router } from "expo-router";

const userLogin = {
  username: "admin",
  password: "admin",
};
const App = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // const toggleSecureEntry = () => {
  //   setSecureTextEntry(!secureTextEntry);
  // };

  // const renderIcon = (props) => (
  //   <TouchableWithoutFeedback onPress={toggleSecureEntry}>
  //     <Icon name={secureTextEntry ? "eye-off" : "eye"} />
  //   </TouchableWithoutFeedback>
  // );.

  const handleUserLogin = () => {
    if (username === userLogin.username && password === userLogin.password) {
      alert("Login Successful");
      router.navigate("/Home");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text category="h1" style={{ textAlign: "center" }}>
          Welcome to Sign
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text category="h6">Username</Text>
        </View>
        <Input
          value={username}
          onChangeText={(e) => setUserName(e)}
          placeholder="Enter Username"
        />
        <View style={{ marginTop: 10, textAlign: "left" }}>
          <Text category="h6">Password</Text>
        </View>
        <Input
          value={password}
          placeholder="Enter Password"
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />

        <Button style={{ marginTop: 10 }} onPress={handleUserLogin}>
          Login
        </Button>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
  },
});

export default App;
