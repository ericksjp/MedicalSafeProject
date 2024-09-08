import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/** 
*Layout padrão para todas as telas da stack de cadastro de medicamentos 
*/
export default function CadastroLayout() {
  return (
    <>

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
        <Stack.Screen
          name="ultimaDose"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="frequenciaDoseDiaria"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#6750a4" />
    </>
  );
}
