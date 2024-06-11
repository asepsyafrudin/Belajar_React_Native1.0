import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/Card/card";

export default function Details() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setData(res.data.products);
      // console.log(res.data);
    });
  }, []);

  const router = useRouter();
  const params = useLocalSearchParams();
  const [order, setOrder] = useState([]);

  const handleDecrement = (id) => {
    console.log(id);
  };
  const handleIncrement = (id) => {
    console.log(id);
  };

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      {console.log(data)}
      {data.length > 0 &&
        data.map((item) => (
          <Card
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            key={item.id}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
