import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

const AuthLayout = () => {
  const loading = false;
  const isLogged = true;

  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {/* <StatusBar backgroundColor="#161622" style="dark" /> */}
    </>
  );
};

export default AuthLayout;
