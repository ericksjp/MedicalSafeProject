import { View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "react-native";
import { useState } from "react";
import { formatHora } from "../utils";

export default function horaField({ index, onHoraChange, onDoseChange }) {
  const [hora, setHora] = useState(new Date());
  const [dose, setDose] = useState("1");
  const [showPickerIndex, setShowPickerIndex] = useState(false);

  const handleHoraChange = (_, selectedTime) => {
    setShowPickerIndex(false);
    setHora(selectedTime);
    onHoraChange(index, selectedTime);
  };

  const handleDoseChange = (value) => {
    value = removeNomNumeric(value);
    setDose(value);
    if (value === "") value = "1";
    onDoseChange(index, value);
  };

  function handleBlur() {
    if (dose === "") {
      setDose("1");
    }
  }

  function removeNomNumeric(value) {
    return value.replace(/\D/g, "");
  }

  return (
    <View className="flex flex-row items-center gap-5 justify-center">
      <Text style={{ fontSize: 20 }}>Horário {index + 1}</Text>
      <TouchableOpacity onPressIn={() => setShowPickerIndex(true)}>
        <TextInput
          label="Hora"
          mode="flat"
          value={formatHora(hora)}
          style={{ fontSize: 20 }}
          editable={false}
        />
      </TouchableOpacity>
      {showPickerIndex && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="spinner"
          onChange={(event, selectedTime) =>
            handleHoraChange(event, selectedTime)
          }
          is24Hour={true}
        />
      )}
      <TextInput
        label="Dose"
        mode="flat"
        value={dose}
        onChangeText={(value) => handleDoseChange(value)}
        onBlur={handleBlur}
        style={{ fontSize: 20, width: 80 }}
      />
    </View>
  );
}
