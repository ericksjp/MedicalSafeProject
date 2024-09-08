import { Text, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";

export default function CancelModal({ visible, onDismiss, onConfirm }) {
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
        <View className="items-center justify-center">
          <Text className="text-xl mb-5">
            Tem certeza que deseja cancelar o cadastro do remédio?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button
              mode="contained"
              onPress={onDismiss}
              style={{ backgroundColor: "#f87171" }}
            >
              Não
            </Button>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={{
                backgroundColor: "#4ade80",
              }}
            >
              Sim
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
