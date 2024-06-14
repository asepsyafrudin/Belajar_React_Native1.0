import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/Card/card";

export default function Details() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      const pullData = res.data.products;
      if (pullData.length > 0) {
        for (let index = 0; index < pullData.length; index++) {
          pullData[index] = { ...pullData[index], quantity: 0 };
        }
      }
      setData(pullData);
    });
  }, []);

  const router = useRouter();
  const params = useLocalSearchParams();
  const [order, setOrder] = useState([]);

  const handleDecrement = (id) => {
    let dataNew = data;
    if (dataNew.length > 0) {
      for (let index = 0; index < dataNew.length; index++) {
        if (dataNew[index].id === id) {
          dataNew[index].quantity = dataNew[index].quantity - 1;
          console.log("qty", dataNew[index].quantity);
        }
      }
      setData(dataNew);
    }

    // const dataYangMauDiubah = dataLama.find((item) => item.id === id);
    // dataYangMauDiubah.quantity = dataYangMauDiubah.quantity - 1;
    // console.log("qty", dataYangMauDiubah.quantity);
    // const dataSelainDataBaru = dataLama.filter((item) => item.id !== id);
    // dataSelainDataBaru.push(dataYangMauDiubah);
    // setData(dataSelainDataBaru);
  };
  const handleIncrement = (id) => {
    let newData = data;
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        if (newData[index].id === id) {
          newData[index].quantity = newData[index].quantity + 1;
          console.log("qty", newData[index].quantity);
        }
      }
    }
    setData(newData);
  };

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      {/* {console.log(data)} */}
      {data.length > 0 &&
        data.map((item) => (
          <Card
            item={item}
            onIncrement={(id) => handleIncrement(id)}
            onDecrement={(id) => handleDecrement(id)}
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
