import { Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { TaskCard } from "./task-card";
import { TaskModel } from "@/behaviour";

const listEmptyComponent = () => (
  <View className="flex-1 w-full justify-center items-center">
    <Text className="text-center text-light_gray_border">No Tasks Found</Text>
  </View>
);

export const TaskList = ({ tasks }: { tasks: TaskModel[] }) => {
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
