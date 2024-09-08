import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

export default function SuccessModal({ visible, onAll }) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onAll}
        contentContainerStyle={styles.modalContainer}
      >
        <Text className="text-xl mb-5 text-center">
          Medicamento cadastrado com sucesso!
        </Text>
        <Button mode="contained" onPress={onAll} style={styles.button}>
          OK
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
  },
});
