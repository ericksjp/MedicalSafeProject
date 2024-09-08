import * as React from "react";
import { Appbar, Avatar, Divider } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

import { icons, images } from "../constants";

const HomeAppBar = ({ title }) => (
  <Appbar.Header style={styles.header}>
    <View style={styles.leftView}>
      <Avatar.Image size={40} source={icons.profile2} />
      <Appbar.Content title={<Text style={styles.title}>{title}</Text>} />
    </View>
    <Avatar.Image size={35} source={images.logo} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#6750a4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  leftView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "between",
    width: "80%",
    gap: 15,
  },
  avatarContainer: {
    marginRight: 10,
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeAppBar;
