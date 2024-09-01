import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  return (
    <View className="h-full w-full flex justify-center items-center">
      <Text className="text-black">Index</Text>
      <Button title="enter" onPress={() => router.push("/login")} />
    </View>
  );
};

export default Index;
