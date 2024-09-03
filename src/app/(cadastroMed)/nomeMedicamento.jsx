import { View } from "react-native";
import { NewMedBar } from "../../components";
import { icons } from "../../constants";
import { TextInput, IconButton } from "react-native-paper";
import { useState } from "react";
import { router } from "expo-router";

export default function NomeMedicamento() {
  const [nome, setNome] = useState("");

  function handlePress() {
    router.push("/formaFarmaceutica");
  }

  return (
    <View className="bg-white w-full h-full">
      <NewMedBar
        iconBackBtn="close"
        title="Que medicamento você gostaria de adicionar ?"
        icon={icons.medicine}
      />
      <View className="p-5 rounded-t-3xl bg-white z-auto mt-[-20px] flex flex-col gap-5">
        <TextInput
          label="Nome do medicamento"
          mode="flat"
          value={nome}
          onChangeText={(e) => setNome(e)}
          style={{ backgroundColor: "transparent", fontSize: 20 }} // Tornar o fundo transparente
        />
        <View className="flex items-end">
          <IconButton
            icon="arrow-right-bold"
            iconColor={"#6750a4"}
            size={30}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
}
