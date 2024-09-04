import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import MyModal from "./MyModal";

const MedReminder = ({ time, medication, dosage, onDelete, initialStatus }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const processMedicationStatus = () => {
    const now = new Date();
    const medicationTime = new Date();

    const [hours, minutes] = time.split(":").map(Number);
    medicationTime.setHours(hours, minutes, 0, 0);

    if (now > medicationTime && !status) {
      setStatus(false);
    } else if (status) {
      setStatus(true);
    }
  };

  useEffect(() => {
    processMedicationStatus();

    const intervalId = setInterval(() => {
      processMedicationStatus();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [time, status]);

  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);

  const handleDelete = () => {
    onDelete();
    hideDeleteModal();
  };

  return (
    <View className="w-10/12 self-center">
      <TouchableOpacity
        className="flex bg-white w-full p-5 shadow-black rounded-lg shadow-2xl gap-2 border-slate-400 border-1"
        onPress={showDeleteModal}
      >
        <View className="flex flex-row justify-between">
          <Text className="text-slate-700 text-2xl">{time}</Text>
          <Text
            className={`text-xl ${status ? "text-green-400" : "text-red-400"}`}
          >
            {status ? "Tomado" : "Esquecido"}
          </Text>
        </View>
        <Divider bold />

        <View className="flex flex-row justify-between w-full">
          <View className="flex gap-1 ml-2">
            <Text className="font-bold text-2xl text-[#6750a4]">
              {medication}
            </Text>
            <Text className="text-slate-700 text-xl italic">
              Tomar {dosage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <MyModal
        visible={deleteModalVisible}
        onDismiss={hideDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Deleção"
        message="Tem certeza que deseja deletar este medicamento?"
        nomeRemedio={medication}
        status={status}
        dosage={dosage}
        time={time}
      />
    </View>
  );
};

export default MedReminder;
