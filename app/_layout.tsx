import "@/global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { LoadingAnimation } from "@/components/LoadingAnimation";

SplashScreen.hideAsync();

const useSplashScreen = () => {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      setIsAnimated(true);
    };
    if (fontsLoaded) hideSplash();
  }, [fontsLoaded]);

  return { fontsLoaded, isAnimated };
};

export default function RootLayout() {
  const { fontsLoaded, isAnimated } = useSplashScreen();

  if (!fontsLoaded || !isAnimated) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Image
          source={require("@/assets/images/defyd-logo.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
        <View className="mt-8">
          <LoadingAnimation />
        </View>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="create-task"
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="update-task"
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
      {/* </ThemeProvider> */}
    </GestureHandlerRootView>
  );
}
