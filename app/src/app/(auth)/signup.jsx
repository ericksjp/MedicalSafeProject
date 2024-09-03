import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { AuthAppBar, CustomButton, FormField } from "../../components";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  function handleSignUp() {
    router.replace("/home");
  }

  return (
    <View className="w-[100%] h-full bg-[#6750a4]">
      <AuthAppBar title="Piulula - Cadastro" />
      <View className="px-8 gap-4 rounded-3xl z-auto h-full bg-white">
        <FormField
          type={1}
          label="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
        />
        <FormField
          type={2}
          label="Senha"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        <FormField
          type={2}
          label="Confirmar Senha"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />

        <Text className="text-black text-left text-sm">
          Ao clicar em Cadastrar, você concorda com nossos Termos, Política de
          Dados e Política de Cookies.
        </Text>

        <CustomButton
          title="Cadastrar"
          handlePress={handleSignUp}
          className="mt-10"
        />
        <Text className="text-center text-gray-600 font-bold text-xl">Ou</Text>

        <CustomButton
          title="Fazer Login"
          handlePress={() => router.replace("/login")}
          className="mt-8"
          mode="outlined"
        />
      </View>
    </View>
  );
};

export default SignUp;
