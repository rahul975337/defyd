import { TasksService } from "@/behaviour";
import { TaskModel } from "@/behaviour/db/models";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { View, TextInput, Pressable, Text, Image } from "react-native";
import {
  PrioritySelector,
  RoundedBottomModalWrapper,
  SelectableTab,
  TabItem,
  withTaskById,
} from "@/components";
import clsx from "clsx";
import { Priority, Task } from "@/types";

const taskOptions: TabItem[] = [
  { id: "priority", label: "Priority" },
  { id: "date", label: "Today" },
  { id: "reminders", label: "Reminders" },
];

const UpdateTaskScreen = ({ task }: { task: TaskModel }) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );
  const [selectedOption, setSelectedOption] =
    useState<TabItem["id"]>("priority");
  const [taskState, setTaskState] = useState<Task>({
    title: task.title,
    description: task.description,
    contactId: task.contactId,
    priority: task.priority,
  });
  const handleUpdate = async () => {
    try {
      TasksService.updateTask(task.id, {
        title: taskState.title,
        description: taskState.description,
        contactId: taskState.contactId,
        priority: selectedPriority ?? undefined,
      });
      router.back();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async () => {
    TasksService.deleteTask(task.id);
    router.back();
  };

  return (
    <RoundedBottomModalWrapper className="">
      <Pressable
        onPress={handleDeleteTask}
        className="absolute right-4 z-20 top-4 bg-logo_red p-2 rounded-md"
      >
        <Text className="text-white">Delete</Text>
      </Pressable>
      <View className="w-full p-5">
        <TextInput
          autoFocus
          className="text-2xl"
          cursorColor={"#D10000"}
          placeholder="Task Name"
          value={taskState.title}
          onChangeText={(text) => {
            setTaskState({ ...taskState, title: text });
          }}
        />
        <TextInput
          cursorColor={"#D10000"}
          className="text-lg"
          numberOfLines={5}
          placeholder="Description"
          value={taskState.description}
          onChangeText={(text) =>
            setTaskState({ ...taskState, description: text })
          }
        />
      </View>
      <SelectableTab
        items={taskOptions}
        selectedId={selectedOption}
        onSelect={setSelectedOption}
      />

      <View className="w-full border-t border-gray-200"></View>
      <View className="w-full flex-row justify-between p-3">
        <View className="w-[70%] flex-row justify-around">
          {selectedOption === "priority" ? (
            <PrioritySelector
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
            />
          ) : null}
        </View>
        <Pressable
          disabled={!taskState.title}
          className={clsx(
            "self-end rounded-full bg-logo_red p-3",
            !taskState.title && "opacity-50"
          )}
          onPress={handleUpdate}
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
};

export default function UpdateTask() {
  const { taskId } = useLocalSearchParams();
  const Enhanced = withTaskById(UpdateTaskScreen);
  return <Enhanced id={taskId} />;
}
