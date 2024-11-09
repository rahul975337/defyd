import { ContactsList } from "@/components";
import { Header } from "@/components/header";
import { useContacts } from "@/hooks/useContacts";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const handleViewAll = useCallback(() => {
    router.push({ pathname: "/all" });
  }, []);

  useContacts();

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
