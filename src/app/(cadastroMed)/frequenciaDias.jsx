import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Chip, IconButton, Text } from "react-native-paper";
import { NewMedBar } from "../../components";
import { icons } from "../../constants";
import { useDataContext } from "../../context/DataProvider";

/* Tela para registrar a frequencia de dias que o medicamento deve ser tomado */
export default function FrequenciaDias() {
  const { setNovoMedicamento } = useDataContext();
  const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [showDays, setShowDays] = useState(false);

  const handleDay = (index) => {
    const newDays = [...days];
    newDays[index] = newDays[index] === 1 ? 0 : 1;
    setDays(newDays);
  };

  const handleALlDays = () => {
    const allDays = [1, 1, 1, 1, 1, 1, 1];
    setNovoMedicamento((prev) => ({ ...prev, frequenciaDias: allDays }));
    router.push("/primeiraDose");
  };

  // funcao para renderizar os chips de dias
  const renderChip = (index, day) => (
    <Chip
      key={index}
      icon={days[index] === 1 ? "check" : "close"}
      style={{
        backgroundColor: days[index] === 1 ? "#cfa4ed" : "#edddf6",
        marginBottom: 20,
        marginRight: 10,
      }}
      onPress={() => handleDay(index)}
      textStyle={{ fontSize: 18 }}
    >
      {day}
    </Chip>
  );

  const handleNext = () => {
    setNovoMedicamento((prev) => ({ ...prev, frequenciaDias: days }));
    router.push("/primeiraDose");
  };

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
              onPress={handleNext}
              disabled={days.every((day) => day === 0)}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
