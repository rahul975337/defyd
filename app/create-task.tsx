import { TasksService } from "@/behaviour";
import { RoundedBottomModalWrapper } from "@/components";
import { Task } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, Text, TextInput } from "react-native";
import { View } from "react-native";
import { SelectableTab, TabItem } from "@/components";

const taskOptions: TabItem[] = [
  { id: "date", label: "Today" },
  { id: "priority", label: "Priority" },
  { id: "reminders", label: "Reminders" },
];

export default function CreateTask() {
  const { contactId } = useLocalSearchParams();
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    contactId: contactId as string,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [selectedOption, setSelectedOption] = useState<TabItem["id"]>("date");

  const handleAddTask = useCallback(() => {
    TasksService.createTask(task);
    router.back();
  }, [task]);
  return (
    <RoundedBottomModalWrapper className="">
      <View className="w-full p-5">
        <TextInput
          autoFocus
          className="text-2xl"
          cursorColor={"#D10000"}
          placeholder="Task Name"
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}
        />
        <TextInput
          cursorColor={"#D10000"}
          className="text-lg"
          numberOfLines={5}
          placeholder="Description"
          value={task.description}
          onChangeText={(text) => setTask({ ...task, description: text })}
        />
      </View>
      <SelectableTab
        items={taskOptions}
        selectedId={selectedOption}
        onSelect={setSelectedOption}
      />
      <View className="w-full border-t border-gray-200"></View>
      <View className="w-full p-3">
        <Pressable
          disabled={!task.title}
          className={`self-end rounded-full bg-logo_red p-3 ${
            !task.title && "opacity-50"
          }`}
          onPress={handleAddTask}
        >
          <Image
            source={require("@/assets/images/add.png")}
            className="h-5 w-5"
            resizeMode="contain"
            tintColor={"white"}
          />
        </Pressable>
      </View>
    </RoundedBottomModalWrapper>
  );
}
