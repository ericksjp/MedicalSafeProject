import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MedProvider from "../../context/MedProvider";

export default function CadastroLayout() {
  return (
    <MedProvider>
      <Stack>
        <Stack.Screen
          name="nomeMedicamento"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="formaFarmaceutica"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="frequenciaDias"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="primeiraDose"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#6750a4" />
    </MedProvider>
  );
}
