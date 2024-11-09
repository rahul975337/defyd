import { PriorityColors } from "@/constants/Colors";
import { TaskModel } from "@/behaviour";
import { Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export const TaskCard = ({ task }: { task: TaskModel }) => {
  const formattedDate = formatDate(task.updatedAt ?? new Date());

  const handlePress = () => {
    router.push({ pathname: "/update-task", params: { taskId: task.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      className="p-4 flex-row justify-between items-center gap-4"
    >
      <View
        className="rounded-full h-7 w-7 border-solid border-2"
        style={{
          borderColor: task.priority
            ? PriorityColors[task.priority as keyof typeof PriorityColors]
            : "lightgray",
        }}
      ></View>
      <View className="flex-1">
        <Text className="text-lg font-medium">{task.title}</Text>
        <Text className="text-sm text-logo_red">{formattedDate}</Text>
      </View>
    </Pressable>
  );
};
