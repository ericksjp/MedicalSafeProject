import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Modal, Portal, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import icon set

const MedReminder = ({ time, medication, dosage, onDelete }) => {
  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);

  const handleDelete = () => {
    onDelete(); // Call the passed delete handler
    hideDeleteModal();
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  // container: {
  //     backgroundColor: "",
  //     padding: 20,
  //     borderRadius: 10,
  //     marginBottom: 10,
  //     flexDirection: "row",
  //     alignItems: "center",
  //     justifyContent: "space-between", // Added to align items to both sides
  //     width: "90%",
  //   },

  return (
    <View className="bg-white p-5 flex flex-row align-center justify-center w-[90%] shadow-black h-48 rounded-lg shadow-2xl">
      <Text className="text-">{time}</Text>
      <View style={stylesMed.medicationDetails}>
        {/* <Icon name="syringe" size={20} color="white" style={stylesMed.icon} /> */}
        <View>
          <Text style={stylesMed.medicationName}>{medication}</Text>
          <Text style={stylesMed.dosage}>Tomar {dosage}</Text>
        </View>
      </View>

      <IconButton
        icon="trash-can"
        color="white"
        size={20}
        style={stylesMed.deleteButton}
        onPress={showDeleteModal}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>

        <Modal
          visible={deleteModalVisible}
          onDismiss={hideDeleteModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={stylesMed.modalTitle}>Confirm Delete</Text>
          <Text>Are you sure you want to delete this medication?</Text>
          <View style={stylesMed.modalActions}>
            <Button
              mode="contained"
              onPress={handleDelete}
              style={stylesMed.modalButton}
            >
              Yes
            </Button>
            <Button
              mode="outlined"
              onPress={hideDeleteModal}
              style={stylesMed.modalButton}
            >
              No
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const stylesMed = StyleSheet.create({
  container: {
    backgroundColor: "",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Added to align items to both sides
    width: "90%",
  },
  time: {
    fontSize: 18,
    color: "white",
    marginRight: 20,
  },
  medicationDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  medicationName: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  dosage: {
    fontSize: 14,
    color: "white",
  },
  button: {
    marginTop: 30,
  },
  deleteButton: {
    marginLeft: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    marginHorizontal: 5,
  },
});

export default MedReminder;
