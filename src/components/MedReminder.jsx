import { memo, useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { useDataContext } from "../context/DataProvider";
import { formatHora, getStatusTextAndColor } from "../utils";
import MyModal from "./MyModal";

const MedReminder = ({ name, forma, dose, status, hora, dia }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { deletarMedicamento, atualizarEstado } = useDataContext();

  const showDeleteModal = useCallback(() => setDeleteModalVisible(true), []);
  const hideDeleteModal = useCallback(() => setDeleteModalVisible(false), []);

  const handleChangeStatus = useCallback(
    (status) => {
      atualizarEstado(dia, hora, status);
      hideDeleteModal();
    },
    [dia, hora]
  );

  const handleDelete = useCallback(() => {
    deletarMedicamento(name);
    hideDeleteModal();
  }, [name]);

  const { text: statusText, color: statusColor } =
    getStatusTextAndColor(status);

  return (
    <View className="w-10/12 self-center">
      <TouchableOpacity
        className="flex bg-white w-full p-5 shadow-black rounded-lg shadow-2xl gap-2 border-slate-400 border-1"
        onPress={showDeleteModal}
      >
        <View className="flex flex-row justify-between">
          <Text className="text-slate-700 text-2xl">{formatHora(hora)}</Text>
          <Text className={`text-xl ${statusColor}`}>{statusText}</Text>
        </View>
        <Divider bold />
        <View className="flex flex-row justify-between w-full">
          <View className="flex gap-1 ml-2">
            <Text className="font-bold text-2xl text-[#6750a4]">{name}</Text>
            <Text className="text-slate-700 text-xl italic">
              Tomar {dose} {forma}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <MyModal
        visible={deleteModalVisible}
        onDelete={handleDelete}
        onDismiss={hideDeleteModal}
        onChangeStatus={handleChangeStatus}
        title="Confirmar Deleção"
        message="Tem certeza que deseja deletar este medicamento?"
        nomeRemedio={name}
        status={status}
        dose={dose}
        hora={hora}
      />
    </View>
  );
};

export default memo(MedReminder);
