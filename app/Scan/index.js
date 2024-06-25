import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  ApplicationProvider,
  Button,
  Input,
  Layout,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Input } from "@ui-kitten/components";

const scan = () => {
  // const [value, setValue] = React.useState("");
  const [text, setText] = useState("");
  const [listPartNumber, setListPartNumber] = useState([]);

  const handleScan = async (e) => {
    try {
      const data = e.nativeEvent.text;
      const value = JSON.parse(await AsyncStorage.getItem("listPartNumber"));
      console.log(data);
      if (value !== null) {
        await AsyncStorage.setItem(
          "listPartNumber",
          JSON.stringify([...value, data])
        );
        setListPartNumber([...value, data]);
        console.log([...value, data]);
      } else {
        await AsyncStorage.setItem("listPartNumber", JSON.stringify([data]));
        setListPartNumber([data]);
        console.log([data]);
      }

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View style={{ marginTop: 30 }}>
          <Text category="h6">Scan Part Number</Text>
        </View>
        <Input
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder="Enter Part Number"
          onSubmitEditing={(e) => handleScan(e)}
        />

        {/* <Button style={{ marginTop: 10 }}>Finish</Button> */}
      </Layout>
    </ApplicationProvider>
  );
};

export default scan;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
