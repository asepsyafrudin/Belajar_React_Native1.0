import { Link, Stack } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

/**
 * The Home component is the main page of the app.
 * It displays a header with a logo, a text, and some links to other screens.
 *
 * @returns {JSX.Element} The Home component
 */
export default function Home() {
  return (
    <View style={styles.container}>
      {/* Display a header with the app title and a custom logo */}
      <Stack.Screen
        options={{
          title: "My home", // Set the title of the header
          headerStyle: { backgroundColor: "#f4511e" }, // Set the background color of the header
          headerTintColor: "#fff", // Set the color of the header text
          headerTitleStyle: {
            fontWeight: "bold", // Set the font weight of the header text
          },

          // Set the custom logo as the header title
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />

      {/* Display a text */}
      <Text>Home Screen</Text>

      {/* Display a link to the Details screen */}
      <Link
        href={{ pathname: "details", params: { name: "Bacon" } }} // Set the path and parameters for the link
      >
        Go to Details
      </Link>

      {/* Display a link to the Status View screen */}
      <Link
        href={{ pathname: "Status", params: { name: "Bacon" } }} // Set the path and parameters for the link
      >
        Go to Status View
      </Link>

      {/* Display a link to the Profile screen */}
      <Link
        href={{ pathname: "Profile" }} // Set the path for the link
      >
        Go to Profile
      </Link>

      <Link
        href="/" // Set the path for the link
      >
        Logout
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
