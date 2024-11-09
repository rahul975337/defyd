import { resetDB } from "@/behaviour";
import { ContactsList } from "@/components";
import { Header } from "@/components/header";
import { useContacts } from "@/hooks/useContacts";
import clsx from "clsx";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [searchText, setSearchText] = useState("");

  const handleViewAll = useCallback(() => {
    router.push({ pathname: "/all" });
  }, []);

  useContacts();

  return (
    <SafeAreaView className="flex-1 p-5 bg-white">
      <Button title="Reset DB" onPress={resetDB} />
      <View className="p-5">
        <Header
          title={<Image source={require("@/assets/images/defyd-logo.png")} />}
        />
      </View>

      <View className="flex-row items-center mb-10">
        <TextInput
          allowFontScaling={false}
          className={clsx(
            "h-14 w-full content-center justify-center rounded-md border-[#E0E0E0] pl-12 border-[1px]"
          )}
          editable={true}
          key="contacts-search-text"
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search contacts"
          placeholderTextColor={"#999"}
          selectionColor={"#000"}
        />
        <Image
          className="absolute ml-2 h-6 w-6"
          source={require("@/assets/images/search.png")}
          tintColor={"#E0E0E0"}
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
