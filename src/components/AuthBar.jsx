import { Image, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { images } from "../constants";

/**
 * AuthAppBar is a functional component that renders a custom AppBar.
 * It accepts two props: title and icon.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title to be displayed on the AppBar.
 * @param {string} props.icon - The icon to be displayed on the AppBar.
 *
 * @returns {JSX.Element} The AppBar element.
 */
function AuthAppBar({ title, icon }) {
  return (
    <Appbar.Header
      mode="small"
      style={{
        backgroundColor: "#6750a4",
        paddingHorizontal: 20,
        height: 100,
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
}

const styles = StyleSheet.create({
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
