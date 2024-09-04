import { useState } from "react";
import { View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NewMedBar } from "../../components";
import { icons } from "../../constants";
import { IconButton, Button } from "react-native-paper";
import { router } from "expo-router";

const PrimeiraDose = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View className="h-full w-full bg-white">
      <NewMedBar
        iconBackBtn="arrow-left-bold"
        title="Quando você precisa tomar a próxima dose ?"
        icon={icons.medicine}
      />

      <View className="p-5 rounded-t-3xl bg-white z-auto mt-[-20px] flex flex-col gap-5">
        <Text className="text-2xl text-slate-700 my-5 font-semibold text-center">
          {date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>

        <Button
          onPress={() => setShow(true)}
          labelStyle={{ color: "#6750a4", fontSize: 21, textAlign: "left" }}
          contentStyle={{ height: 50 }}
          mode="elevated"
          compact={true}
        >
          Selecionar Data
        </Button>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // mode={mode}
            display="spinner"
            onChange={onChange}
          />
        )}
        <IconButton
          icon="arrow-right-bold"
          iconColor={"#6750a4"}
          size={50}
          onPress={() => {
            console.log("here");
            router.push("/frequenciaDoseDiaria");
          }}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
    </View>
  );
};

export default PrimeiraDose;
