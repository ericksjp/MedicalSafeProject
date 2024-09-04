import { View } from "react-native";
import { CancelModal, NewMedBar } from "../../components";
import { icons } from "../../constants";
import { TextInput, IconButton } from "react-native-paper";
import { useState } from "react";
import { router } from "expo-router";
import { useMedContext } from "../../context/MedProvider";

export default function NomeMedicamento() {
  const { setMedData, setInitialState } = useMedContext();
  const [nome, setNome] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handlePress() {
    setMedData((prev) => ({ ...prev, nome }));
    router.push("/formaFarmaceutica");
  }

  function handleBack() {
    setInitialState();
    router.back();
  }

  return (
    <View className="bg-white w-full h-full">
      <NewMedBar
        iconBackBtn="close"
        title="Que medicamento você gostaria de adicionar ?"
        icon={icons.medicine}
        onBackStep={() => setModalVisible(true)}
      />
      <View className="p-5 rounded-t-3xl bg-white z-auto mt-[-20px] flex flex-col gap-5">
        <TextInput
          label="Nome do medicamento"
          mode="flat"
          value={nome}
          onChangeText={(e) => setNome(e)}
          style={{ backgroundColor: "transparent", fontSize: 25 }}
        />
        <View className="flex items-end">
          <IconButton
            icon="arrow-right-bold"
            iconColor={"#6750a4"}
            size={50}
            onPress={handlePress}
            disabled={!nome || nome.length === 0}
          />
        </View>
      </View>

      <CancelModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onConfirm={handleBack}
      />
    </View>
  );
}
