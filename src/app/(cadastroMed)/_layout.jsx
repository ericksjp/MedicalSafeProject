import { Stack } from "expo-router";

export default function CadastroLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="nomeMedicamento"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
