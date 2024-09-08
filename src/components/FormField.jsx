import { TextInput } from "react-native-paper";
import { useState } from "react";

const FormField = ({ label, value, handleChangeText, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 1) {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={handleChangeText}
        style={{ backgroundColor: "transparent" }} // Tornar o fundo transparente
      />
    );
  }

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={handleChangeText}
      secureTextEntry={showPassword}
      style={{ backgroundColor: "transparent" }} // Tornar o fundo transparente
      right={
        <TextInput.Icon
          name="eye"
          onPress={() => setShowPassword(!showPassword)}
        />
      }
    />
  );
};

export default FormField;
