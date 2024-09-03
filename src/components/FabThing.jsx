import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";

const FabThing = () => {
  const [open, setOpen] = useState(false);

  const onStateChange = ({ open }) => setOpen(open);
  const router = useRouter();

  return (
    <>
      {open && (
        <BlurView
          style={styles.blurContainer}
          intensity={100}
          tint="systemChromeMaterialDark"
        />
      )}
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "close" : "plus"}
          backdropColor="transparent"
          actions={[
            {
              icon: "pill",
              label: "Adicionar Medicamento",
              labelTextColor: "#e2e8f0",
              onPress: () => router.push("nome"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              console.log("akjd is open");
            }
          }}
          style={styles.fab}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 5,
  },
  blurContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: 3,
    bottom: 0,
  },
});

export default FabThing;
