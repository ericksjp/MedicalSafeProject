import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function NewMedBar({
  iconBackBtn,
  title,
  icon,
  onNextStep,
  onBackStep,
}) {
  function onBack() {
    console.log("erick");
    if (onBackStep) {
      onBackStep();
    } else {
      router.back();
    }
  }

  return (
    <SafeAreaView>
      <View className="w-full flex gap-3 justify-center items-center bg-[#6750a4] pb-10">
        <Button
          icon={iconBackBtn}
          mode="text"
          textColor="white"
          onPress={onBack}
          className="self-start font-bold"
          labelStyle={{ fontWeight: "bolda", fontSize: 25 }}
          title={title}
        />
        <Image source={icon} className="w-16 h-16 self-start ml-14" />
        <Text className="text-slate-200 text-2xl font-semibold">{title}</Text>
      </View>
    </SafeAreaView>
  );
}
