import { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import NewMedBar from "../../components/NewMedBar";
import { icons } from "../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMedContext } from "../../context/MedProvider";
import SuccessModal from "../../components/SucessModal";
import { router } from "expo-router";

export default function FrequenciaDoseDiaria() {
  const { setMedData, registerMed } = useMedContext();
  const [fields, setFields] = useState([{ time: new Date(), dose: "1" }]);
  const [showPickerIndex, setShowPickerIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onTimeChange = (fieldIndex, _, selectedTime) => {
    setShowPickerIndex(null);
    const updatedFields = [...fields];
    updatedFields[fieldIndex].time =
      selectedTime || updatedFields[fieldIndex].time;
    setFields(updatedFields);
  };

  const handleInputChange = (index, name, value) => {
    const updatedFields = [...fields];
    if (name === "dose") {
      value = removeNonNumeric(value);
      if (value.length === 1 && value == "0") {
        value = "1";
      }
    }
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };

  function handleBlur(index, value) {
    if (value === "") {
      const updatedFields = [...fields];
      updatedFields[index]["dose"] = "1";
      setFields(updatedFields);
    }
  }

  const addField = () => {
    setFields([...fields, { time: new Date(), dose: "1" }]);
  };

  const removeField = () => {
    if (fields.length === 1) {
      return;
    }
    const updatedFields = [...fields];
    updatedFields.splice(fields.length - 1, 1);
    setFields(updatedFields);
  };

  function removeNonNumeric(str) {
    return str.replace(/\D/g, "");
  }

  function handleRegistro() {
    setMedData((prev) => ({ ...prev, horarios: fields }));
    registerMed();
    setShowModal(true);
  }

  return (
    <View className="flex-1 bg-white">
      <NewMedBar
        iconBackBtn="arrow-left-bold"
        title="Quais são os horários que você deve tomar o medicamento?"
        icon={icons.medicine}
      />

      <ScrollView
        className="rounded-t-3xl mt-[-20px] bg-white"
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {fields.map((field, index) => (
          <View className="flex flex-col items-center">
            <View
              key={index}
              className="flex flex-row items-center gap-5 justify-center"
            >
              <Text style={{ fontSize: 20 }}>Horário {index + 1}</Text>
              <TouchableOpacity onPressIn={() => setShowPickerIndex(index)}>
                <TextInput
                  label="Hora"
                  mode="flat"
                  value={field.time.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  style={{ fontSize: 20 }}
                  editable={false}
                />
              </TouchableOpacity>

              {showPickerIndex === index && (
                <DateTimePicker
                  value={field.time}
                  mode="time"
                  display="spinner"
                  onChange={(event, selectedTime) =>
                    onTimeChange(index, event, selectedTime)
                  }
                  is24Hour={true}
                />
              )}

              <TextInput
                label="Dose"
                mode="flat"
                value={field.dose}
                onChangeText={(value) =>
                  handleInputChange(index, "dose", value)
                }
                onBlur={() => handleBlur(index, field.dose)}
                style={{
                  fontSize: 20,
                  width: 80,
                }}
              />
            </View>
            <Divider
              className="mt-5 mb-5 w-[80%] h-2"
              style={{
                height: 1,
              }}
            />
          </View>
        ))}

        <View className="w-full flex flex-row justify-evenly">
          <Button
            mode="contained"
            icon="plus"
            onPress={addField}
            style={{
              width: 170,
            }}
          >
            Adicionar horário
          </Button>
          <Button
            mode="elevated"
            icon="minus"
            onPress={removeField}
            style={{
              width: 170,
            }}
          >
            Remover hórario
          </Button>
        </View>
        <Button
          className="mt-10 self-center"
          mode="contained-tonal"
          icon="content-save-check"
          buttonColor="#4ade80"
          onPress={handleRegistro}
          style={{
            width: 300,
          }}
          labelStyle={{
            fontSize: 16,
          }}
        >
          Registrar medicamento
        </Button>
      </ScrollView>
      <SuccessModal
        visible={showModal}
        onAll={() => router.navigate("/home")}
      />
    </View>
  );
}
