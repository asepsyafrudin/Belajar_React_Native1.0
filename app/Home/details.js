import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/Card/card";

export default function Details() {
  const [data, setData] = useState([]);
  const [dataBaru, setDataBaru] = useState([]);
  const [action, setAction] = useState(0);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      const pull_data = res.data.products;

      if (pull_data.length > 0) {
        for (let index = 0; index < pull_data.length; index++) {
          pull_data[index].quantity = 0;
        }
      }
      setData(res.data.products);
      //console.log(pull_data[3].quantity);
    });
  }, []);

  const router = useRouter();
  const params = useLocalSearchParams();
  const [order, setOrder] = useState([]);

  const handleDecrement = (id) => {
    const dataLama = [];
    if (data.length > 0) {
      data.forEach((item, i) => {
        if (item.id === id) {
          item.quantity = item.quantity - 1;
          dataLama.push(item);
          //console.log(item.quantity);
        } else {
          dataLama.push(item);
        }
      });
    }
    setData(dataLama);
    //setAction(action + 1);
  };
  const handleIncrement = (id) => {
    const dataLama = [];
    if (data.length > 0) {
      data.forEach((item, i) => {
        if (item.id === id) {
          item.quantity = item.quantity + 1;
          dataLama.push(item);
          //console.log(item.quantity);
        } else {
          dataLama.push(item);
        }
      });
    }
    setData(dataLama);
    //setAction(action + 1);
  };

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      {data.length > 0 &&
        data.map((item) => (
          <Card
            item={item}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
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
