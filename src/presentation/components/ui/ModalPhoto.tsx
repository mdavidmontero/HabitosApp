import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@ui-kitten/components";
interface Props {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleTakePicture: () => Promise<void>;
  handleSelectFromGallery: () => Promise<void>;
}
export const ModalPhto = ({
  modal,
  setModal,
  handleTakePicture,
  handleSelectFromGallery,
}: Props) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modal}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleTakePicture}
          >
            <Text category="s1" style={styles.modalButtonText}>
              Tomar Foto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleSelectFromGallery}
          >
            <Text category="s1" style={styles.modalButtonText}>
              Seleccionar de la Galería
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.modalCloseButton]}
            onPress={() => setModal(false)}
          >
            <Text category="s1" style={styles.modalButtonText}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#dc3545",
  },
});
