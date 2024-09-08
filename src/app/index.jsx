import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import images from "../constants/images";

// pagina inicial
const Index = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image source={images.biggerLogo} className="size-60 mb-5" />

      <Text className="font-bold text-2xl mb-5">Bem-vindo ao TakePill!</Text>
      <View className="w-10/12 justify-around h-52">
        <Button
          mode="contained"
          onPress={() => router.push("/login")}
          className="mb-2 w-full"
        >
          Login
        </Button>
        <Button
          mode="contained"
          onPress={() => router.push("/signup")}
          className="mb-2 w-full"
        >
          Cadastro
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push("/home")}
          className="mb-2 w-full"
        >
          Entrar como convidado
        </Button>
      </View>
    </View>
  );
};
export default Index;
