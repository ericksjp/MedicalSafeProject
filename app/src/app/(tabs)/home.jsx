import React from "react";
import { Text, View } from "react-native";
import { Calendar, HomeAppBar } from "../../components";
import { Area } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";

const Home = () => {
  function handleSetSelectedDay() {
    console.log("Selected day");
  }

  return (
    <View className="w-[100%] h-[100%]">
      <HomeAppBar title="Zezin Goiaba" />
      <Divider bold />
      <Calendar span={7} handleSetSelectedDay={handleSetSelectedDay} />
    </View>
  );
};

export default Home;
