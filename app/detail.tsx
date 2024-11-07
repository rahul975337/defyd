import { ContactsService } from "@/behaviour";
import { Header } from "@/components";
import { TaskList } from "@/components/task-list";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo } from "react";

export default function Detail() {
  const { contactId } = useLocalSearchParams();
  const handleCreateTask = () => {
    router.push({ pathname: "/create-task", params: { contactId } });
  };

  const contactDetails = useMemo(
    () => ContactsService.getContactById(contactId as string),
    [contactId]
  );
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <Header
        showBackButton
        title={
          <View className="items-center gap-2">
            <Text className="text-xl font-medium">
              {contactDetails?.name ?? ""}
            </Text>
            <Text className="text-sm">
              {contactDetails?.phoneNumbers?.[0]?.number ?? ""}
            </Text>
          </View>
        }
        titleClassName="text-xl font-medium"
      />

      <TaskList listType="contact" contactId={contactId as string} />
      <Pressable
        className="absolute bottom-4 rounded-full bg-logo_red p-4"
        onPress={handleCreateTask}
      >
        <Image
          source={require("@/assets/images/add.png")}
          className="h-8 w-8"
          resizeMode="contain"
          tintColor={"white"}
        />
      </Pressable>
    </SafeAreaView>
  );
}
