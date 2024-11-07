import { useAtomValue } from "jotai";
import { Text, View } from "react-native";

import { FlatList } from "react-native";
import { TaskCard } from "./task-card";
import { tasksByContactIdAtom, allTasksAtom } from "@/data";

const listEmptyComponent = () => (
  <View className="flex-1 w-full justify-center items-center">
    <Text className="text-center text-light_gray_border">No Tasks Found</Text>
  </View>
);

type TaskListProps =
  | { listType: "all"; contactId?: never }
  | { listType: "contact"; contactId: string };

export const TaskList = ({ listType, contactId }: TaskListProps) => {
  const tasks = useAtomValue(
    listType === "contact" ? tasksByContactIdAtom(contactId) : allTasksAtom
  );

  return (
    <View className="flex-1 w-full">
      <FlatList
        data={tasks}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <TaskCard task={item} />}
        ItemSeparatorComponent={() => (
          <View className="w-full border-t border-light_gray_border my-4" />
        )}
        keyExtractor={(item) => item.id ?? ""}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};
