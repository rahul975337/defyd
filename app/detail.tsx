import { ContactModel } from "@/behaviour";
import { Header, withTaskByContactId } from "@/components";
import { TaskList } from "@/components/task-list";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TaskModel } from "@/behaviour";

function _Detail({
  tasks,
  contact,
}: {
  tasks: TaskModel[];
  contact: ContactModel;
}) {
  const { contactId } = useLocalSearchParams();
  const handleCreateTask = () => {
    router.push({ pathname: "/create-task", params: { contactId } });
  };

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <Header
        showBackButton
        title={contact.name}
        subTitle={contact.phoneNumber}
        titleClassName="text-xl font-medium"
      />

      <TaskList tasks={tasks} />
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

export default function Detail() {
  const { contactId } = useLocalSearchParams();
  const Enhanced = withTaskByContactId(_Detail);
  return <Enhanced contactId={contactId} />;
}
