import "@/global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
