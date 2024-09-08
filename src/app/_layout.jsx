import { Stack, SplashScreen } from "expo-router";
import "../styles/global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import DataProvider from "../context/DataProvider";

/* impede que a tela de splash seja fechada automaticamente */
SplashScreen.preventAutoHideAsync();

// define um layout padrão para a aplicação
export default function RootLayout() {
  // carrrega as fontes necessárias para a aplicação
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
  });

  // exibe a tela de splash até que as fontes sejam carregadas
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // exibe a tela de splash até que as fontes sejam carregadas
  if (!fontsLoaded && !error) {
    return null;
  }

  /*
    Define a estrutura de navegação da aplicação.
    Passa o provider de contexto para que todos os componentes tenham acesso aos dados.
    Passa o provider de tema para que todos os componentes tenham acesso ao tema.
  */
  return (
    <DataProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(cadastroMed)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </DataProvider>
  );
}
