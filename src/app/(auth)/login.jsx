import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { AuthAppBar, CustomButton, FormField } from "../../components";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSignIn = () => {
    router.replace("/home");
  };

  return (
    <View className="w-[100%] h-[100%] bg-[#6750a4]">
      <AuthAppBar title="Piulula - Login" />
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

        <Text className="text-black text-left text-sm">
          Ao clicar em Entrar, você concorda com nossos Termos, Política de
          Dados e Política de Cookies.
        </Text>

        <CustomButton
          title="Entrar"
          handlePress={handleSignIn}
          className="mt-10"
        />
        <Text className="text-center text-gray-600 font-bold text-xl">Ou</Text>

        <CustomButton
          title="Cadastre-se"
          handlePress={() => router.replace("/signup")}
          className="mt-8"
          mode="outlined"
        />
      </View>
    </View>
  );
};

export default Login;
