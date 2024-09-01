import { Image, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import { images } from "../constants";

const AuthAppBar = ({ title, icon }) => (
  <Appbar.Header
    mode="small"
    style={{
      backgroundColor: "#6750a4",
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
    {/* <Appbar.Action icon={images.logo} /> */}
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
