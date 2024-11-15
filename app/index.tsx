import { BackgroundTask, ContactsService } from "@/behaviour";
import { ContactsList } from "@/components";
import { Header } from "@/components/header";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const handleViewAll = useCallback(() => {
    router.push({ pathname: "/all" });
  }, []);

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const setupBackgroundTask = async () => {
      let permission = await ContactsService.checkPermission();

      if (!permission) {
        const permissionResult = await ContactsService.requestPermission();
        if (permissionResult) {
          console.log(
            "Permission granted, attempting to register background task."
          );
          permission = await ContactsService.checkPermission();
        }
      }

      if (permission) {
        console.log("Registering background task...");
        await BackgroundTask.register();
      } else {
        console.log(
          "Permission denied, skipping background task registration."
        );
      }
    };

    setupBackgroundTask();

    return () => {
      BackgroundTask.unregister();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 p-5 bg-white">
      <View className="p-5">
        <Header
          title={<Image source={require("@/assets/images/defyd-logo.png")} />}
        />
      </View>

      <ContactsList />
      <Pressable
        className="absolute bottom-5 right-5 bg-red-500 p-4 rounded-md"
        onPress={handleViewAll}
      >
        <Text className="text-white">View All</Text>
      </Pressable>
    </SafeAreaView>
  );
}
