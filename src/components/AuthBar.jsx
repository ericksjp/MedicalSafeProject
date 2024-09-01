import { Image, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import { images } from "../constants";

const AuthAppBar = ({ title, icon }) => (
  <Appbar.Header
    mode="large"
    style={{
      backgroundColor: "#1d3e5d",
      paddingHorizontal: 20,
      height: 80,
    }}
  >
    <Appbar.Content
      title={title}
      className="text-6xl"
      titleStyle={{
        fontSize: 25,
        fontWeight: "semibold",
        color: "white",
      }}
    />
    <Image source={images.logo} style={styles.tinyLogo} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default AuthAppBar;
