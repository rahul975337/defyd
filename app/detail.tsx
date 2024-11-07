import { ContactsService } from "@/behaviour";
import { Header } from "@/components";
import { tasksByContactIdAtom } from "@/data";
import { router, useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "@/types";
const listEmptyComponent = () => (
  <View className="flex-1 w-full justify-center items-center">
    <Text className="text-center text-light_gray_border">No Tasks Found</Text>
  </View>
);

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

const TaskItem = ({ task }: { task: Task }) => {
  const formattedDate = formatDate(task.updatedAt ?? new Date());
  return (
    <View className="p-4">
      <Text className="text-lg font-medium">{task.title}</Text>
      <Text className="text-sm text-logo_red">{formattedDate}</Text>
    </View>
  );
};

const TaskList = ({ contactId }: { contactId: string }) => {
  const tasks = useAtomValue(tasksByContactIdAtom(contactId));

  useEffect(() => {
    console.log("tasks changed from detail", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <View className="flex-1 w-full">
      <FlatList
        data={tasks}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <TaskItem task={item} />}
        ItemSeparatorComponent={() => (
          <View className="w-full border-t border-light_gray_border my-4" />
        )}
        keyExtractor={(item) => item.id ?? ""}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

export default function Detail() {
  const { contactId } = useLocalSearchParams();
  const handleCreateTask = () => {
    router.push({ pathname: "/create-task", params: { contactId } });
  };

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <Header
        showBackButton
        title={
          <View className="items-center gap-2">
            <Text className="text-xl font-medium">
              {ContactsService.getContactById(contactId as string)?.name ?? ""}
            </Text>
            <Text className="text-sm text-light_gray_border">
              {ContactsService.getContactById(contactId as string)
                ?.phoneNumbers?.[0]?.number ?? ""}
            </Text>
          </View>
        }
        titleClassName="text-xl font-medium"
      />

      <TaskList contactId={contactId as string} />
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
