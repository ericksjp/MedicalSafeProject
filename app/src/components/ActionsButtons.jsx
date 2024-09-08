import { View } from "react-native";
import { Button } from "react-native-paper";

export default function ActionButtons({ addField, removeField }) {
  return (
    <View className="w-full flex flex-row justify-evenly">
      <Button
        mode="contained"
        icon="plus"
        onPress={addField}
        style={{ width: 170 }}
      >
        Adicionar horário
      </Button>
      <Button
        mode="elevated"
        icon="minus"
        onPress={removeField}
        style={{ width: 170 }}
      >
        Remover horário
      </Button>
    </View>
  );
}
