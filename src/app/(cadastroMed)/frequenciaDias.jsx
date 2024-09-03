import { View } from "react-native";
import { NewMedBar } from "../../components";
import { Button, Chip, IconButton, Text } from "react-native-paper";
import { router } from "expo-router";
import { useState } from "react";

import { icons } from "../../constants";

export default function FrequenciaDias() {
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showDays, setShowDays] = useState(true);

  const handleDay = (index) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  };

  const handleALlDays = () => {
    setDays([true, true, true, true, true, true, true]);
    router.push("/primeiraDose");
  };

  const renderChip = (index, day) => (
    <Chip
      key={index}
      icon={days[index] ? "check" : "close"}
      style={{
        backgroundColor: days[index] ? "#cfa4ed" : "#edddf6",
        marginBottom: 20,
        marginRight: 10,
      }}
      onPress={() => handleDay(index)}
      textStyle={{ fontSize: 18 }}
    >
      {day}
    </Chip>
  );

  return (
    <View className="bg-white w-full h-full">
      <NewMedBar
        iconBackBtn="arrow-left-bold"
        title="Com que frequência você deve tomar o medicamento ?"
        icon={icons.medicine}
      />
      <View className="p-5 rounded-t-3xl bg-white z-auto mt-[-20px] flex flex-col gap-5">
        <Button
          onPress={handleALlDays}
          labelStyle={{ color: "#6750a4", fontSize: 21, textAlign: "left" }}
          contentStyle={{ height: 55 }}
          mode="outlined"
          compact={true}
        >
          Todos os dias da Semana
        </Button>

        <Button
          onPress={() => setShowDays(true)}
          labelStyle={{ color: "#6750a4", fontSize: 21, textAlign: "left" }}
          contentStyle={{ height: 50 }}
          mode="contained-tonal"
          compact={true}
        >
          A Cada X dias na Semana
        </Button>

        {showDays && (
          <View className="w-full">
            <Text className="text-2xl font-semibold text-center mb-4 ml-2">
              Escolha os dias:
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map(
                (day, index) => renderChip(index, day)
              )}
            </View>

            <IconButton
              icon="arrow-right-bold"
              iconColor={"#6750a4"}
              size={50}
              onPress={() => router.push("/primeiraDose")}
              disabled={days.every((day) => !day)}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
