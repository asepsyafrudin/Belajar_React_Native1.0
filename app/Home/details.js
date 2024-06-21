import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import Card from "../../components/Card/card";
import { Ionicons } from "@expo/vector-icons";

export default function Details() {
  const [data, setData] = useState([]);
  const [dataBaru, setDataBaru] = useState([]);
  const [action, setAction] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      const pull_data = res.data.products;

      if (pull_data.length > 0) {
        for (let index = 0; index < pull_data.length; index++) {
          pull_data[index].quantity = 0;
        }
      }
      setData(res.data.products);
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
          if (item.quantity > 0) {
            item.quantity = item.quantity - 1;
          }
          dataLama.push(item);
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
          if (item.stock > 0) {
            if (item.quantity < item.stock) {
              item.quantity = item.quantity + 1;
            }
          }
          dataLama.push(item);
        } else {
          dataLama.push(item);
        }
      });
    }
    setData(dataLama);
  };

  return (
    <>
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
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalorder}>
            Total Order:{" "}
            {data.reduce((total, product) => total + product.quantity, 0)}
          </Text>
          <Text style={styles.totalorder}>
            Total Price:{" $"}
            {data
              .reduce(
                (total, product) => total + product.quantity * product.price,
                0
              )
              .toFixed(2)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Ionicons name="cart" size={40} color="black" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  footer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "orange",
  },
  buttonContainer: {
    marginTop: 10,
  },
  totalorder: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
