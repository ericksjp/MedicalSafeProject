import { View, FlatList } from "react-native";
import { NewMedBar } from "../../components";
import { Button } from "react-native-paper";
import { router } from "expo-router";

import { icons } from "../../constants";
import { useMedContext } from "../../context/MedProvider";

const values = [
  "Comprimido",
  "Injeção",
  "Solução (Liquido)",
  "Gotas",
  "Inalador",
  "Pó",
];

export default function FormaFarmaceutica() {
  const { setMedData } = useMedContext();

  function handlePress(item) {
    setMedData((prev) => ({ ...prev, forma: item }));
    router.push("/frequenciaDias");
  }

  const renderItem = ({ item }) => (
    <Button
      onPress={() => handlePress(item)}
      labelStyle={{ color: "#6750a4", fontSize: 21, textAlign: "left" }}
      contentStyle={{ height: 50 }}
      mode="contained-tonal"
      compact={true}
    >
      {item}
    </Button>
  );

  return (
    <View className="bg-white w-full h-full">
      <NewMedBar
        iconBackBtn="arrow-left-bold"
        title="Qual a forma farmacêutica do medicamento?"
        icon={icons.medicine}
      />
      <View className="p-5 rounded-t-3xl bg-white z-auto mt-[-20px] flex flex-col gap-5">
        <FlatList
          data={values}
          renderItem={renderItem}
          keyExtractor={(index, _) => index}
          contentContainerStyle={{ gap: 30 }}
          className="mt-4"
        />
      </View>
    </View>
  );
}
