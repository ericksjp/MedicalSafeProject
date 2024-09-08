import { Button } from "react-native-paper";

export default function RegisterButton({ handleRegistro }) {
  return (
    <Button
      className="mt-10 self-center"
      mode="contained-tonal"
      icon="content-save-check"
      buttonColor="#4ade80"
      onPress={handleRegistro}
      style={{ width: 300 }}
      labelStyle={{ fontSize: 16 }}
    >
      Registrar medicamento
    </Button>
  );
}
