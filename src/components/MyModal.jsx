import { Text, View } from "react-native";
import { Button, Icon, IconButton, Modal, Portal } from "react-native-paper";

const MyModal = ({
  visible,
  onDismiss,
  onConfirm,
  nomeRemedio,
  status,
  dosage,
  time,
}) => {
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
          <IconButton icon="trash-can" size={30} />
        </View>

        <View className="bg-gray-200 flex w-full items-center">
          <Text className="text-3xl font-semibold">{nomeRemedio}</Text>
          <Text
            className={`text-xl mt-1 ${
              status ? "text-green-400" : "text-red-400"
            }`}
          >
            {status ? "Tomado" : "Esquecido"}
          </Text>

          <View className="flex flex-row items-center gap-2 mt-4 self-start ml-4">
            <Icon source="clock" size={20} />
            <Text className="self-start text-lg">Agendado para {time}</Text>
          </View>
          <View className="flex flex-row gap-o items-center self-start ml-4">
            <Icon source="archive-outline" size={20} />
            <Text className="self-start text-lg">{dosage}</Text>
          </View>
        </View>

        <View className="flex flex-row justify-evenly w-full mt-6 bg-gray-200 rounded-b-3xl">
          <Button
            mode="contained"
            onPress={onDismiss}
            icon="close"
            style={{ backgroundColor: "#f87171" }}
          >
            Ignorar
          </Button>
          <Button
            mode="contained"
            onPress={onConfirm}
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
