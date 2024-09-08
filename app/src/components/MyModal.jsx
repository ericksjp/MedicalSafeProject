import { Text, View } from "react-native";
import { Button, Icon, IconButton, Modal, Portal } from "react-native-paper";
import { formatDate, getStatusTextAndColor } from "../utils";

const MyModal = ({
  visible,
  onDismiss,
  onChangeStatus,
  onDelete,
  nomeRemedio,
  status,
  dose,
  hora,
  forma,
}) => {
  const { text: statusText, color: statusColor } =
    getStatusTextAndColor(status);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: "white",
          width: "90%",
          alignSelf: "center",
          borderRadius: 24,
          padding: 12,
          backgroundColor: "#e5e7eb",
        }}
      >
        <View className="w-full h-12 flex-row justify-start items-center gap-2 rounded-t-3xl">
          <IconButton icon="trash-can" size={30} onPress={onDelete} />
        </View>

        <View className="bg-gray-200 flex w-full items-center">
          <Text className="text-3xl font-semibold">{nomeRemedio}</Text>
          <Text className={`text-xl mt-1 ${statusColor}`}>{statusText}</Text>

          <View className="flex flex-row items-center gap-2 mt-4 self-start ml-4">
            <Icon source="clock" size={20} />
            <Text className="self-start text-lg">
              Agendado para {formatDate(hora)}
            </Text>
          </View>
          <View className="flex flex-row gap-o items-center self-start ml-4">
            <Icon source="archive-outline" size={20} />
            <Text className="self-start text-lg ml-1">
              {dose} {forma}
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-evenly w-full mt-6 bg-gray-200 rounded-b-3xl">
          <Button
            mode="contained"
            onPress={() => onChangeStatus(0)}
            icon="close"
            style={{ backgroundColor: "#f87171" }}
          >
            Ignorar
          </Button>
          <Button
            mode="contained"
            onPress={() => onChangeStatus(1)}
            style={{
              backgroundColor: "#4ade80",
            }}
            icon="check"
          >
            Tomar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default MyModal;
